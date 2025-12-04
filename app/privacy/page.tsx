'use client'

import Link from 'next/link'
import ParticleCanvas from '@/components/ParticleCanvas'
import Footer from '@/components/Footer'
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-glow">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Gizlilik Politikası & KVKK
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Verileriniz bizim için değerlidir. Nasıl topladığımız, kullandığımız ve koruduğumuzu şeffaf şekilde açıklıyoruz.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="bg-green-50 border border-green-200 rounded-full px-4 py-2 text-sm font-medium text-green-700">
              KVKK Uyumlu
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-full px-4 py-2 text-sm font-medium text-blue-700">
              GDPR Uyumlu
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
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 flex items-center justify-center">
                    <section.icon className="w-7 h-7 text-blue-600" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
                  <ul className="space-y-3">
                    {section.content.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
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

        {/* Contact CTA */}
        <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Sorularınız mı var?
          </h3>
          <p className="text-gray-600 mb-6">
            Gizlilik ve KVKK ile ilgili tüm talepleriniz için bizimle iletişime geçin.
          </p>
          <a
            href="mailto:privacy@mailsight.com"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-black transition-all hover:scale-105 shadow-lg"
          >
            <Mail className="w-5 h-5" />
            privacy@mailsight.com
          </a>
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
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.8);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .section-card {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  )
}
