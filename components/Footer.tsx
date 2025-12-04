'use client'

import Link from 'next/link'
import { Github, Mail, Shield, FileText, HelpCircle } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface Snowflake {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export default function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create snowflakes
    const snowflakes: Snowflake[] = []
    const snowflakeCount = 30

    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: Math.random() * 0.5 + 0.3,
        radius: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      })
    }

    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      snowflakes.forEach(flake => {
        flake.x += flake.vx
        flake.y += flake.vy

        // Reset if out of bounds
        if (flake.y > canvas.height) {
          flake.y = 0
          flake.x = Math.random() * canvas.width
        }
        if (flake.x < 0) flake.x = canvas.width
        if (flake.x > canvas.width) flake.x = 0

        // Draw snowflake
        ctx.beginPath()
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <footer className="relative bg-gray-900 text-gray-300 overflow-hidden">
      {/* Snow Animation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.4 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 bg-blue-400 rounded-tr-lg rounded-bl-lg transform rotate-45 opacity-80"></div>
                <div className="absolute inset-0 bg-red-400 rounded-full scale-50 mix-blend-multiply"></div>
              </div>
              <span className="text-xl font-medium tracking-tight">
                <span className="font-bold text-gray-200">Mail</span>
                <span className="text-gray-400">Sight</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              E-posta takip etmenin en hızlı ve en şeffaf yolu.
            </p>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="font-bold text-white mb-4">Ürün</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="text-sm hover:text-white transition-colors">
                  Özellikler
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm hover:text-white transition-colors">
                  Fiyatlandırma
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-sm hover:text-white transition-colors">
                  Rehber
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-bold text-white mb-4">Şirket</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors flex items-center gap-2"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="font-bold text-white mb-4">Yasal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  KVKK & Gizlilik
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link href="/guide" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" />
                  Destek
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Hemen ücretsiz başlayın
            </h3>
            <p className="text-blue-100 mb-6">
              Kredi kartı gerektirmez. Sınırsız takip.
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg"
            >
              Ücretsiz Başla
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2025 MailSight. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-6">
            <Link href="/auth/login" className="hover:text-white transition-colors">
              Giriş
            </Link>
            <Link href="/auth/register" className="hover:text-white transition-colors">
              Ücretsiz Başla
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
