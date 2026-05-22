'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useAuth, useTheme } from '@/lib/context';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/accommodation', label: 'Rooms' },
    { href: '/conferencing', label: 'Halls' },
    { href: '/eat-and-drink', label: 'Dining' },
    { href: '/amenities', label: 'Amenities' },
    { href: '/activities', label: 'Activities' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleNavigate = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/70 bg-slate-950/95 backdrop-blur-xl shadow-sm shadow-slate-950">
      <div className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 text-white transition hover:opacity-90">
            <Image
              src="/nicelogo.png"
              alt="Nice Digital City Logo"
              width={44}
              height={44}
              className="h-11 w-auto rounded-2xl object-contain border border-white/10 bg-white/5"
              onError={(e) => {
                e.currentTarget.src = '/dcity.png';
              }}
            />
            <span className="hidden sm:inline text-lg font-semibold tracking-wide text-slate-100">Nice Digital City</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavigate}
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  pathname === link.href
                    ? 'text-cyan-300'
                    : 'text-slate-300 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-900/80 text-slate-200 transition hover:bg-slate-800"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link href={user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'}>
                    <Button variant="outline" size="sm" className="border-slate-700 text-slate-100 hover:border-cyan-300 hover:text-white">
                      {user.role === 'ADMIN' ? 'Admin' : 'Dashboard'}
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="border-slate-700 text-slate-100 hover:border-cyan-300 hover:text-white">
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">Register</Button>
                  </Link>
                </>
              )}
            </div>

            <button
              type="button"
              aria-label="Open mobile menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-900/80 text-slate-200 transition hover:bg-slate-800 md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="mt-3 flex flex-col gap-2 rounded-3xl border border-slate-700/70 bg-slate-950/95 p-4 shadow-xl shadow-slate-950/30 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavigate}
                className={cn(
                  'rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-slate-900 text-cyan-300'
                    : 'text-slate-300 hover:bg-slate-900/70 hover:text-white'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              {user ? (
                <>
                  <Link href={user.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'}>
                    <Button variant="outline" size="sm" className="w-full border-slate-700 text-slate-100 hover:border-cyan-300 hover:text-white">
                      {user.role === 'ADMIN' ? 'Admin' : 'Dashboard'}
                    </Button>
                  </Link>
                  <Button variant="secondary" size="sm" className="w-full" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="outline" size="sm" className="w-full border-slate-700 text-slate-100 hover:border-cyan-300 hover:text-white" onClick={handleNavigate}>
                      Login
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm" className="w-full" onClick={handleNavigate}>
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
