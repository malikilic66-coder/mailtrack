'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { 
  Eye, 
  Plus, 
  Mail, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Circle,
  LogOut,
  Settings,
  Copy,
  ExternalLink
} from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'
import CreateMailModal from '@/components/CreateMailModal'
import MailDetailModal from '@/components/MailDetailModal'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale/tr'

interface MailItem {
  id: string
  title: string
  description: string | null
  recipient_email: string | null
  recipient_name: string | null
  mail_subject: string | null
  notes: string | null
  status: string
  open_count: number
  first_opened_at: string | null
  created_at: string
  mailtrack_tracking_pixels: Array<{
    id: string
    pixel_url: string
    pixel_code: string
  }>
}

interface Stats {
  total_mails: number
  opened_mails: number
  pending_mails: number
  total_opens: number
}

export default function DashboardClient({ 
  user, 
  initialMailItems,
  stats
}: { 
  user: User
  initialMailItems: MailItem[]
  stats: Stats | null
}) {
  const [mailItems, setMailItems] = useState<MailItem[]>(initialMailItems)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedMail, setSelectedMail] = useState<MailItem | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    // Subscribe to realtime updates for read_logs
    const channel = supabase
      .channel('read_logs_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mailtrack_read_logs',
          filter: `user_id=eq.${user.id}`
        },
        (payload: any) => {
          // Refresh mail items when new read log is added
          refreshMailItems()
          
          // Show notification
          const mailId = payload.new?.mail_id
          const mail = mailItems.find(m => m.id === mailId)
          if (mail) {
            showNotification(`📬 "${mail.title}" okundu!`)
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [user.id, mailItems, supabase])

  const refreshMailItems = async () => {
    const { data } = await supabase
      .from('mailtrack_mail_items')
      .select('*, mailtrack_tracking_pixels(*)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    
    if (data) {
      setMailItems(data)
    }
  }

  const showNotification = (message: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('MailSight', { body: message })
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  const handleMailCreated = (newMail: MailItem) => {
    setMailItems([newMail, ...mailItems])
    setShowCreateModal(false)
  }

  const getStatusIcon = (status: string) => {
    if (status === 'opened') {
      return <CheckCircle className="w-5 h-5 text-green-500" />
    }
    return <Circle className="w-5 h-5 text-gray-400" />
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <ParticleCanvas />
      
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white dark:text-black" />
              </div>
              <h1 className="text-xl font-bold">MailSight</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </div>
              <button
                onClick={() => router.push('/dashboard/settings')}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={handleSignOut}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-fade-in-up">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Toplam Mail</p>
                <p className="text-4xl font-bold mt-2 text-gray-900">{stats?.total_mails || 0}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Okunan</p>
                <p className="text-4xl font-bold mt-2 text-green-600">{stats?.opened_mails || 0}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Bekleyen</p>
                <p className="text-4xl font-bold mt-2 text-orange-600">{stats?.pending_mails || 0}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-500" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Toplam Okuma</p>
                <p className="text-4xl font-bold mt-2 text-blue-600">{stats?.total_opens || 0}</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Mail List */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Mail İzlemelerim</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-black transition-all hover:scale-105 shadow-md"
            >
              <Plus className="w-5 h-5" />
              Yeni İzleme Oluştur
            </button>
          </div>

          {mailItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-10 h-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Henüz mail izlemeniz yok
              </h3>
              <p className="text-gray-500 mb-8">
                İlk mail izlemenizi oluşturarak başlayın
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-black transition-all hover:scale-105 shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Yeni İzleme Oluştur
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {mailItems.map((mail) => (
                <div
                  key={mail.id}
                  onClick={() => setSelectedMail(mail)}
                  className="p-5 border border-gray-100 rounded-xl hover:border-gray-200 transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5 bg-gray-50/50 hover:bg-white"
                >

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {getStatusIcon(mail.status)}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {mail.title}
                        </h3>
                        {(mail.recipient_email || mail.mail_subject) && (
                          <div className="flex flex-wrap gap-2 mt-1.5 text-xs text-gray-500">
                            {mail.recipient_email && (
                              <span className="flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-full">
                                <Mail className="w-3 h-3 text-blue-600" />
                                <span className="text-blue-600 font-medium">{mail.recipient_name || mail.recipient_email}</span>
                              </span>
                            )}
                            {mail.mail_subject && (
                              <span className="bg-gray-100 px-2 py-1 rounded-full">
                                <span className="italic text-gray-600">{mail.mail_subject}</span>
                              </span>
                            )}
                          </div>
                        )}
                        <p className="text-sm text-gray-400 mt-2">
                          {format(new Date(mail.created_at), "d MMMM yyyy, HH:mm", { locale: tr })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center bg-blue-50 px-4 py-2 rounded-xl">
                        <p className="text-3xl font-bold text-blue-600">
                          {mail.open_count}
                        </p>
                        <p className="text-xs text-blue-600 font-medium mt-1">
                          Okuma
                        </p>
                      </div>
                      
                      {mail.first_opened_at && (
                        <div className="text-right">
                          <p className="text-sm text-gray-600 font-medium">
                            İlk Okuma
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(mail.first_opened_at), "d MMM, HH:mm", { locale: tr })}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateMailModal
          userId={user.id}
          onClose={() => setShowCreateModal(false)}
          onMailCreated={handleMailCreated}
        />
      )}

      {selectedMail && (
        <MailDetailModal
          mail={selectedMail}
          onClose={() => setSelectedMail(null)}
        />
      )}
    </div>
  )
}
