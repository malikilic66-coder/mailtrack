import { useState, useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Plus, Copy, Check, LogOut, Bell, Eye, Clock, Trash2 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { supabase } from '../lib/supabase'

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [emails, setEmails] = useState([])
  const [trackingLogs, setTrackingLogs] = useState([])
  const [showNewEmailModal, setShowNewEmailModal] = useState(false)
  const [newEmailSubject, setNewEmailSubject] = useState('')
  const [newEmailRecipient, setNewEmailRecipient] = useState('')
  const [copiedId, setCopiedId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState(null)

  // Backend URL - would be configured via environment variable in production
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'

  const showNotificationMessage = useCallback((message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }, [])

  // Fetch emails from database
  const loadEmails = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from('emails')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setEmails(data)
    }
    setLoading(false)
  }, [])

  // Fetch tracking logs from database
  const loadTrackingLogs = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from('tracking_logs')
      .select(`
        *,
        emails!inner(user_id, subject, recipient)
      `)
      .eq('emails.user_id', userId)
      .order('opened_at', { ascending: false })
      .limit(50)

    if (!error && data) {
      setTrackingLogs(data)
    }
  }, [])

  // Navigation effect
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  // Data loading effect - this is the recommended pattern for fetching data
  useEffect(() => {
    if (user) {
      // Using IIFE to properly handle async operations in useEffect
      (async () => {
        await loadEmails(user.id)
        await loadTrackingLogs(user.id)
      })()
    }
  }, [user, loadEmails, loadTrackingLogs])

  useEffect(() => {
    if (!user) return

    // Subscribe to realtime tracking logs
    const subscription = supabase
      .channel('tracking-logs')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'tracking_logs',
        },
        (payload) => {
          // Check if this log belongs to one of our emails
          const email = emails.find(e => e.id === payload.new.email_id)
          if (email) {
            setTrackingLogs(prev => [payload.new, ...prev])
            showNotificationMessage(`"${email.subject}" e-postası okundu!`)
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [user, emails, showNotificationMessage])

  const createEmail = async (e) => {
    e.preventDefault()
    
    const { data, error } = await supabase
      .from('emails')
      .insert({
        user_id: user.id,
        subject: newEmailSubject,
        recipient: newEmailRecipient,
      })
      .select()
      .single()

    if (!error && data) {
      setEmails(prev => [data, ...prev])
      setShowNewEmailModal(false)
      setNewEmailSubject('')
      setNewEmailRecipient('')
    }
  }

  const deleteEmail = async (id) => {
    const { error } = await supabase
      .from('emails')
      .delete()
      .eq('id', id)

    if (!error) {
      setEmails(prev => prev.filter(e => e.id !== id))
    }
  }

  const copyPixelHtml = async (emailId) => {
    const pixelUrl = `${backendUrl}/track/${emailId}`
    const html = `<img src="${pixelUrl}" width="1" height="1" style="display:none" alt="" />`
    
    await navigator.clipboard.writeText(html)
    setCopiedId(emailId)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getOpenCount = (emailId) => {
    return trackingLogs.filter(log => log.email_id === emailId).length
  }

  // Calculate last 24 hours opens count
  const last24HoursOpens = useMemo(() => {
    const oneDayAgo = new Date()
    oneDayAgo.setHours(oneDayAgo.getHours() - 24)
    return trackingLogs.filter(log => new Date(log.opened_at) > oneDayAgo).length
  }, [trackingLogs])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center gap-3 animate-slide-in">
          <Bell className="w-5 h-5" />
          {notification}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Mail className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">MailTrack</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 text-sm hidden md:block">{user?.email}</span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden md:inline">Çıkış</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Toplam E-posta" 
            value={emails.length} 
            icon={<Mail className="w-6 h-6" />} 
          />
          <StatCard 
            title="Toplam Açılma" 
            value={trackingLogs.length} 
            icon={<Eye className="w-6 h-6" />} 
          />
          <StatCard 
            title="Son 24 Saat" 
            value={last24HoursOpens} 
            icon={<Clock className="w-6 h-6" />} 
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emails List */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">E-postalarım</h2>
              <button
                onClick={() => setShowNewEmailModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Yeni Piksel
              </button>
            </div>

            {emails.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Henüz e-posta eklemediniz</p>
                <button
                  onClick={() => setShowNewEmailModal(true)}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  İlk tracking pikselinizi oluşturun
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {emails.map(email => (
                  <div 
                    key={email.id} 
                    className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium text-gray-900">{email.subject}</h3>
                        <p className="text-sm text-gray-500">{email.recipient}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {getOpenCount(email.id)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => copyPixelHtml(email.id)}
                        className="flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        {copiedId === email.id ? (
                          <>
                            <Check className="w-4 h-4 text-green-600" />
                            Kopyalandı!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            HTML Kopyala
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => deleteEmail(email.id)}
                        className="text-sm text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {formatDate(email.created_at)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Son Aktivite</h2>

            {trackingLogs.length === 0 ? (
              <div className="text-center py-12">
                <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Henüz okuma kaydı yok</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {trackingLogs.map(log => (
                  <div 
                    key={log.id} 
                    className="flex items-start gap-3 border-b border-gray-50 pb-3"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Eye className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {log.emails?.subject || 'E-posta'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {log.ip_address && `IP: ${log.ip_address} • `}
                        {formatDate(log.opened_at)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* New Email Modal */}
      {showNewEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Yeni Tracking Piksel
            </h2>
            <form onSubmit={createEmail} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta Konusu
                </label>
                <input
                  type="text"
                  value={newEmailSubject}
                  onChange={(e) => setNewEmailSubject(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Örn: Proje Teklifi"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alıcı E-posta
                </label>
                <input
                  type="email"
                  value={newEmailRecipient}
                  onChange={(e) => setNewEmailRecipient(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="alici@email.com"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewEmailModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Oluştur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}
