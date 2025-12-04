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
  Settings
} from 'lucide-react'
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
    <div className="bg-[#f4f6fb] min-h-screen text-slate-900">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[360px] bg-gradient-to-b from-white via-white/70 to-transparent" />
        <div className="absolute -left-16 top-16 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/50 via-white to-transparent blur-3xl" />
        <div className="absolute right-4 top-48 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-200/50 via-white to-transparent blur-3xl" />

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-3 rounded-[30px] border border-white/60 bg-white/90 px-4 py-2 shadow-[0_10px_35px_rgba(15,23,42,0.1)]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <Eye className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">MailSight dashboard</span>
                </div>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  gerçek zamanlı kontrol
                </div>
                <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-slate-900">
                  Dashboard · görünmez pixel telemetrisi
                </h1>
                <p className="mt-2 text-sm text-slate-500 max-w-2xl">
                  Gönderdiğiniz her mailin anlık okunma olayları; Apple dinginliği ve OpenAI netliğinde log akışı.
                </p>
              </div>
              <div className="flex items-center gap-3 rounded-[32px] border border-white/60 bg-white/80 px-4 py-3 shadow-[0_12px_45px_rgba(15,23,42,0.12)]">
                <div className="flex flex-col text-right">
                  <span className="text-xs text-slate-400">Bağlı hesap</span>
                  <span className="text-sm font-semibold text-slate-900">{user.email}</span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
                  <button
                    onClick={() => router.push('/dashboard/settings')}
                    className="p-2 hover:text-slate-900 text-slate-500 transition"
                    aria-label="Ayarlar"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                  <span className="h-4 w-px bg-slate-300" />
                  <button
                    onClick={handleSignOut}
                    className="p-2 hover:text-slate-900 text-slate-500 transition"
                    aria-label="Çıkış"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </header>

            <section className="mt-8 grid gap-4 lg:grid-cols-4">
              {[
                {
                  label: 'Toplam Mail',
                  value: stats?.total_mails || 0,
                  icon: Mail,
                  accent: 'from-indigo-50 to-white'
                },
                {
                  label: 'Okunan',
                  value: stats?.opened_mails || 0,
                  icon: CheckCircle,
                  accent: 'from-emerald-50 to-white'
                },
                {
                  label: 'Bekleyen',
                  value: stats?.pending_mails || 0,
                  icon: Clock,
                  accent: 'from-amber-50 to-white'
                },
                {
                  label: 'Toplam Okuma',
                  value: stats?.total_opens || 0,
                  icon: TrendingUp,
                  accent: 'from-sky-50 to-white'
                }
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{card.label}</p>
                      <p className="mt-3 text-4xl font-semibold text-slate-900">{card.value}</p>
                    </div>
                    <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${card.accent} flex items-center justify-center`}>
                      <card.icon className="w-5 h-5 text-slate-600" />
                    </div>
                  </div>
                </div>
              ))}
            </section>

            <section className="mt-10 rounded-[36px] border border-white/70 bg-white/90 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.15)] backdrop-blur">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">Mail İzlemelerim</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Görünmez pixel log akışı</h2>
                </div>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5"
                >
                  <Plus className="w-4 h-4" /> Yeni İzleme
                </button>
              </div>

              {mailItems.length === 0 ? (
                <div className="mt-12 rounded-[30px] border border-dashed border-slate-200 bg-slate-50/80 p-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/80 bg-white/80">
                    <Mail className="h-6 w-6 text-slate-400" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">Henüz mail izlemeniz yok</h3>
                  <p className="mt-2 text-sm text-slate-500">İlk görünmez pikselinizi oluşturarak başlayın.</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
                  >
                    <Plus className="w-4 h-4" /> Yeni İzleme Oluştur
                  </button>
                </div>
              ) : (
                <div className="mt-8 space-y-4">
                  {mailItems.map((mail) => (
                    <button
                      key={mail.id}
                      onClick={() => setSelectedMail(mail)}
                      className="w-full rounded-3xl border border-white/60 bg-white/80 p-5 text-left shadow-[0_12px_45px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5"
                    >
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-3">
                          {getStatusIcon(mail.status)}
                          <div>
                            <h3 className="text-base font-semibold text-slate-900">{mail.title}</h3>
                            {(mail.recipient_email || mail.mail_subject) && (
                              <div className="mt-1 flex flex-wrap gap-2 text-xs">
                                {mail.recipient_email && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-slate-600">
                                    <Mail className="h-3 w-3" />
                                    {mail.recipient_name || mail.recipient_email}
                                  </span>
                                )}
                                {mail.mail_subject && (
                                  <span className="rounded-full bg-white/90 px-3 py-1 text-slate-500">
                                    “{mail.mail_subject}”
                                  </span>
                                )}
                              </div>
                            )}
                            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                              {format(new Date(mail.created_at), 'd MMMM yyyy, HH:mm', { locale: tr })}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6">
                          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-2 text-center">
                            <p className="text-3xl font-semibold text-slate-900">{mail.open_count}</p>
                            <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-slate-400">Okuma</p>
                          </div>
                          {mail.first_opened_at && (
                            <div className="text-right">
                              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">İlk Okuma</p>
                              <p className="mt-2 text-sm text-slate-600">
                                {format(new Date(mail.first_opened_at), 'd MMM, HH:mm', { locale: tr })}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </section>
          </div>
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
