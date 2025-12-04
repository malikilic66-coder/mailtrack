'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { User } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Eye,
  ArrowLeft,
  User as UserIcon,
  Bell,
  Shield,
  Palette,
  Trash2,
  Save,
  Mail,
  Globe,
  Moon,
  Sun,
  Monitor,
  CheckCircle
} from 'lucide-react'

interface SettingsClientProps {
  user: User
}

export default function SettingsClient({ user }: SettingsClientProps) {
  const router = useRouter()
  const supabase = createClient()
  
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'appearance'>('profile')
  const [displayName, setDisplayName] = useState(user.user_metadata?.display_name || '')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [browserNotifications, setBrowserNotifications] = useState(true)
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSaveProfile = async () => {
    setSaving(true)
    const { error } = await supabase.auth.updateUser({
      data: { display_name: displayName }
    })
    
    if (!error) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
    setSaving(false)
  }

  const handleDeleteAccount = async () => {
    if (confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) {
      // In production, this would call a server-side API to delete the account
      await supabase.auth.signOut()
      router.push('/')
    }
  }

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      setBrowserNotifications(permission === 'granted')
    }
  }

  const tabs = [
    { id: 'profile' as const, label: 'Profil', icon: UserIcon },
    { id: 'notifications' as const, label: 'Bildirimler', icon: Bell },
    { id: 'privacy' as const, label: 'Gizlilik', icon: Shield },
    { id: 'appearance' as const, label: 'Görünüm', icon: Palette }
  ]

  return (
    <div className="bg-[#f4f6fb] min-h-screen text-slate-900">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[360px] bg-gradient-to-b from-white via-white/70 to-transparent" />
        <div className="absolute -left-16 top-16 h-80 w-80 rounded-full bg-gradient-to-br from-purple-200/50 via-white to-transparent blur-3xl" />
        <div className="absolute right-4 top-48 h-72 w-72 rounded-full bg-gradient-to-br from-blue-200/50 via-white to-transparent blur-3xl" />

        <div className="relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/60 bg-white/80 text-slate-600 transition hover:text-slate-900"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Link>
                <div>
                  <div className="inline-flex items-center gap-3 rounded-[30px] border border-white/60 bg-white/90 px-4 py-2 shadow-[0_10px_35px_rgba(15,23,42,0.1)]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-900 text-white">
                      <Eye className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Ayarlar</span>
                  </div>
                  <h1 className="mt-3 text-3xl font-semibold text-slate-900">Hesap Yönetimi</h1>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
              {/* Sidebar Tabs */}
              <nav className="rounded-[32px] border border-white/70 bg-white/90 p-4 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur h-fit">
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                        activeTab === tab.id
                          ? 'bg-slate-900 text-white shadow-lg'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <tab.icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </nav>

              {/* Content Area */}
              <div className="rounded-[36px] border border-white/70 bg-white/90 p-8 shadow-[0_30px_90px_rgba(15,23,42,0.15)] backdrop-blur">
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">Profil Bilgileri</h2>
                      <p className="mt-1 text-sm text-slate-500">Hesap bilgilerinizi güncelleyin.</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700">E-posta</label>
                        <div className="mt-2 flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <Mail className="h-4 w-4 text-slate-400" />
                          <input
                            type="email"
                            value={user.email}
                            disabled
                            className="flex-1 bg-transparent text-sm text-slate-500 outline-none"
                          />
                        </div>
                        <p className="mt-1 text-xs text-slate-400">E-posta adresi değiştirilemez.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700">Görünen İsim</label>
                        <input
                          type="text"
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                          placeholder="Adınız Soyadınız"
                          className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                        />
                      </div>

                      <div className="pt-4">
                        <button
                          onClick={handleSaveProfile}
                          disabled={saving}
                          className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 disabled:opacity-50"
                        >
                          {saved ? (
                            <>
                              <CheckCircle className="h-4 w-4" />
                              Kaydedildi
                            </>
                          ) : (
                            <>
                              <Save className="h-4 w-4" />
                              {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">Bildirim Tercihleri</h2>
                      <p className="mt-1 text-sm text-slate-500">Mail okunma bildirimleri nasıl almak istersiniz?</p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                            <Mail className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">E-posta Bildirimleri</p>
                            <p className="text-xs text-slate-500">Mail okunduğunda e-posta al</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setEmailNotifications(!emailNotifications)}
                          className={`relative h-7 w-12 rounded-full transition ${
                            emailNotifications ? 'bg-slate-900' : 'bg-slate-200'
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                              emailNotifications ? 'right-1' : 'left-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                            <Bell className="h-5 w-5 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Tarayıcı Bildirimleri</p>
                            <p className="text-xs text-slate-500">Gerçek zamanlı push bildirim</p>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            if (!browserNotifications) {
                              requestNotificationPermission()
                            } else {
                              setBrowserNotifications(false)
                            }
                          }}
                          className={`relative h-7 w-12 rounded-full transition ${
                            browserNotifications ? 'bg-slate-900' : 'bg-slate-200'
                          }`}
                        >
                          <span
                            className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
                              browserNotifications ? 'right-1' : 'left-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'privacy' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">Gizlilik & Güvenlik</h2>
                      <p className="mt-1 text-sm text-slate-500">Hesap güvenliğinizi yönetin.</p>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <div className="flex items-start gap-3">
                          <Shield className="mt-0.5 h-5 w-5 text-blue-600" />
                          <div>
                            <h3 className="text-sm font-semibold text-slate-900">Veri Güvenliği</h3>
                            <p className="mt-1 text-sm text-slate-600">
                              Tüm mail izleme verileri şifrelenmiş olarak saklanır. IP ve konum bilgileri sadece
                              güvenlik için tutulur, mail içeriği asla kaydedilmez.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6">
                        <div className="flex items-start gap-3">
                          <Trash2 className="mt-0.5 h-5 w-5 text-red-600" />
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-red-900">Hesabı Sil</h3>
                            <p className="mt-1 text-sm text-red-700">
                              Hesabınızı kalıcı olarak silin. Tüm mail izleme verileri ve loglar silinecektir.
                              Bu işlem geri alınamaz.
                            </p>
                            <button
                              onClick={handleDeleteAccount}
                              className="mt-4 rounded-full border border-red-300 bg-white px-5 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50"
                            >
                              Hesabı Kalıcı Olarak Sil
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">Görünüm Ayarları</h2>
                      <p className="mt-1 text-sm text-slate-500">Dashboard temasını özelleştirin.</p>
                    </div>

                    <div className="space-y-3">
                      {[
                        { id: 'light' as const, label: 'Açık Tema', icon: Sun },
                        { id: 'dark' as const, label: 'Koyu Tema', icon: Moon },
                        { id: 'system' as const, label: 'Sistem', icon: Monitor }
                      ].map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setTheme(option.id)}
                          className={`flex w-full items-center justify-between rounded-2xl border p-4 transition ${
                            theme === option.id
                              ? 'border-slate-900 bg-slate-50'
                              : 'border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                                theme === option.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              <option.icon className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-semibold text-slate-900">{option.label}</span>
                          </div>
                          {theme === option.id && (
                            <CheckCircle className="h-5 w-5 text-slate-900" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
                      <p className="text-sm text-amber-800">
                        <strong>Not:</strong> Koyu tema desteği yakında eklenecek. Şu anda sadece açık tema
                        kullanılabilir.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
