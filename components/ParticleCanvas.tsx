'use client'

import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
      const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 2000)
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
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  )
}
