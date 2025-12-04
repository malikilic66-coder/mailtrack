'use client'

import Link from 'next/link'
import ParticleCanvas from '@/components/ParticleCanvas'
import Footer from '@/components/Footer'
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
              <Link href="/guide" className="text-gray-600 hover:text-gray-900 transition-colors">
                Rehber
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

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', opacity: 0 }}>
          <div className="inline-block mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
              <Scale className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Kullanım Şartları
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            MailSight hizmetini kullanarak aşağıdaki şartları kabul etmiş olursunuz.
          </p>
        </div>
      </section>

      {/* Warning Box */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-orange-900 mb-2">Önemli Uyarı</h3>
              <p className="text-orange-800 text-sm">
                MailSight'ı kullanırken yerel veri koruma yasalarına (KVKK, GDPR) uymak sizin sorumluluğunuzdadır. 
                Mail takibi için alıcılardan izin almanız gerekebilir.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="section-card bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all"
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards', opacity: 0 }}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-100 flex items-center justify-center">
                    <section.icon className="w-7 h-7 text-purple-600" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <ul className="space-y-3">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Last Updated */}
        <div className="mt-12 text-center text-sm text-gray-500">
          Son güncelleme: 4 Aralık 2025
        </div>

        {/* Acceptance Box */}
        <div className="mt-12 bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-2xl p-8 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Şartları kabul ediyor musunuz?
          </h3>
          <p className="text-gray-600 mb-6">
            Hizmeti kullanmaya devam ederek bu şartları kabul etmiş olursunuz.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-black transition-all hover:scale-105 shadow-lg"
          >
            Kabul Ediyorum & Başla
          </Link>
        </div>
      </section>

      <Footer />

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
        .section-card {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  )
}
