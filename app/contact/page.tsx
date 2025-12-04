'use client'

import Link from 'next/link'
import ParticleCanvas from '@/components/ParticleCanvas'
import Footer from '@/components/Footer'
import { Mail, MessageSquare, Github, Send, Clock, MapPin } from 'lucide-react'
import { useState } from 'react'

const contactMethods = [
  {
    icon: Mail,
    title: 'E-posta',
    description: 'En hızlı yanıt yolu',
    value: 'support@mailsight.com',
    action: 'mailto:support@mailsight.com',
    color: 'blue'
  },
  {
    icon: Github,
    title: 'GitHub',
    description: 'Bug report & feature request',
    value: 'github.com/mailsight',
    action: 'https://github.com',
    color: 'gray'
  },
  {
    icon: MessageSquare,
    title: 'İletişim Formu',
    description: 'Aşağıdaki formu doldurun',
    value: 'Detaylı sorular için',
    action: '#form',
    color: 'green'
  }
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate form submission
    const mailtoLink = `mailto:support@mailsight.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`İsim: ${formData.name}\nE-posta: ${formData.email}\n\n${formData.message}`)}`
    window.location.href = mailtoLink
    
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg animate-pulse-glow">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Bize Ulaşın
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sorularınız, geri bildirimleriniz veya destek talepleriniz için buradayız.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.action}
              target={method.action.startsWith('http') ? '_blank' : undefined}
              rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="method-card bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1"
              style={{ animationDelay: `${0.2 + index * 0.1}s`, animationFillMode: 'forwards', opacity: 0 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-${method.color}-50 flex items-center justify-center mb-4`}>
                <method.icon className={`w-6 h-6 text-${method.color}-600`} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{method.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{method.description}</p>
              <p className={`text-sm font-medium text-${method.color}-600`}>{method.value}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="form" className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">İletişim Formu</h2>
            <p className="text-gray-600">Formu doldurun, size en kısa sürede dönelim</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  İsim Soyisim
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Adınız Soyadınız"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="ornek@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Konu
              </label>
              <select
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="">Konu seçin...</option>
                <option value="Teknik Destek">Teknik Destek</option>
                <option value="Özellik Talebi">Özellik Talebi</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Hesap Sorunu">Hesap Sorunu</option>
                <option value="KVKK Talebi">KVKK Talebi</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Mesajınız
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                placeholder="Detaylı açıklama yazın..."
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-black transition-all hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitted ? (
                <>
                  <Mail className="w-5 h-5" />
                  Gönderildi!
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Gönder
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex items-center justify-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>24-48 saat içinde yanıt</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Türkiye</span>
              </div>
            </div>
          </div>
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
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.4);
          }
          50% {
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.6);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .animate-pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
        .method-card {
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  )
}
