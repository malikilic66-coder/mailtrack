'use client'

import { useEffect, useState } from 'react'

export default function FloatingDots() {
  const [dots, setDots] = useState<Array<{ id: number; left: string; top: string; delay: number }>>([])

  useEffect(() => {
    const generatedDots = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: Math.random() * 20,
    }))
    setDots(generatedDots)
  }, [])

  return (
    <div className="floating-dots">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="dot"
          style={{
            left: dot.left,
            top: dot.top,
            animationDelay: `${dot.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
