import Link from 'next/link'
import { Eye, CheckCircle, Clock, TrendingUp, ArrowRight, Mail, Zap, Shield } from 'lucide-react'
import FloatingDots from '@/components/FloatingDots'

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingDots />
      
      {/* Navbar */}
      <nav className="relative z-10 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-white dark:text-black" />
              </div>
              <span className="text-xl font-bold">MailSight</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="btn-secondary">
                Giriş Yap
              </Link>
              <Link href="/auth/register" className="btn-primary">
                Ücretsiz Başla
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            E-postalarınızı
            <br />
            <span className="text-gray-600 dark:text-gray-400">takip edin</span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Gönderdiğiniz e-postaların ne zaman, hangi cihazdan açıldığını öğrenin. 
            Basit, hızlı ve güvenilir.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/auth/register" 
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2"
            >
              5 Dakikada Başla
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="#features" 
              className="btn-secondary text-lg px-8 py-4"
            >
              Özellikleri Keşfet
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">5 dk</div>
              <div className="text-gray-600 dark:text-gray-400">
                Kurulum süresi
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400">
                Tespit oranı
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold mb-2">∞</div>
              <div className="text-gray-600 dark:text-gray-400">
                Sınırsız takip
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 bg-gray-50 dark:bg-gray-800/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Öne Çıkan Özellikler</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              E-posta takibini basit ve güçlü hale getiren özellikler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Anlık Bildirim</h3>
              <p className="text-gray-600 dark:text-gray-400">
                E-postanız açıldığı anda gerçek zamanlı bildirim alın. 
                Hiçbir fırsatı kaçırmayın.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Detaylı İstatistik</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Cihaz türü, tarayıcı, konum ve zaman bilgilerini görüntüleyin.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Gizlilik Odaklı</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Verileriniz güvende. Sadece siz takip bilgilerinize erişebilirsiniz.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Zaman Çizelgesi</h3>
              <p className="text-gray-600 dark:text-gray-400">
                E-postanızın ne zaman, kaç kere okunduğunu görün.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analitik Dashboard</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tüm e-postalarınızın performansını tek yerden yönetin.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Kolay Entegrasyon</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tek satır HTML kodu ile tüm e-posta istemcileriyle uyumlu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Nasıl Çalışır?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              3 basit adımda e-posta takibi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Kayıt Olun</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ücretsiz hesap oluşturun ve dashboard'a erişin.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Pixel Kodu Alın</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yeni izleme oluşturun ve özel tracking pixel kodunuzu kopyalayın.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Mailinize Ekleyin</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Kodu e-postanızın HTML kısmına yapıştırın ve gönderin!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-black dark:bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white dark:text-black mb-6">
            Hazır mısınız?
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-600 mb-10">
            Bugün başlayın, e-postalarınızın etkisini ölçün.
          </p>
          <Link 
            href="/auth/register" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-black text-black dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-200 shadow-lg text-lg"
          >
            Ücretsiz Başla
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-100 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-white dark:text-black" />
              </div>
              <span className="font-bold">MailSight</span>
            </div>
            
            <div className="text-sm text-gray-600 dark:text-gray-400">
              © 2025 MailSight. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
