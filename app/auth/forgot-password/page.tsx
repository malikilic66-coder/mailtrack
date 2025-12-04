'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import FloatingDots from '@/components/FloatingDots'
import { Eye, ArrowRight, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
        <FloatingDots />
        
        <div className="w-full max-w-md relative z-10">
          <div className="card text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">E-posta Gönderildi!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              E-posta adresinize şifre sıfırlama linki gönderdik. 
              Lütfen gelen kutunuzu kontrol edin.
            </p>
            <Link href="/auth/login" className="btn-primary inline-flex items-center gap-2">
              Giriş Sayfasına Dön
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <FloatingDots />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-white dark:text-black" />
            </div>
            <h1 className="text-3xl font-bold">MailSight</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Şifrenizi sıfırlayın
          </p>
        </div>

        {/* Forgot Password Form */}
        <div className="card">
          <h2 className="text-2xl font-semibold mb-3">Şifremi Unuttum</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
            E-posta adresinizi girin, size şifre sıfırlama linki gönderelim.
          </p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                E-posta
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="ornek@email.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {loading ? (
                'Gönderiliyor...'
              ) : (
                <>
                  Sıfırlama Linki Gönder
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link
              href="/auth/login"
              className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              ← Giriş sayfasına dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
