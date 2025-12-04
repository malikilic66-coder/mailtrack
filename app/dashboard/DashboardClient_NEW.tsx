'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
  Bell,
  Search,
  Filter,
  ChevronDown,
  MoreVertical,
  Copy,
  Trash2,
  Edit,
  Home,
  Download,
  X,
  ChevronRight
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
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; time: Date }>>([]) 
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'opened' | 'pending'>('all')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'most_read'>('newest')
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [selectedMailAction, setSelectedMailAction] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
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
          refreshMailItems()
          const mailId = payload.new?.mail_id
          const mail = mailItems.find(m => m.id === mailId)
          if (mail) {
            const notifMessage = `📬 "${mail.title}" okundu!`
            showNotification(notifMessage)
            addNotification(notifMessage)
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

  const addNotification = (message: string) => {
    const newNotif = { id: Date.now().toString(), message, time: new Date() }
    setNotifications(prev => [newNotif, ...prev].slice(0, 10))
  }

  const clearNotifications = () => {
    setNotifications([])
  }

  const handleDeleteMail = async (mailId: string) => {
    if (confirm('Bu mail izlemesini silmek istediğinizden emin misiniz?')) {
      await supabase.from('mailtrack_mail_items').delete().eq('id', mailId)
      setMailItems(mailItems.filter(m => m.id !== mailId))
      setSelectedMailAction(null)
    }
  }

  const handleCopyPixel = (mail: MailItem) => {
    const pixel = mail.mailtrack_tracking_pixels[0]
    if (pixel) {
      navigator.clipboard.writeText(pixel.pixel_code)
      addNotification('Pixel kodu panoya kopyalandı!')
    }
    setSelectedMailAction(null)
  }

  const getFilteredAndSortedMails = () => {
    let filtered = mailItems

    if (searchQuery) {
      filtered = filtered.filter(mail =>
        mail.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mail.recipient_email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mail.mail_subject?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(mail => mail.status === statusFilter)
    }

    const sorted = [...filtered]
    if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (sortBy === 'oldest') {
      sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    } else if (sortBy === 'most_read') {
      sorted.sort((a, b) => b.open_count - a.open_count)
    }

    return sorted
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

  const filteredMails = getFilteredAndSortedMails()

  return (
    <div className="bg-[#f4f6fb] min-h-screen text-slate-900">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[360px] bg-gradient-to-b from-white via-white/70 to-transparent" />
        <div className="absolute -left-16 top-16 h-80 w-80 rounded-full bg-gradient-to-br from-blue-200/50 via-white to-transparent blur-3xl" />
        <div className="absolute right-4 top-48 h-72 w-72 rounded-full bg-gradient-to-br from-emerald-200/50 via-white to-transparent blur-3xl" />

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <header className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/60 bg-white/90 text-slate-900 transition hover:scale-105 shadow-[0_10px_35px_rgba(15,23,42,0.1)]"
                >
                  <Eye className="h-5 w-5" />
                </Link>
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Link href="/" className="hover:text-slate-900 transition">Ana Sayfa</Link>
                    <ChevronRight className="h-3 w-3" />
                    <span className="font-semibold text-slate-600">Dashboard</span>
                  </div>
                  <h1 className="mt-1 text-2xl md:text-3xl font-semibold text-slate-900">
                    Mail Telemetrisi
                  </h1>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/60 bg-white/80 text-slate-600 transition hover:text-slate-900 shadow-[0_8px_30px_rgba(15,23,42,0.08)]"
                  >
                    <Bell className="h-4 w-4" />
                    {notifications.length > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                        {notifications.length}
                      </span>
                    )}
                  </button>
                  
                  {showNotifications && (
                    <div className="absolute right-0 top-14 w-80 rounded-[24px] border border-white/70 bg-white/95 p-4 shadow-[0_30px_90px_rgba(15,23,42,0.2)] backdrop-blur z-50">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-semibold text-slate-900">Bildirimler</h3>
                        {notifications.length > 0 && (
                          <button
                            onClick={clearNotifications}
                            className="text-xs text-slate-500 hover:text-slate-900"
                          >
                            Temizle
                          </button>
                        )}
                      </div>
                      {notifications.length === 0 ? (
                        <p className="py-8 text-center text-sm text-slate-400">Henüz bildirim yok</p>
                      ) : (
                        <div className="max-h-96 space-y-2 overflow-y-auto">
                          {notifications.map((notif) => (
                            <div
                              key={notif.id}
                              className="rounded-2xl border border-slate-100 bg-white p-3 text-sm"
                            >
                              <p className="text-slate-700">{notif.message}</p>
                              <p className="mt-1 text-xs text-slate-400">
                                {format(notif.time, 'HH:mm', { locale: tr })}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 rounded-[28px] border border-white/60 bg-white/80 px-3 py-2 shadow-[0_12px_45px_rgba(15,23,42,0.12)]">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="hidden sm:flex flex-col">
                    <span className="text-xs text-slate-400">Hesap</span>
                    <span className="text-sm font-semibold text-slate-900 max-w-[120px] truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => router.push('/dashboard/settings')}
                      className="p-2 hover:text-slate-900 text-slate-500 transition rounded-xl hover:bg-slate-100"
                      aria-label="Ayarlar"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                    <span className="h-4 w-px bg-slate-200" />
                    <button
                      onClick={handleSignOut}
                      className="p-2 hover:text-slate-900 text-slate-500 transition rounded-xl hover:bg-slate-100"
                      aria-label="Çıkış"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
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

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Mail ara (başlık, alıcı, konu...)"
                    className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                  />
                </div>
                
                <div className="flex gap-2">
                  <div className="relative">
                    <button
                      onClick={() => setShowFilterMenu(!showFilterMenu)}
                      className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      <Filter className="h-4 w-4" />
                      Filtre
                      <ChevronDown className="h-3 w-3" />
                    </button>
                    
                    {showFilterMenu && (
                      <div className="absolute right-0 top-14 w-48 rounded-2xl border border-white/70 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.15)] z-50">
                        <div className="space-y-1">
                          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Durum</p>
                          {[
                            { id: 'all' as const, label: 'Tümü' },
                            { id: 'opened' as const, label: 'Okunan' },
                            { id: 'pending' as const, label: 'Bekleyen' }
                          ].map((filter) => (
                            <button
                              key={filter.id}
                              onClick={() => {
                                setStatusFilter(filter.id)
                                setShowFilterMenu(false)
                              }}
                              className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                                statusFilter === filter.id
                                  ? 'bg-slate-900 text-white font-semibold'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {filter.label}
                            </button>
                          ))}
                          
                          <div className="my-2 h-px bg-slate-100" />
                          
                          <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Sıralama</p>
                          {[
                            { id: 'newest' as const, label: 'Yeni → Eski' },
                            { id: 'oldest' as const, label: 'Eski → Yeni' },
                            { id: 'most_read' as const, label: 'Çok Okunan' }
                          ].map((sort) => (
                            <button
                              key={sort.id}
                              onClick={() => {
                                setSortBy(sort.id)
                                setShowFilterMenu(false)
                              }}
                              className={`w-full rounded-xl px-3 py-2 text-left text-sm transition ${
                                sortBy === sort.id
                                  ? 'bg-slate-900 text-white font-semibold'
                                  : 'text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              {sort.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
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
              ) : filteredMails.length === 0 ? (
                <div className="mt-12 rounded-[30px] border border-dashed border-slate-200 bg-slate-50/80 p-10 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/80 bg-white/80">
                    <Search className="h-6 w-6 text-slate-400" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">Sonuç bulunamadı</h3>
                  <p className="mt-2 text-sm text-slate-500">Arama kriterlerinizi değiştirmeyi deneyin.</p>
                </div>
              ) : (
                <div className="mt-8 space-y-4">
                  {filteredMails.map((mail) => (
                    <div
                      key={mail.id}
                      className="group relative w-full rounded-3xl border border-white/60 bg-white/80 p-5 shadow-[0_12px_45px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5"
                    >
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <button
                          onClick={() => setSelectedMail(mail)}
                          className="flex flex-1 items-start gap-3 text-left"
                        >
                          {getStatusIcon(mail.status)}
                          <div className="flex-1">
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
                                    "{mail.mail_subject}"
                                  </span>
                                )}
                              </div>
                            )}
                            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-slate-400">
                              {format(new Date(mail.created_at), 'd MMMM yyyy, HH:mm', { locale: tr })}
                            </p>
                          </div>
                        </button>

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
                          
                          <div className="relative">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedMailAction(selectedMailAction === mail.id ? null : mail.id)
                              }}
                              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 opacity-0 transition group-hover:opacity-100 hover:bg-slate-50 hover:text-slate-900"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </button>
                            
                            {selectedMailAction === mail.id && (
                              <div className="absolute right-0 top-12 w-48 rounded-2xl border border-white/70 bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.2)] z-50">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleCopyPixel(mail)
                                  }}
                                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                                >
                                  <Copy className="h-4 w-4" />
                                  Pixel Kodunu Kopyala
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    setSelectedMail(mail)
                                    setSelectedMailAction(null)
                                  }}
                                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                                >
                                  <Edit className="h-4 w-4" />
                                  Detaylar
                                </button>
                                <div className="my-1 h-px bg-slate-100" />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleDeleteMail(mail.id)
                                  }}
                                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-600 transition hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  Sil
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

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
