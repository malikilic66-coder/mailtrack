'use client'

import Link from 'next/link'
import Footer from '@/components/Footer'
import SiteHeader from '@/components/SiteHeader'
import { FileText, AlertTriangle, CheckCircle, XCircle, Scale, Users } from 'lucide-react'

const sections = [
  {
    icon: CheckCircle,
    title: '1. Hizmet Tanımı',
    content: [
      'MailSight bir e-posta takip hizmetidir',
      'Pixel-based tracking teknolojisi kullanır',
      'Kullanıcılar mail açılma istatistiklerini görür',
      'Hizmet "olduğu gibi" sunulur',
      'Uptime garantisi %99.5 hedeflenir (best-effort)',
      'Beta özellikleri deneysel olabilir'
    ]
  },
  {
    icon: Users,
    title: '2. Kullanıcı Sorumlulukları',
    content: [
      'Spam veya kötü amaçlı mail göndermek yasaktır',
      'Hesap bilgilerinizi güvende tutmaktan siz sorumlusunuz',
      'Yasal düzenlemelere (GDPR, KVKK) uymanız gerekir',
      'Başkasının hesabını kullanmak yasaktır',
      'Bot/otomasyonla kötüye kullanım yasaktır',
      'Yanlış bilgi vermek hesap kapatma sebebidir'
    ]
  },
  {
    icon: XCircle,
    title: '3. Yasak Kullanımlar',
    content: [
      'Spam mail göndermek',
      'Phishing veya dolandırıcılık',
      'Kişisel verileri izinsiz toplamak',
      'Sistemi hacklemek veya tersine mühendislik',
      'Rate-limit bypass veya DDoS',
      'Başkalarının haklarını ihlal eden içerik'
    ]
  },
  {
    icon: AlertTriangle,
    title: '4. Hizmet Kesintileri',
    content: [
      'Planlı bakım önceden duyurulur',
      'Acil müdahaleler anında yapılabilir',
      'Force-majeure durumlarında sorumluluk kabul edilmez',
      'Veri kaybı riskini minimize ediyoruz (backup)',
      'Kritik hatalar 24 saat içinde giderilir',
      'Uptime SLA garantisi yoktur (free tier)'
    ]
  },
  {
    icon: Scale,
    title: '5. Sorumluluk Sınırları',
    content: [
      'Hizmet ücretsiz olduğu için mali sorumluluk kabul edilmez',
      'Veri kaybından kullanıcı sorumludur (yedekleme)',
      'Mail istemcilerinin pixel engellemesi bizim kontrolümüz dışıdır',
      'Yanlış istatistiklerden sorumluluk kabul edilmez',
      'Üçüncü parti servislerin (Supabase) hataları',
      'Maksimum sorumluluk: 0 TL (ücretsiz hizmet)'
    ]
  },
  {
    icon: FileText,
    title: '6. Değişiklikler ve Fesih',
    content: [
      'Bu şartlar önceden haber verilmeden değiştirilebilir',
      'Hesabınızı istediğiniz zaman kapatabilirsiniz',
      'Şartları ihlal ederseniz hesabınız kapatılabilir',
      'Hesap kapatıldığında veriler 30 gün içinde silinir',
      'Önemli değişiklikler mail ile bildirilir',
      'Hizmeti kullanmaya devam ederseniz yeni şartları kabul etmiş sayılırsınız'
    ]
  }
]
export default function TermsPage() {
  return (
    <div className="bg-[#f4f6fb] min-h-screen text-slate-900">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[320px] bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="absolute -left-10 top-32 h-72 w-72 rounded-full bg-gradient-to-br from-blue-200/50 via-white to-transparent blur-3xl" />
        <div className="absolute right-10 top-0 h-52 w-52 rounded-full bg-gradient-to-br from-purple-200/60 via-white to-transparent blur-3xl" />

        <div className="relative z-10">
          <SiteHeader />

          <main>
            <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700">
                  Resmi kullanım şartları
                </div>
                <h1 className="mt-6 text-4xl md:text-5xl font-semibold text-slate-900">
                  MailSight Kullanım Şartları
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                  Hizmetimizi kullanırken kabul ettiğiniz sorumluluk ve hakları yalın şekilde paylaşıyoruz.
                </p>
              </div>
            </section>

            <section className="px-4 sm:px-6 lg:px-8 pb-10">
              <div className="max-w-4xl mx-auto rounded-[30px] border border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Önemli hatırlatma</h3>
                    <p className="mt-1 text-sm text-amber-700">
                      MailSight kullanırken KVKK ve GDPR gibi yerel veri koruma yasalarına uymak sizin sorumluluğunuzdadır. Mail takibi yapmadan önce alıcı onayı almanız gerekebilir.
                    </p>
                  </div>
                </div>
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
                        <section.icon className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                        <ul className="mt-4 space-y-2 text-sm text-slate-600">
                          {section.content.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400" />
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

              <div className="mt-10 rounded-[32px] border border-white/70 bg-white/90 p-10 text-center shadow-[0_25px_70px_rgba(15,23,42,0.12)]">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="mt-4 text-2xl font-semibold text-slate-900">Şartları kabul ediyor musunuz?</h3>
                <p className="mt-2 text-sm text-slate-500">
                  MailSight'ı kullanmaya devam ederek bu şartları kabul etmiş olursunuz.
                </p>
                <Link
                  href="/auth/register"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white"
                >
                  Kabul Ediyorum & Başla
                </Link>
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  )
}
