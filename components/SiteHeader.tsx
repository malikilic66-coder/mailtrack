'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { label: 'Özellikler', href: '/features' },
  { label: 'Fiyatlandırma', href: '/pricing' },
  { label: 'Rehber', href: '/guide' },
  { label: 'İletişim', href: '/contact' },
]

export default function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isActive = (href: string) => pathname === href

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/70 border-b border-white/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center text-white font-semibold tracking-tight">
            M
          </div>
          <div className="text-lg font-semibold tracking-tight text-slate-900">
            MailSight
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${isActive(link.href) ? 'text-slate-900' : 'hover:text-slate-900'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Giriş
          </Link>
          <Link
            href="/auth/register"
            className="text-sm font-semibold text-white bg-slate-900 px-4 py-2 rounded-full shadow-[0_12px_30px_rgba(15,23,42,0.18)] hover:bg-black transition-all"
          >
            Ücretsiz Başla
          </Link>
        </div>

        <button
          className="md:hidden w-10 h-10 flex items-center justify-center text-slate-700"
          onClick={() => setOpen(!open)}
          aria-label="Menüyü Aç"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/40 bg-white/90 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium ${isActive(link.href) ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="h-px bg-slate-100" />
            <Link
              href="/auth/login"
              className="text-base font-medium text-slate-600"
              onClick={() => setOpen(false)}
            >
              Giriş
            </Link>
            <Link
              href="/auth/register"
              className="text-base font-semibold text-white bg-slate-900 px-4 py-3 rounded-2xl text-center"
              onClick={() => setOpen(false)}
            >
              Ücretsiz Başla
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
