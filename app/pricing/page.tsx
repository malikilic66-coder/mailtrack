'use client'

import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import Footer from '@/components/Footer'
import {
  CheckCircle,
  ArrowRight,
  Infinity,
  Bell,
  BarChart3,
  Shield,
  Zap,
  Globe,
  Code
} from 'lucide-react'

const allFeatures = [
  { icon: Infinity, text: 'Sınırsız pixel' },
  { icon: Infinity, text: 'Sınırsız mail' },
  { icon: Bell, text: 'Gerçek zamanlı okuma bildirimleri' },
  { icon: BarChart3, text: 'Cihaz & tarayıcı analizi' },
  { icon: Globe, text: 'Dashboard' },
  { icon: Code, text: 'API erişimi' },
  { icon: Shield, text: 'RLS güvenlik' },
  { icon: Zap, text: '%99.9 tespit oranı' }
]

const roadmap = [
  {
    title: 'Açılma ısı haritası',
    description: 'Hangi saatlerde mailiniz daha çok açılıyor?',
    status: 'Yakında'
  },
  {
    title: 'Çoklu ekip yönetimi',
    description: 'Ekip üyeleriyle birlikte çalışın',
    status: 'Planlanan'
  },
  {
    title: 'Webhook bildirimleri',
    description: 'Kendi sisteminize otomatik bildirim gönderin',
    status: 'Planlanan'
  },
  {
    title: 'Mobil uygulama',
    description: 'iOS ve Android uygulamaları',
    status: 'Araştırılıyor'
  },
  {
    title: 'Otomatik raporlama',
    description: 'Haftalık/aylık raporlar',
    status: 'Araştırılıyor'
  }
]

export default function PricingPage() {
  return (
    <div className="bg-[#f4f6fb] min-h-screen text-slate-900">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[320px] bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="absolute -top-20 right-12 w-64 h-64 bg-gradient-to-br from-emerald-200/50 via-white to-transparent rounded-full blur-3xl" />

        <div className="relative z-10">
          <SiteHeader />

          <main>
            {/* Hero */}
            <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-600 shadow-sm">
                  <CheckCircle className="w-4 h-4" /> %100 Ücretsiz
                </div>
                <h1 className="mt-6 text-4xl md:text-5xl font-semibold text-slate-900">
                  MailSight tüm özellikleriyle<br />
                  <span className="text-slate-500">sonsuzuna kadar ücretsiz</span>
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                  Her şey açık, hiçbir gizli ücret yok. Tüm planlar tek plan.
                </p>
              </div>
            </section>

            {/* Pricing card */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
              <div className="max-w-4xl mx-auto rounded-[36px] border border-white/70 bg-white/80 p-10 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500">Plan</p>
                  <h2 className="mt-2 text-5xl font-semibold text-slate-900">ÜCRETSİZ</h2>
                  <p className="mt-2 text-slate-500">Tüm özellikler dahil, sınırsız kullanım</p>
                </div>
                <div className="mt-10 grid md:grid-cols-2 gap-4">
                  {allFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 p-4 text-left"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      </span>
                      <span className="text-sm font-medium text-slate-600">{feature.text}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-10 text-center">
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white"
                  >
                    Hemen Başla
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="mt-3 text-xs uppercase tracking-widest text-slate-400">
                    Kredi kartı gerektirmez · 5 dakikada kurulum
                  </p>
                </div>
              </div>
            </section>

            {/* Roadmap */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
              <div className="max-w-5xl mx-auto">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500">Yolda Olanlar</p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-900">Gelecek özellikler</h2>
                </div>
                <div className="mt-10 space-y-4">
                  {roadmap.map((item, index) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)]"
                    >
                      <div className="w-12 h-12 rounded-2xl border border-white/60 bg-white/80 flex items-center justify-center text-slate-400 font-semibold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                            {item.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-slate-500">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-10 text-center">
                  <p className="text-slate-500">Öneriniz mi var?</p>
                  <a
                    href="mailto:support@mailsight.com"
                    className="mt-3 inline-flex items-center justify-center rounded-full border border-slate-900 px-8 py-3 text-sm font-semibold text-slate-900"
                  >
                    Geri bildirim gönderin
                  </a>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="px-4 sm:px-6 lg:px-8 pb-24">
              <div className="max-w-5xl mx-auto rounded-[36px] border border-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-12 text-center text-white shadow-[0_35px_120px_rgba(15,23,42,0.45)]">
                <h2 className="text-4xl font-semibold">Şimdi başlayın, sonsuza kadar rahat edin</h2>
                <p className="mt-3 text-white/70">Her şey aynı planın içinde. Gerektiğinde destek yanınızda.</p>
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
