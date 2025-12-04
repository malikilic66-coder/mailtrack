'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import ParticleCanvas from '@/components/ParticleCanvas'
import { ArrowRight, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır')
      setLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setSuccess(true)
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 bg-[#f4f6fb]">
        <ParticleCanvas />
        
        <div className="w-full max-w-md relative z-10 animate-fade-in-up">
          <div className="bg-white/80 backdrop-blur-xl border border-white/70 rounded-[32px] p-8 shadow-[0_40px_120px_rgba(15,23,42,0.15)] text-center">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold mb-3 text-slate-900">Kayıt Başarılı!</h2>
            <p className="text-slate-600 mb-6">
              E-posta adresinize bir doğrulama linki gönderdik. 
              Lütfen e-postanızı kontrol edin ve hesabınızı doğrulayın.
            </p>
            <Link href="/auth/login" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-full font-semibold hover:bg-slate-800 transition-all hover:shadow-lg">
              Giriş Sayfasına Git
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
        
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
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 bg-[#f4f6fb]">
      <ParticleCanvas />
      
      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-slate-900 rounded-2xl"></div>
              <div className="absolute inset-1 bg-white rounded-xl"></div>
              <div className="absolute inset-2 bg-slate-900 rounded-lg"></div>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              MailSight
            </h1>
          </Link>
          <p className="text-slate-600">
            5 dakikada başlayın
          </p>
        </div>

        {/* Register Form */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/70 rounded-[32px] p-8 shadow-[0_40px_120px_rgba(15,23,42,0.15)]">
          <h2 className="text-2xl font-semibold mb-6 text-slate-900">Kayıt Ol</h2>
          
          {error && (
            <div className="mb-4 p-4 bg-red-50/80 border border-red-200 rounded-2xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2 text-slate-700">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
                placeholder="ornek@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2 text-slate-700">
                Şifre
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2 text-slate-700">
                Şifre Tekrar
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-3.5 rounded-full font-semibold hover:bg-slate-800 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                'Kayıt yapılıyor...'
              ) : (
                <>
                  Hesap Oluştur
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-slate-600">
              Zaten hesabınız var mı?{' '}
            </span>
            <Link
              href="/auth/login"
              className="font-semibold text-slate-900 hover:text-slate-700 transition-colors"
            >
              Giriş Yap
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
          >
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
      
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
      `}</style>
    </div>
  )
}
