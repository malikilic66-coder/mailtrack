'use client'

import { useEffect, useRef } from 'react'

export default function FlockingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W: number, H: number
    let particles: Particle[] = []
    let animationId: number

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', resize)

    // Ayarlar
    const settings = {
      count: 400,          // Parçacık sayısı
      maxSpeed: 1.5,       // Maksimum hız
      size: 3,             // Piksel boyutu

      // Flocking (Sürü) Kuralları Mesafeleri
      neighDist: 60,       // Komşu görme mesafesi
      sepDist: 20,         // Çarpışma önleme mesafesi

      // Davranış Ağırlıkları (Kuvvetler)
      separationForce: 0.8, // Birbirinden ayrılma gücü
      alignmentForce: 0.4,  // Hizalanma gücü
      cohesionForce: 0.2,   // Birleşme gücü

      // Meksika Dalgası Ayarları
      waveSpeed: 7,         // Dalganın geçiş hızı
      waveWidth: 300,       // Dalganın genişliği
      waveHeight: 120       // Dalganın pikselleri ne kadar "iteceği"
    }

    let mouse = { x: -9999, y: -9999 }
    const handleMouseMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      alpha: number

      constructor() {
        this.x = Math.random() * W
        this.y = Math.random() * H
        this.vx = (Math.random() - 0.5) * settings.maxSpeed
        this.vy = (Math.random() - 0.5) * settings.maxSpeed
        this.alpha = Math.random() * 0.4 + 0.2
      }

      update(time: number) {
        let neighbors: Particle[] = []
        let ax = 0, ay = 0

        // 1. BOIDS MANTIĞI
        for (let p of particles) {
          if (p === this) continue

          let dx = p.x - this.x
          let dy = p.y - this.y
          let d = Math.hypot(dx, dy)

          if (d < settings.neighDist) {
            neighbors.push(p)
          }

          if (d < settings.sepDist) {
            ax -= (dx / d) * settings.separationForce
            ay -= (dy / d) * settings.separationForce
          }
        }

        if (neighbors.length > 0) {
          let avgVX = 0, avgVY = 0
          let avgX = 0, avgY = 0

          neighbors.forEach(n => {
            avgVX += n.vx
            avgVY += n.vy
            avgX += n.x
            avgY += n.y
          })

          avgVX /= neighbors.length
          avgVY /= neighbors.length
          avgX /= neighbors.length
          avgY /= neighbors.length

          ax += (avgVX - this.vx) * settings.alignmentForce
          ay += (avgVY - this.vy) * settings.alignmentForce

          ax += (avgX - this.x) * settings.cohesionForce * 0.01
          ay += (avgY - this.y) * settings.cohesionForce * 0.01
        }

        // 2. MEKSİKA DALGASI EFEKTİ
        const waveX = (time * settings.waveSpeed) % (W + 600) - 300
        const distToWave = Math.abs(this.x - waveX)

        if (distToWave < settings.waveWidth) {
          const normalizedDist = distToWave / settings.waveWidth
          const waveIntensity = Math.cos(normalizedDist * Math.PI / 2)

          ay -= waveIntensity * settings.waveHeight * 0.05
          this.alpha = 0.4 + (waveIntensity * 0.6)
        } else {
          this.alpha += (0.2 - this.alpha) * 0.05
        }

        // 3. FİZİK MOTORU
        this.vx += ax * 0.05
        this.vy += ay * 0.05

        const speed = Math.hypot(this.vx, this.vy)
        if (speed > settings.maxSpeed) {
          this.vx = (this.vx / speed) * settings.maxSpeed
          this.vy = (this.vy / speed) * settings.maxSpeed
        }

        this.x += this.vx
        this.y += this.vy

        // 4. MOUSE KAÇIŞI
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const distMouse = Math.hypot(dx, dy)
        if (distMouse < 150) {
          const force = (150 - distMouse) / 150
          this.x += (dx / distMouse) * force * 5
          this.y += (dy / distMouse) * force * 5
        }

        // 5. EKRAN SINIRLARI
        if (this.x < -50) this.x = W + 50
        if (this.x > W + 50) this.x = -50
        if (this.y < -50) this.y = H + 50
        if (this.y > H + 50) this.y = -50
      }

      draw() {
        ctx.fillStyle = `rgba(100, 120, 160, ${Math.max(0, Math.min(1, this.alpha))})`
        ctx.fillRect(this.x, this.y, settings.size, settings.size)
      }
    }

    function init() {
      resize()
      particles = []
      for (let i = 0; i < settings.count; i++) {
        particles.push(new Particle())
      }
    }

    init()

    let time = 0
    function animate() {
      ctx.clearRect(0, 0, W, H)

      particles.forEach(p => {
        p.update(time)
        p.draw()
      })

      time++
      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
