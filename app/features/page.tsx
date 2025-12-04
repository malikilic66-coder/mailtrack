'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import ParticleCanvas from '@/components/ParticleCanvas'
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
    color: 'blue'
  },
  {
    icon: Monitor,
    title: 'Cihaz / Tarayıcı Tespiti',
    description: 'Mailin hangi cihaz, tarayıcı ve işletim sisteminde açıldığını görün.',
    color: 'green'
  },
  {
    icon: Eye,
    title: '1×1 Görünmez Pixel',
    description: 'Tüm mail sağlayıcılarıyla uyumlu görünmez izleme teknolojisi.',
    color: 'purple'
  },
  {
    icon: Clock,
    title: 'Detaylı Okuma Günlüğü',
    description: 'IP, zaman damgası, tekrar okuma sayısı, referans mail istemcisi.',
    color: 'orange'
  },
  {
    icon: BarChart3,
    title: 'Etkili Dashboard',
    description: 'Tüm maillerinizi yönetebileceğiniz modern bir panel.',
    color: 'indigo'
  },
  {
    icon: Zap,
    title: 'Kolay Entegrasyon',
    description: 'HTML\'e yapıştır-yap kullan. Kodlama bilmen gerekmez.',
    color: 'red'
  }
]

const steps = [
  {
    number: '1',
    title: 'Pixel oluştur',
    description: 'Dashboard\'dan bir izleme kodu oluştur.'
  },
  {
    number: '2',
    title: 'Mail\'e ekle',
    description: 'Kod otomatik HTML olarak gelir. Mail içeriğine yerleştir.'
  },
  {
    number: '3',
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
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards', opacity: 0 }}>
          <div className="inline-block mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-glow">
              <Eye className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            E-posta takip etmenin<br />
            <span className="text-gray-500">en hızlı ve en şeffaf yolu</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            MailSight ile gönderdiğiniz e-postaların açılma anlarını, cihaz bilgilerini, 
            konum ve tarayıcı tiplerini anlık olarak görün. Tek tıkla izleme kodu oluşturun.
          </p>

          <Link 
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-black transition-all hover:scale-105 shadow-xl"
          >
            Hemen Başla
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all hover:-translate-y-2"
              style={{ 
                animationDelay: `${0.1 + index * 0.1}s`,
                animationFillMode: 'forwards',
                opacity: 0
              }}
            >
              <div className={`w-14 h-14 rounded-full bg-${feature.color}-50 flex items-center justify-center mb-6`}>
                <feature.icon className={`w-7 h-7 text-${feature.color}-600`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Nasıl Çalışır?
          </h2>
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-start gap-6 step-item" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {step.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-lg text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block w-8 h-8 text-gray-300" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8">
            <h4 className="text-xl font-bold text-blue-900 mb-4">✔ Alıcı maili açtığı anda:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-blue-800">
                <CheckCircle className="w-5 h-5" />
                <span>Okundu kaydı oluşur</span>
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                <CheckCircle className="w-5 h-5" />
                <span>Cihaz bilgisi alınır</span>
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                <CheckCircle className="w-5 h-5" />
                <span>Panelde görünür</span>
              </div>
              <div className="flex items-center gap-2 text-blue-800">
                <CheckCircle className="w-5 h-5" />
                <span>Gerçek zamanlı bildirim gelir</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-green-50 rounded-2xl mb-6">
            <Shield className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Gizliliğiniz önceliğimizdir
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="flex items-start gap-4 p-6 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-gray-700 font-medium">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative z-10 bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Sık Sorulan Sorular
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-white border border-gray-100 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <h3 className="text-lg font-semibold text-gray-900 pr-8">{faq.question}</h3>
                  <ChevronDown className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Hemen başlamaya hazır mısınız?
        </h2>
        <p className="text-xl text-gray-600 mb-10">
          5 dakikada kurulum, sınırsız kullanım, tamamen ücretsiz.
        </p>
        <Link
          href="/auth/register"
          className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-black transition-all hover:scale-105 shadow-xl"
        >
          Ücretsiz Hesap Oluştur
          <ArrowRight className="w-5 h-5" />
        </Link>
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
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        .feature-card {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .step-item {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          animation-fill-mode: forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
