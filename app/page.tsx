'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react'

export default function HomePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    let animationFrameId: number
    let particles: Particle[] = []
    
    let mouse = { x: -1000, y: -1000, radius: 200 }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    class Particle {
      x: number
      y: number
      baseVx: number
      baseVy: number
      vx: number
      vy: number
      friction: number
      size: number
      color: string
      rotation: number
      rotationSpeed: number
      angle: number
      angleSpeed: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        
        this.baseVx = (Math.random() - 0.5) * 0.5
        this.baseVy = (Math.random() - 0.5) * 0.5
        
        this.vx = this.baseVx
        this.vy = this.baseVy
        
        this.friction = 0.96
        
        this.size = Math.random() * 3 + 1
        this.color = this.getRandomColor()
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.02
        
        this.angle = Math.random() * Math.PI * 2
        this.angleSpeed = Math.random() * 0.02
      }

      getRandomColor() {
        const colors = [
          '#4285F4', // Google Blue
          '#8AB4F8', // Light Blue
          '#174EA6', // Dark Blue
          '#BDC1C6', // Grey
          '#E8F0FE', // Very Light Blue
        ]
        return colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius
          const forceDirectionX = dx / distance
          const forceDirectionY = dy / distance
          const maxForce = 3
          
          this.vx -= forceDirectionX * force * maxForce
          this.vy -= forceDirectionY * force * maxForce
        }

        this.angle += this.angleSpeed
        this.vx += Math.sin(this.angle) * 0.02
        this.vy += Math.cos(this.angle) * 0.02

        this.vx *= this.friction
        this.vy *= this.friction
        
        if (Math.abs(this.vx) < Math.abs(this.baseVx)) this.vx += this.baseVx * 0.1
        if (Math.abs(this.vy) < Math.abs(this.baseVy)) this.vy += this.baseVy * 0.1

        this.x += this.vx
        this.y += this.vy
        this.rotation += this.rotationSpeed + (Math.abs(this.vx) + Math.abs(this.vy)) * 0.05

        if (this.x < -50) this.x = canvas.width + 50
        if (this.x > canvas.width + 50) this.x = -50
        if (this.y < -50) this.y = canvas.height + 50
        if (this.y > canvas.height + 50) this.y = -50
      }

      draw() {
        if (!ctx) return
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        ctx.fillStyle = this.color
        
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        ctx.globalAlpha = Math.min(0.8, 0.3 + speed * 0.1)

        if (Math.random() > 0.5) {
          ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size)
        } else {
          ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2)
        }
        
        ctx.restore()
      }
    }

    const initParticles = () => {
      particles = []
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 1500)
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(p => {
        p.update()
        p.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseOut = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseout', handleMouseOut)

    resizeCanvas()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="relative w-full min-h-screen bg-white text-gray-900 font-sans overflow-hidden">
      
      {/* Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      />

      {/* UI Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Navbar */}
        <header className="w-full px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer select-none">
            <div className="relative w-6 h-6">
              <div className="absolute inset-0 bg-blue-500 rounded-tr-lg rounded-bl-lg transform rotate-45 opacity-80"></div>
              <div className="absolute inset-0 bg-red-500 rounded-full scale-50 mix-blend-multiply"></div>
            </div>
            <span className="text-xl font-medium tracking-tight text-gray-700">
              <span className="font-bold text-gray-500">Mail</span>Sight
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-blue-600 transition-colors">Özellikler</a>
            <a href="#pricing" className="hover:text-blue-600 transition-colors">Fiyatlandırma</a>
            <a href="#guide" className="hover:text-blue-600 transition-colors">Rehber</a>
            <Link href="/auth/login" className="hover:text-blue-600 transition-colors">Giriş</Link>
          </nav>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Link href="/auth/register" className="hidden md:flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg">
              Ücretsiz Başla <ArrowRight className="w-4 h-4" />
            </Link>
            <button 
              className="md:hidden text-gray-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl animate-in slide-in-from-top-5 z-20">
            <a href="#features" className="text-lg font-medium text-gray-700">Özellikler</a>
            <a href="#pricing" className="text-lg font-medium text-gray-700">Fiyatlandırma</a>
            <Link href="/auth/login" className="text-lg font-medium text-gray-700">Giriş</Link>
            <div className="h-px bg-gray-200 w-full my-2"></div>
            <Link href="/auth/register" className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium text-center">
              Ücretsiz Başla
            </Link>
          </div>
        )}

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center px-4 text-center mt-12 md:mt-0">
          
          {/* Small Logo Above Title */}
          <div className="mb-8 animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-8 h-8 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
                  <path d="M50 0 L100 100 L0 100 Z" fill="#4285F4" className="opacity-90"/>
                  <circle cx="50" cy="65" r="20" fill="#EA4335" className="mix-blend-multiply"/>
                  <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="#FBBC05" className="mix-blend-overlay opacity-50"/>
                </svg>
              </div>
              <span className="text-2xl font-medium text-gray-800">MailSight</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-gray-900 leading-[1.1] mb-6 max-w-5xl mx-auto animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            E-postalarınızı <br className="hidden md:block"/>
            <span className="text-gray-500">gerçek zamanlı takip edin</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            Gmail, Outlook ve tüm mail istemcileri ile uyumlu. 
            Gönderdiğiniz e-postaların ne zaman, kim tarafından, hangi cihazdan açıldığını öğrenin.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row items-center gap-4 mt-10 animate-fade-in-up opacity-0" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
            <Link href="/auth/register" className="flex items-center gap-3 bg-[#1a1a1a] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-black transition-all hover:-translate-y-1 shadow-xl hover:shadow-2xl group">
              5 Dakikada Başla
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <a href="#features" className="flex items-center gap-2 bg-gray-100 text-gray-800 px-8 py-4 rounded-full text-lg font-medium hover:bg-white hover:shadow-lg border border-transparent hover:border-gray-200 transition-all hover:-translate-y-1 group">
              Özellikleri Keşfet
              <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900">5dk</div>
              <div className="text-sm text-gray-500 mt-1">Kurulum</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-500 mt-1">Tespit Oranı</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900">∞</div>
              <div className="text-sm text-gray-500 mt-1">Sınırsız</div>
            </div>
          </div>

        </main>
        
        {/* Footer Fade */}
        <div className="fixed bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20"></div>

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
