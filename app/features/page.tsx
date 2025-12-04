'use client'

import Link from 'next/link'
import SiteHeader from '@/components/SiteHeader'
import Footer from '@/components/Footer'
import {
  Bell,
  Monitor,
  Eye,
  Clock,
  BarChart3,
  Zap,
  ArrowRight,
  CheckCircle,
  Shield,
  Lock,
  Database,
  ChevronDown
} from 'lucide-react'

const features = [
  {
    icon: Bell,
    title: 'Anlık Bildirimler',
    description: 'E-postanız açıldığında gerçek zamanlı uyarı alın.',
    accent: 'text-emerald-500'
  },
  {
    icon: Monitor,
    title: 'Cihaz / Tarayıcı Tespiti',
    description: 'Mailin hangi cihaz, tarayıcı ve işletim sisteminde açıldığını görün.',
    accent: 'text-sky-500'
  },
  {
    icon: Eye,
    title: '1×1 Görünmez Pixel',
    description: 'Tüm mail sağlayıcılarıyla uyumlu görünmez izleme teknolojisi.',
    accent: 'text-indigo-500'
  },
  {
    icon: Clock,
    title: 'Detaylı Okuma Günlüğü',
    description: 'IP, zaman damgası, tekrar okuma sayısı, referans mail istemcisi.',
    accent: 'text-amber-500'
  },
  {
    icon: BarChart3,
    title: 'Etkili Dashboard',
    description: 'Tüm maillerinizi yönetebileceğiniz modern bir panel.',
    accent: 'text-purple-500'
  },
  {
    icon: Zap,
    title: 'Kolay Entegrasyon',
    description: 'HTML\'e yapıştır-yap kullan. Kodlama bilmen gerekmez.',
    accent: 'text-pink-500'
  }
]

const steps = [
  {
    number: '01',
    title: 'Pixel oluştur',
    description: 'Dashboard\'dan bir izleme kodu oluştur.'
  },
  {
    number: '02',
    title: 'Mail\'e ekle',
    description: 'Kod otomatik HTML olarak gelir. Mail içeriğine yerleştir.'
  },
  {
    number: '03',
    title: 'Okunduğunda bildirim al',
    description: 'Alıcı maili açtığı anda tüm bilgiler panelinizde görünür.'
  }
]

const faqs = [
  {
    question: 'Pixel tüm mail istemcilerinde çalışır mı?',
    answer: 'Evet! Gmail, Outlook, Apple Mail, Thunderbird ve diğer tüm modern mail istemcilerinde çalışır. 1×1 görünmez pixel teknolojisi kullanıyoruz.'
  },
  {
    question: 'MailSight ücretsiz mi?',
    answer: 'Evet, MailSight tamamen ücretsizdir. Sınırsız pixel, sınırsız mail takibi, tüm özellikler ücretsiz.'
  },
  {
    question: 'Okuma loglarında ne tutulur?',
    answer: 'Sadece açılma zamanı, IP adresi, cihaz tipi, tarayıcı ve işletim sistemi bilgileri tutulur. Mail içeriği asla kaydedilmez.'
  },
  {
    question: 'Pixel engellenirse ne olur?',
    answer: 'Bazı mail istemcileri resimleri varsayılan olarak engeller. Kullanıcı "Resimleri göster" dediğinde pixel yüklenir ve takip başlar.'
  },
  {
    question: 'Birden fazla maili eş zamanlı takip edebilir miyim?',
    answer: 'Elbette! Sınırsız sayıda mail oluşturup takip edebilirsiniz. Her biri için ayrı pixel kodu üretilir.'
  }
]

export default function FeaturesPage() {
  return (
    <div className="bg-[#f4f6fb] min-h-screen text-slate-900">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[320px] bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="absolute -top-20 right-10 w-64 h-64 bg-gradient-to-br from-indigo-200/60 via-white to-transparent rounded-full blur-3xl" />
        <div className="absolute top-32 -left-10 w-72 h-72 bg-gradient-to-br from-slate-200/50 to-transparent rounded-full blur-3xl" />

        <div className="relative z-10">
          <SiteHeader />

          <main>
            {/* Hero */}
            <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Özellikler
                </div>
                <h1 className="mt-6 text-4xl md:text-5xl font-semibold text-slate-900">
                  Minimal & bilimsel bir e-posta laboratuvarı
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                  Apple’ın ferahlığı, OpenAI’nin dinginliğiyle birleşti. MailSight tüm izleme özelliklerini tek gövdede sunar.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_60px_rgba(15,23,42,0.25)]"
                  >
                    Hemen Başla
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/guide"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-900"
                  >
                    5 Dakikalık Kurulum
                  </Link>
                </div>
              </div>
            </section>

            {/* Feature cards */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
              <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-3xl border border-white/70 bg-white/80 p-6 text-left shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur"
                  >
                    <div className="w-12 h-12 rounded-2xl border border-white/60 bg-white/70 flex items-center justify-center">
                      <feature.icon className={`w-6 h-6 ${feature.accent}`} />
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{feature.title}</h3>
                    <p className="mt-3 text-sm text-slate-500">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* How it works */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
              <div className="max-w-5xl mx-auto rounded-[32px] border border-white/60 bg-white/70 p-10 shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur">
                <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
                  <Shield className="w-4 h-4" />
                  Nasıl çalışır?
                </div>
                <div className="mt-8 grid md:grid-cols-3 gap-8">
                  {steps.map((step) => (
                    <div key={step.number}>
                      <div className="text-4xl font-semibold text-slate-200">{step.number}</div>
                      <h3 className="mt-2 text-lg font-semibold text-slate-900">{step.title}</h3>
                      <p className="mt-2 text-sm text-slate-500">{step.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-10 grid md:grid-cols-2 gap-4 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Okundu kaydı oluşur
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Cihaz bilgisi alınır
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Panelde görünür
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Gerçek zamanlı bildirim gelir
                  </div>
                </div>
              </div>
            </section>

            {/* Security */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
              <div className="max-w-6xl mx-auto">
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-500">Güvenlik</p>
                  <h2 className="mt-2 text-3xl font-semibold text-slate-900">Gizliliğiniz önceliğimizdir</h2>
                </div>
                <div className="mt-10 grid md:grid-cols-3 gap-6">
                  {[
                    { icon: Lock, text: 'Veriler şifreli olarak saklanır' },
                    { icon: Shield, text: 'RLS aktif, her kullanıcı kendi verilerini görür' },
                    { icon: Database, text: 'Hiçbir mail içeriği kaydedilmez' },
                    { icon: Eye, text: 'Yalnızca pixel tetiklenme bilgileri tutulur' },
                    { icon: CheckCircle, text: 'KVKK ve GDPR uyumlu altyapı' },
                    { icon: Lock, text: 'Supabase Row Level Security koruması' }
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_15px_50px_rgba(15,23,42,0.07)]"
                    >
                      <div className="w-10 h-10 rounded-2xl border border-white/70 bg-white/70 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-emerald-500" />
                      </div>
                      <p className="mt-4 text-sm font-medium text-slate-600">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-semibold text-center text-slate-900">Sık Sorulan Sorular</h2>
                <div className="mt-10 space-y-4">
                  {faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="group rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
                    >
                      <summary className="flex items-center justify-between cursor-pointer text-left">
                        <h3 className="text-base font-semibold text-slate-900 pr-6">{faq.question}</h3>
                        <ChevronDown className="w-5 h-5 text-slate-400 transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="mt-4 text-sm text-slate-500">{faq.answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className="px-4 sm:px-6 lg:px-8 pb-24">
              <div className="max-w-5xl mx-auto rounded-[36px] border border-transparent bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-12 text-center text-white shadow-[0_35px_120px_rgba(15,23,42,0.45)]">
                <p className="text-sm uppercase tracking-[0.3em] text-white/60">Hazır mısınız?</p>
                <h2 className="mt-4 text-4xl font-semibold">Tüm özellikler sonsuza kadar ücretsiz</h2>
                <p className="mt-3 text-white/70">Sınırsız pixel, sınırsız mail. Kredi kartı gerekmez.</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-slate-900"
                  >
                    Ücretsiz Hesap Oluştur
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-4 text-sm font-semibold text-white/80"
                  >
                    Fiyatlandırma detayları
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
