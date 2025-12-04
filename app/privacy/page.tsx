'use client'

import Link from 'next/link'
import Footer from '@/components/Footer'
import SiteHeader from '@/components/SiteHeader'
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react'

const sections = [
  {
    icon: Database,
    title: '1. Topladığımız Veriler',
    content: [
      'E-posta adresi (hesap oluşturma için)',
      'Mail izleme pixel\'leri (oluşturduğunuz)',
      'IP adresi (güvenlik ve konum tespiti)',
      'Cihaz bilgisi (tarayıcı, işletim sistemi)',
      'Okuma zamanı ve sıklığı',
      'Şifre (hashlenmiş/şifrelenmiş)'
    ]
  },
  {
    icon: Lock,
    title: '2. Verilerin Kullanımı',
    content: [
      'Mail takip hizmeti sunmak',
      'İstatistik ve analiz sağlamak',
      'Hesap güvenliğini korumak',
      'Hizmet iyileştirmeleri yapmak',
      'Teknik destek sağlamak',
      'Yasal yükümlülükleri yerine getirmek'
    ]
  },
  {
    icon: Shield,
    title: '3. Veri Güvenliği',
    content: [
      'Tüm veriler SSL/TLS ile şifrelenir',
      'Şifreler bcrypt ile hashlenmiş saklanır',
      'Düzenli güvenlik güncellemeleri',
      'Sınırlı erişim kontrolü',
      'Otomatik yedekleme sistemi',
      'Supabase güvenlik altyapısı'
    ]
  },
  {
    icon: Eye,
    title: '4. Veri Paylaşımı',
    content: [
      'Verilerinizi asla satmayız',
      '3. parti pazarlama yapmayız',
      'Sadece yasal zorunlulukta paylaşılır',
      'Supabase (altyapı sağlayıcı)',
      'Anonim istatistikler kullanılabilir',
      'Kullanıcı izni olmadan paylaşım yok'
    ]
  },
  {
    icon: UserCheck,
    title: '5. Haklarınız (KVKK)',
    content: [
      'Verilerinize erişim hakkı',
      'Veri düzeltme talebi',
      'Veri silme talebi ("unutulma hakkı")',
      'Hesap kapatma ve tam silme',
      'Veri taşınabilirliği (export)',
      'İtiraz ve şikayet hakkı'
    ]
  },
  {
    icon: Mail,
    title: '6. İletişim',
    content: [
      'KVKK talepleriniz için: privacy@mailsight.com',
      'Veri silme talepleri 30 gün içinde işlenir',
      'Hesap sildiğinizde tüm veriler kalıcı silinir',
      'Cookie kullanmıyoruz (pixel-based tracking)',
      'Çerezler sadece oturum yönetimi için',
      'Reklam tracking yok'
    ]
  }
]

export default function PrivacyPage() {
  return (
    <div className="bg-[#f4f6fb] min-h-screen text-slate-900">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[300px] bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="absolute right-10 top-16 h-64 w-64 rounded-full bg-gradient-to-br from-emerald-200/50 via-white to-transparent blur-3xl" />

        <div className="relative z-10">
          <SiteHeader />

          <main>
            <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-600">
                  KVKK & GDPR uyumlu
                </div>
                <h1 className="mt-6 text-4xl md:text-5xl font-semibold text-slate-900">
                  Gizlilik Politikası
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                  Verileriniz bizim için değerlidir. Nasıl topladığımız, kullandığımız ve koruduğumuzu şeffaf şekilde açıklıyoruz.
                </p>
              </div>
            </section>

            <section className="px-4 sm:px-6 lg:px-8 pb-24">
              <div className="max-w-5xl mx-auto space-y-6">
                {sections.map((section) => (
                  <div
                    key={section.title}
                    className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_15px_55px_rgba(15,23,42,0.08)]"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start">
                      <div className="w-12 h-12 rounded-2xl border border-white/60 bg-white/80 flex items-center justify-center">
                        <section.icon className="w-6 h-6 text-emerald-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                        <ul className="mt-4 space-y-2 text-sm text-slate-600">
                          {section.content.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center text-xs uppercase tracking-[0.3em] text-slate-400">
                Son güncelleme: 4 Aralık 2025
              </div>

              <div className="mt-10 rounded-[30px] border border-white/60 bg-white/80 p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                <h3 className="text-2xl font-semibold text-slate-900">Sorularınız mı var?</h3>
                <p className="mt-2 text-sm text-slate-500">Gizlilik ve KVKK ile ilgili tüm talepleriniz için bizimle iletişime geçin.</p>
                <a
                  href="mailto:privacy@mailsight.com"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white"
                >
                  <Mail className="w-4 h-4" />
                  privacy@mailsight.com
                </a>
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  )
}
