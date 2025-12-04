'use client'

import Link from 'next/link'
import ParticleCanvas from '@/components/ParticleCanvas'
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
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', opacity: 0 }}>
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 bg-green-50 px-6 py-3 rounded-full border border-green-200">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="text-green-800 font-bold text-lg">%100 Ücretsiz</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            MailSight tüm özellikleriyle<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              tamamen ücretsiz!
            </span>
          </h1>
          
          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-lg font-semibold text-gray-700 mb-10">
              <div className="flex flex-col items-center gap-2">
                <Infinity className="w-8 h-8 text-blue-600" />
                <span>Her zaman ücretsiz</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <span>Gizli ücret yok</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Infinity className="w-8 h-8 text-purple-600" />
                <span>Sınırsız takip</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Infinity className="w-8 h-8 text-orange-600" />
                <span>Sınırsız pixel</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Card */}
      <section className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div 
          className="pricing-card bg-white border-2 border-gray-900 rounded-3xl p-10 shadow-2xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards', opacity: 0 }}
        >
          {/* Gradient shine effect */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-shine"></div>
          
          <div className="text-center mb-8">
            <h3 className="text-4xl font-bold text-gray-900 mb-2">ÜCRETSİZ</h3>
            <p className="text-gray-600">Tüm özellikler dahil, sınırsız kullanım</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {allFeatures.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-800 font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 bg-gray-900 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-black transition-all hover:scale-105 shadow-xl"
            >
              Hemen Başla
              <ArrowRight className="w-6 h-6" />
            </Link>
            <p className="text-sm text-gray-500 mt-4">Kredi kartı gerektirmez • 5 dakikada kurulum</p>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="relative z-10 bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Gelecek Özellikler
            </h2>
            <p className="text-xl text-gray-600">
              MailSight sürekli gelişiyor. Yakında gelecek özellikler:
            </p>
          </div>

          <div className="space-y-6">
            {roadmap.map((item, index) => (
              <div
                key={index}
                className="roadmap-item bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all flex items-start gap-6"
                style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards', opacity: 0 }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-6">Öneriniz mi var?</p>
            <a
              href="mailto:support@mailsight.com"
              className="inline-flex items-center gap-2 border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-900 hover:text-white transition-all"
            >
              Geri Bildirim Gönderin
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Hemen başlayın, sonsuza kadar ücretsiz
          </h2>
          <p className="text-xl mb-10 text-blue-100">
            Kredi kartı yok, gizli ücret yok, deneme süresi yok. Sadece sınırsız kullanım.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-10 py-4 rounded-full text-lg font-bold hover:shadow-2xl transition-all hover:scale-105"
          >
            Ücretsiz Hesap Oluştur
            <ArrowRight className="w-6 h-6" />
          </Link>
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
        @keyframes shine {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-shine {
          background-size: 200% auto;
          animation: shine 3s linear infinite;
        }
        .pricing-card {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .roadmap-item {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  )
}
