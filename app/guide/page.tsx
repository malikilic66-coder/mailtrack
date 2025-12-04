'use client'

import Link from 'next/link'
import Footer from '@/components/Footer'
import SiteHeader from '@/components/SiteHeader'
import {
  CheckCircle,
  ArrowRight,
  Copy,
  Mail,
  Code,
  PlayCircle,
  AlertCircle,
  HelpCircle
} from 'lucide-react'
import { useState } from 'react'

const setupSteps = [
  {
    number: 1,
    title: 'Üye olun',
    description: 'E-posta ile hesabınızı oluşturun.',
    code: null
  },
  {
    number: 2,
    title: 'Pixel oluşturun',
    description: 'Dashboard\'dan "Yeni İzleme Oluştur" butonuna tıklayın.',
    code: null
  },
  {
    number: 3,
    title: 'Pixel kodunu kopyalayın',
    description: 'Size verilen HTML pixel kodunu kopyalayın.',
    code: '<img src="https://mailsight.com/api/pixel/abc123.gif" width="1" height="1" />'
  },
  {
    number: 4,
    title: 'Mail\'inize ekleyin',
    description: 'Mail içeriğine (HTML modunda) yapıştırın.',
    code: null
  },
  {
    number: 5,
    title: 'Gönderin ve takip edin',
    description: 'Alıcı maili açtıktan hemen sonra panelinizde görürsünüz.',
    code: null
  }
]

const faqs = [
  {
    question: 'Pixel neden çalışmaz?',
    answer: 'En yaygın sebep mail istemcisinin resimleri engellemiş olmasıdır. Gmail\'de "Resimleri göster" butonu tıklanmalıdır. Ayrıca pixel kodunun doğru kopyalandığından emin olun.'
  },
  {
    question: 'Gmail clip image ne demektir?',
    answer: 'Gmail çok büyük mailleri kırpar (clip). Mail çok uzunsa pixel son kısımda kalabilir. Pixel\'i mail başına veya imzaya eklemeniz önerilir.'
  },
  {
    question: 'Outlook\'ta resimler engellenirse ne olur?',
    answer: 'Outlook varsayılan olarak dış resimleri engeller. Kullanıcı "Resimleri indir" dediğinde pixel yüklenir ve siz bildirimi alırsınız.'
  },
  {
    question: 'Test için pixel nasıl tetiklenir?',
    answer: 'En kolay yol: Pixel kodunu kendinize mail olarak gönderin ve açın. Veya pixel URL\'sini tarayıcıda açın. Dashboard\'da hemen görünecektir.'
  }
]

export default function GuidePage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div className="bg-[#f4f6fb] min-h-screen text-slate-900">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[320px] bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-sky-200/50 via-white to-transparent rounded-full blur-3xl" />

        <div className="relative z-10">
          <SiteHeader />

          <main>
            {/* Hero */}
            <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Rehber
                </div>
                <h1 className="mt-6 text-4xl md:text-5xl font-semibold text-slate-900">
                  5 dakikada MailSight'a başlayın
                </h1>
                <p className="mt-4 text-lg text-slate-600">
                  Karmaşık kurulum yok, kod bilgisi gerekmez. Sadece 5 adımda mail takip sisteminizi kurun.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white"
                  >
                    Ücretsiz Başla
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/pricing"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-sm font-semibold text-slate-900"
                  >
                    Planı gör
                  </Link>
                </div>
              </div>
            </section>

            {/* Steps */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
              <div className="max-w-4xl mx-auto space-y-6">
                {setupSteps.map((step, index) => (
                  <div
                    key={step.number}
                    className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)]"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/70 bg-white/80 text-base font-semibold text-slate-500">
                          {step.number}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
                          <p className="mt-2 text-sm text-slate-500">{step.description}</p>
                        </div>
                      </div>
                      {step.code && (
                        <div className="relative rounded-2xl border border-slate-900/10 bg-slate-900 px-4 py-3 text-left text-xs text-emerald-300 font-mono">
                          {step.code}
                          <button
                            onClick={() => copyCode(step.code!, index)}
                            className="absolute top-3 right-3 rounded-full border border-white/10 bg-white/10 p-2 text-white"
                          >
                            {copiedIndex === index ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      )}
                    </div>
                    {step.number === 5 && (
                      <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-left text-sm text-emerald-700">
                        Artık her mail açıldığında panelinizde anında görünecek. Dashboard'unuza giderek istatistikleri kontrol edebilirsiniz.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Video */}
            <section className="px-4 sm:px-6 lg:px-8 py-16">
              <div className="max-w-5xl mx-auto rounded-[32px] border border-dashed border-slate-200 bg-white/70 p-12 text-center shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
                <PlayCircle className="mx-auto h-12 w-12 text-slate-400" />
                <h2 className="mt-4 text-2xl font-semibold text-slate-900">Video rehber yakında</h2>
                <p className="mt-2 text-sm text-slate-500">Görsel anlatım için video rehberimiz hazırlanıyor.</p>
                <div className="mt-8 rounded-2xl border border-slate-100 bg-white/80 p-6 text-sm text-slate-400 font-medium">
                  Video çekimi devam ediyor...
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section className="px-4 sm:px-6 lg:px-8 pb-24">
              <div className="max-w-4xl mx-auto">
                <div className="text-center">
                  <HelpCircle className="mx-auto h-12 w-12 text-amber-400" />
                  <h2 className="mt-4 text-3xl font-semibold text-slate-900">SSS & Sorun Giderme</h2>
                  <p className="mt-2 text-slate-500">En sık karşılaşılan sorular</p>
                </div>
                <div className="mt-10 space-y-4">
                  {faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="group rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
                    >
                      <summary className="flex items-center justify-between cursor-pointer text-left">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="w-5 h-5 text-amber-400" />
                          <h3 className="text-base font-semibold text-slate-900">{faq.question}</h3>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 transition-transform group-open:rotate-90" />
                      </summary>
                      <p className="mt-4 text-sm text-slate-500">{faq.answer}</p>
                    </details>
                  ))}
                </div>

                <div className="mt-12 rounded-[30px] border border-slate-100 bg-white/80 p-8 text-center shadow-[0_15px_50px_rgba(15,23,42,0.07)]">
                  <Mail className="mx-auto h-10 w-10 text-slate-400" />
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">Hala yardıma mı ihtiyacınız var?</h3>
                  <p className="mt-2 text-sm text-slate-500">Destek ekibimiz size yardımcı olmak için burada.</p>
                  <a
                    href="mailto:support@mailsight.com"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-semibold text-white"
                  >
                    Bize Ulaşın
                    <Mail className="w-4 h-4" />
                  </a>
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
