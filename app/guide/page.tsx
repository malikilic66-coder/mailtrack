'use client'

import Link from 'next/link'
import ParticleCanvas from '@/components/ParticleCanvas'
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
    <div className="min-h-screen bg-white relative overflow-hidden">
      <ParticleCanvas />

      {/* Navbar */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 bg-blue-500 rounded-tr-lg rounded-bl-lg transform rotate-45 opacity-80"></div>
                <div className="absolute inset-0 bg-red-500 rounded-full scale-50 mix-blend-multiply"></div>
              </div>
              <span className="text-xl font-medium tracking-tight text-gray-700">
                <span className="font-bold text-gray-500">Mail</span>Sight
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              <Link href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">
                Özellikler
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                Fiyatlandırma
              </Link>
              <Link href="/auth/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                Giriş
              </Link>
              <Link href="/auth/register" className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-black transition-all hover:scale-105 shadow-md">
                Ücretsiz Başla
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', opacity: 0 }}>
          <div className="inline-block mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Code className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            5 dakikada MailSight'a başlayın
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Karmaşık kurulum yok, kod bilgisi gerekmez. Sadece 5 adımda mail takip sisteminizi kurun.
          </p>
        </div>
      </section>

      {/* Setup Steps */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-8">
          {setupSteps.map((step, index) => (
            <div
              key={step.number}
              className="step-card bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all"
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards', opacity: 0 }}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-lg text-gray-600 mb-4">{step.description}</p>
                  
                  {step.code && (
                    <div className="bg-gray-900 rounded-xl p-4 relative group">
                      <code className="text-sm text-green-400 font-mono block overflow-x-auto">
                        {step.code}
                      </code>
                      <button
                        onClick={() => copyCode(step.code!, index)}
                        className="absolute top-3 right-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      >
                        {copiedIndex === index ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-gray-400" />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {step.number === 5 && (
                <div className="mt-6 ml-20 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-900 mb-2">Başarılı! 🎉</h4>
                      <p className="text-blue-800 text-sm">
                        Artık her mail açıldığında panelinizde anında görünecek. 
                        Dashboard'unuza giderek istatistikleri kontrol edebilirsiniz.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-black transition-all hover:scale-105 shadow-xl"
          >
            Hemen Başla
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>

      {/* Video Guide Section */}
      <section className="relative z-10 bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block p-4 bg-white rounded-2xl shadow-md mb-6">
            <PlayCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Video Rehber</h2>
          <p className="text-gray-600 mb-8">
            Görsel anlatım için video rehberimiz yakında yayında olacak.
          </p>
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-2xl p-16">
            <p className="text-gray-400 font-medium">Video çekimi devam ediyor...</p>
          </div>
        </div>
      </section>

      {/* Troubleshooting FAQ */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-orange-50 rounded-2xl mb-6">
            <HelpCircle className="w-12 h-12 text-orange-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            SSS & Sorun Giderme
          </h2>
          <p className="text-xl text-gray-600">
            En sık karşılaşılan sorular ve çözümleri
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group bg-white border border-gray-100 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                </div>
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center group-open:rotate-180 transition-transform">
                  <ArrowRight className="w-4 h-4 text-gray-600 -rotate-90" />
                </div>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-gray-600 leading-relaxed pl-9">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
          <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-blue-900 mb-2">
            Hala yardıma mı ihtiyacınız var?
          </h3>
          <p className="text-blue-700 mb-6">
            Destek ekibimiz size yardımcı olmak için burada.
          </p>
          <a
            href="mailto:support@mailsight.com"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all hover:scale-105"
          >
            Bize Ulaşın
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .step-card {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  )
}
