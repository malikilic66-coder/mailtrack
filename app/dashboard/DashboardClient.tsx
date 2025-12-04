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
import FloatingDots from '@/components/FloatingDots'
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      <FloatingDots />
      
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Mail</p>
                <p className="text-3xl font-bold mt-1">{stats?.total_mails || 0}</p>
              </div>
              <Mail className="w-10 h-10 text-gray-400" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Okunan</p>
                <p className="text-3xl font-bold mt-1 text-green-600">{stats?.opened_mails || 0}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bekleyen</p>
                <p className="text-3xl font-bold mt-1 text-orange-600">{stats?.pending_mails || 0}</p>
              </div>
              <Clock className="w-10 h-10 text-orange-400" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Okuma</p>
                <p className="text-3xl font-bold mt-1 text-blue-600">{stats?.total_opens || 0}</p>
              </div>
              <TrendingUp className="w-10 h-10 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Mail List */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Mail İzlemelerim</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Yeni İzleme Oluştur
            </button>
          </div>

          {mailItems.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                Henüz mail izlemeniz yok
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                İlk mail izlemenizi oluşturarak başlayın
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Yeni İzleme Oluştur
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {mailItems.map((mail) => (
                <div
                  key={mail.id}
                  onClick={() => setSelectedMail(mail)}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 flex-1">
                      {getStatusIcon(mail.status)}
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                          {mail.title}
                        </h3>
                        {(mail.recipient_email || mail.mail_subject) && (
                          <div className="flex flex-wrap gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {mail.recipient_email && (
                              <span className="flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {mail.recipient_name || mail.recipient_email}
                              </span>
                            )}
                            {mail.mail_subject && (
                              <span className="flex items-center gap-1">
                                •
                                <span className="italic">{mail.mail_subject}</span>
                              </span>
                            )}
                          </div>
                        )}
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {format(new Date(mail.created_at), "d MMMM yyyy, HH:mm", { locale: tr })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {mail.open_count}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Okuma
                        </p>
                      </div>
                      
                      {mail.first_opened_at && (
                        <div className="text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            İlk Okuma
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
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
