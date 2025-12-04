import { Link } from 'react-router-dom'
import { Mail, Eye, Bell, Zap } from 'lucide-react'

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Mail className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">MailTrack</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/login" 
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Giriş Yap
            </Link>
            <Link 
              to="/register" 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ücretsiz Başla
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            E-postalarınızın
            <span className="text-blue-600"> ne zaman okunduğunu</span> bilin
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Görünmez piksel teknolojisi ile e-postalarınızı takip edin. 
            Gerçek zamanlı bildirimler alın, detaylı raporlar görün.
          </p>
          <Link 
            to="/register" 
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
          >
            <Zap className="w-5 h-5" />
            Hemen Başla - Ücretsiz
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Nasıl Çalışır?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Mail className="w-8 h-8" />}
              title="Piksel Oluştur"
              description="Her e-posta için benzersiz bir tracking pikseli oluşturun. Kopyalayıp e-postanıza yapıştırın."
            />
            <FeatureCard 
              icon={<Eye className="w-8 h-8" />}
              title="Takip Et"
              description="E-postanız açıldığında görünmez piksel tetiklenir ve okuma kaydedilir."
            />
            <FeatureCard 
              icon={<Bell className="w-8 h-8" />}
              title="Bildirim Al"
              description="Gerçek zamanlı bildirimlerle e-postanızın ne zaman okunduğunu anında öğrenin."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            E-posta takibine bugün başlayın
          </h2>
          <p className="text-gray-600 mb-8">
            Ücretsiz hesap oluşturun ve sınırsız tracking piksel üretin.
          </p>
          <Link 
            to="/register" 
            className="inline-block bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Ücretsiz Kayıt Ol
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="w-5 h-5" />
            <span className="font-medium">MailTrack</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2024 MailTrack. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
