'use client'

import Footer from '@/components/Footer'
import SiteHeader from '@/components/SiteHeader'
import { Mail, MessageSquare, Github, Send, Clock, MapPin } from 'lucide-react'
import { useState } from 'react'

const contactMethods = [
  {
    icon: Mail,
    title: 'E-posta',
    description: 'En hızlı yanıt yolu',
    value: 'support@mailsight.com',
    action: 'mailto:support@mailsight.com',
    bgClass: 'bg-emerald-50 border border-emerald-100',
    textClass: 'text-emerald-600'
  },
  {
    icon: Github,
    title: 'GitHub',
    description: 'Bug report & feature request',
    value: 'github.com/mailsight',
    action: 'https://github.com',
    bgClass: 'bg-slate-50 border border-slate-200',
    textClass: 'text-slate-600'
  },
  {
    icon: MessageSquare,
    title: 'İletişim Formu',
    description: 'Aşağıdaki formu doldurun',
    value: 'Detaylı sorular için',
    action: '#form',
    bgClass: 'bg-blue-50 border border-blue-100',
    textClass: 'text-blue-600'
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
    const mailtoLink = `mailto:support@mailsight.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `İsim: ${formData.name}\nE-posta: ${formData.email}\n\n${formData.message}`
    )}`
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
    <div className="bg-[#f4f6fb] min-h-screen text-slate-900">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[320px] bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="absolute -left-12 top-24 h-72 w-72 rounded-full bg-gradient-to-br from-blue-200/50 via-white to-transparent blur-3xl" />
        <div className="absolute right-6 top-48 h-60 w-60 rounded-full bg-gradient-to-br from-emerald-200/50 via-white to-transparent blur-3xl" />

        <div className="relative z-10">
          <SiteHeader />

          <main>
            <section className="px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
              <div className="max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-600">
                  24-48 saat içinde dönüş
                </div>
                <h1 className="mt-6 text-4xl md:text-5xl font-semibold text-slate-900">Bize Ulaşın</h1>
                <p className="mt-4 text-lg text-slate-600">
                  Sorularınız, geri bildirimleriniz veya destek talepleriniz için buradayız.
                </p>
              </div>
            </section>

            <section className="px-4 sm:px-6 lg:px-8 pb-16">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.action}
                    target={method.action.startsWith('http') ? '_blank' : undefined}
                    rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_15px_55px_rgba(15,23,42,0.08)] transition-transform hover:-translate-y-1"
                  >
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${method.bgClass}`}>
                      <method.icon className={`h-5 w-5 ${method.textClass}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">{method.title}</h3>
                    <p className="mt-1 text-sm text-slate-500">{method.description}</p>
                    <p className={`mt-3 text-sm font-medium ${method.textClass}`}>{method.value}</p>
                  </a>
                ))}
              </div>
            </section>

            <section id="form" className="px-4 sm:px-6 lg:px-8 pb-24">
              <div className="mx-auto max-w-4xl rounded-[32px] border border-white/70 bg-white/90 p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
                <div className="text-center">
                  <h2 className="text-3xl font-semibold text-slate-900">İletişim Formu</h2>
                  <p className="mt-2 text-sm text-slate-500">Formu doldurun, size en kısa sürede dönelim.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="text-sm font-medium text-slate-600">
                        İsim Soyisim
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/10"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="text-sm font-medium text-slate-600">
                        E-posta
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/10"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="text-sm font-medium text-slate-600">
                      Konu
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/10"
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
                    <label htmlFor="message" className="text-sm font-medium text-slate-600">
                      Mesajınız
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-transparent focus:ring-2 focus:ring-slate-900/10"
                      placeholder="Detaylı açıklama yazın..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitted}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-8 py-4 text-sm font-semibold text-white shadow-[0_20px_40px_rgba(15,23,42,0.35)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitted ? (
                      <>
                        <Mail className="h-5 w-5" /> Gönderildi!
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" /> Gönder
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-[0.3em] text-slate-400">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Clock className="h-4 w-4" /> 24-48 Saat Yanıt
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin className="h-4 w-4" /> Türkiye
                  </div>
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
