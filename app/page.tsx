'use client'

import Link from 'next/link'
import Footer from '@/components/Footer'
import SiteHeader from '@/components/SiteHeader'
import FlockingBackground from '@/components/FlockingBackground'
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Activity,
  Radar,
  Zap,
  LineChart,
  Orbit
} from 'lucide-react'

const heroStats = [
  { label: 'Kurulum', value: '5 dk' },
  { label: 'Algılama', value: '99.9%' },
  { label: 'Sınırsız Pixel', value: '∞' },
]

const capabilityCards = [
  {
    title: 'Gerçek zamanlı açılma bilgisi',
    description: 'Mail açıldığı anda cihaz, tarayıcı ve konum bilgisi otomatik kaydedilir.',
    icon: Activity
  },
  {
    title: 'Görünmez pixel teknolojisi',
    description: '1×1 piksel ile tüm istemcilerde izlenebilirlik, hiçbir içerik değişmeden.',
    icon: Radar
  },
  {
    title: 'Şeffaf log akışı',
    description: 'Her açılma olayı kronolojik olarak panelde; tekrar okumalar ayrı tutulur.',
    icon: LineChart
  },
  {
    title: 'Anında bildirim',
    description: 'Mail okunduğunda tarayıcıdan ve dashboarddan anlık uyarı alın.',
    icon: Zap
  },
]

const workflowSteps = [
  {
    step: '01',
    title: 'Pixel oluştur',
    text: 'Dashboard’dan tek tıkla görünmez izleme pikseli üret.'
  },
  {
    step: '02',
    title: 'Mailine ekle',
    text: 'Kod otomatik olarak HTML formatında gelir; kopyala-yapıştır yeterli.'
  },
  {
    step: '03',
    title: 'Okunmaları izle',
    text: 'Alıcı maili açtığı an loglar ve bildirimler gerçek zamanlı oluşur.'
  }
]

const logHighlights = [
  'Cihaz, tarayıcı ve işletim sistemi tespiti',
  'Tekrar okumalarda ayrı kayıt ve zaman damgası',
  'IP & konum bilgisi sadece güvenlik için tutulur',
  'Mail içeriği asla kaydedilmez'
]

export default function HomePage() {
  return (
    <div className="bg-[#f4f6fb] min-h-screen text-slate-900">
      {/* Flocking Animation Background */}
      <FlockingBackground />
      
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="absolute -top-32 right-10 w-72 h-72 bg-gradient-to-br from-indigo-200/40 via-white to-transparent rounded-full blur-3xl" />
        <div className="absolute top-32 -left-10 w-72 h-72 bg-gradient-to-br from-slate-200/50 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10">
          <SiteHeader />

          <main>
            {/* Hero */}
            <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-12">
              <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-slate-900">
                    Görünmez pixel ile
                    <span className="block text-slate-500">gerçek zamanlı mail telemetrisi</span>
                  </h1>
                  <p className="mt-6 text-lg text-slate-600 max-w-xl">
                    Gönderdiğiniz her mailin açılma anı, cihazı ve tekrar okunma sayısı minimalist bir panelde. Kod bilgisi gerekmez, 5 dakikada çalışır.
                  </p>

                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/auth/register"
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(15,23,42,0.25)] transition-transform hover:-translate-y-1"
                    >
                      Ücretsiz Başla
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/guide"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-900 hover:shadow-lg transition-all"
                    >
                      5 Dakikada Kurulum
                    </Link>
                  </div>
                  <div className="mt-4">
                    <Link href="/features" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                      Özellikleri keşfet →
                    </Link>
                  </div>

                  <div className="mt-10 grid grid-cols-3 gap-6">
                    {heroStats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl border border-white/60 bg-white/70 p-4 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur">
                        <div className="text-3xl font-semibold text-slate-900">{stat.value}</div>
                        <div className="text-xs uppercase tracking-wide text-slate-400 mt-1">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-white via-white to-slate-100 blur-2xl" />
                  <div className="relative rounded-[32px] border border-white/70 bg-white/60 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)] backdrop-blur-xl">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Son okuma kayıtları</span>
                      <span>Canlı</span>
                    </div>
                    <div className="mt-6 space-y-4">
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="rounded-2xl border border-slate-100 bg-white/90 p-4 shadow-[0_12px_35px_rgba(15,23,42,0.08)]">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-semibold text-slate-900">Gmail · İstanbul</p>
                              <p className="text-xs text-slate-500">Chrome · macOS · 2sn önce</p>
                            </div>
                            <span className="text-xs font-semibold text-emerald-600">Okundu</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm text-slate-600">
                      IP ve konum bilgileri sadece güvenlik için tutulur, mail içeriği kaydedilmez.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Capabilities */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Yetkinlikler</p>
                    <h2 className="mt-2 text-3xl font-semibold text-slate-900">Antigravity estetiğinde güç</h2>
                  </div>
                  <Link href="/pricing" className="text-sm font-medium text-slate-500 hover:text-slate-900">
                    Her şey ücretsiz →
                  </Link>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {capabilityCards.map((card) => (
                    <div
                      key={card.title}
                      className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur"
                    >
                      <card.icon className="w-10 h-10 text-slate-400" />
                      <h3 className="mt-4 text-xl font-semibold text-slate-900">{card.title}</h3>
                      <p className="mt-2 text-sm text-slate-500">{card.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Workflow */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
              <div className="max-w-5xl mx-auto rounded-[32px] border border-white/60 bg-white/70 p-10 shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                  <ShieldCheck className="w-4 h-4" />
                  3 adımda çalışma şekli
                </div>
                <div className="mt-8 grid md:grid-cols-3 gap-8">
                  {workflowSteps.map((step) => (
                    <div key={step.step}>
                      <div className="text-4xl font-semibold text-slate-200">{step.step}</div>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
                      <p className="mt-2 text-sm text-slate-500">{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Log highlights */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
              <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl font-semibold text-slate-900">Güvenlik ve şeffaflık</h2>
                <p className="mt-3 text-slate-500">MailSight, Apple’ın dinginliğiyle OpenAI’nin bilimsel duruluğunu buluşturur.</p>
                <div className="mt-10 grid md:grid-cols-2 gap-6 text-left">
                  {logHighlights.map((item) => (
                    <div key={item} className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_15px_50px_rgba(15,23,42,0.07)]">
                      <Orbit className="w-5 h-5 text-slate-400" />
                      <p className="mt-3 text-sm font-medium text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="px-4 sm:px-6 lg:px-8 pb-24">
              <div className="max-w-5xl mx-auto rounded-[36px] border border-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-12 text-center text-white shadow-[0_35px_120px_rgba(15,23,42,0.45)]">
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Başlamak için hazır mısınız?</p>
                <h2 className="mt-4 text-4xl font-semibold">Sonsuza kadar ücretsiz, sınırsız takip</h2>
                <p className="mt-3 text-white/70">Kredi kartı yok. 5 dakikada kurulum. Okunma bilgisi kaybolmadan elinizde.</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-slate-900"
                  >
                    Ücretsiz Hesap Oluştur
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-4 text-sm font-semibold text-white/80"
                  >
                    Destek ekibiyle konuş
                  </Link>
                </div>
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  )
}
