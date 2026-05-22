"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { CardContent, CardDescription, CardTitle } from '@/components/ui/Card';

export default function Home() {
  const slides = [
    '/city2.png',
    '/nicebg.png',
    '/digitalcity.png',
    '/spa-wellness.png',
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  const services = [
    {
      title: 'Rooms & Suites',
      description: 'Discover bright, modern suites with premium service and room-ready comforts.',
      href: '/accommodation',
      image: '/images/rooms/bedroom.png',
    },
    {
      title: 'Conferencing',
      description: 'Flexible halls and meeting spaces designed for business and celebrations.',
      href: '/conferencing',
      image: '/images/halls/meetroom.png',
    },
    {
      title: 'Dining & Bars',
      description: 'Local flavor, international plates, and exceptional beverage experiences.',
      href: '/eat-and-drink',
      image: '/spa-wellness.png',
    },
    {
      title: 'Amenities',
      description: 'Live well with our pool, fitness, parking and curated guest services.',
      href: '/amenities',
      image: '/images/amenities/nyama.png',
    },
    {
      title: 'Activities',
      description: 'Explore tours, wellness, and dynamic experiences for every traveler.',
      href: '/activities',
      image: '/images/activities/funbaze.png',
    },
    {
      title: 'Contact & Support',
      description: 'Fast answers, curated booking help, and personal service whenever you need it.',
      href: '/contact',
      image: '/nicemillers.png',
    },
  ];

  const stats = [
    { label: 'Rooms', value: '150+' },
    { label: 'Events Hosted', value: '2,400+' },
    { label: 'Dishes Served', value: '8,500+' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {slides.map((slide, index) => (
            <div
              key={slide}
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-[1200ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                index === activeSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              style={{ backgroundImage: `url(${slide})` }}
            />
          ))}
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" />
          <img src="/foreground.png" alt="" width={384} height={384} className="absolute bottom-0 right-0 h-96 w-auto opacity-40 pointer-events-none" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl animate-float" />
          <div className="pointer-events-none absolute right-10 top-28 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl animate-pulse-slow" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 lg:py-36">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.4em] text-slate-200 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Live hospitality, modern comfort
              </div>
              <div className="space-y-6">
                <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                  Stay inspired by a hotel experience that moves with you.
                </h1>
                <p className="max-w-2xl text-lg text-slate-200/80 sm:text-xl">
                  Nice Digital City blends smart service, premium dining, memorable events, and refreshing leisure in one living city destination.
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/accommodation">
                  <Button size="lg" className="bg-white text-slate-950 hover:bg-slate-100">
                    Reserve a Room
                  </Button>
                </Link>
                <Link href="/conferencing">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:border-white hover:bg-white/10">
                    Book an Event
                  </Button>
                </Link>
              </div>
            </div>

            <div className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_40px_120px_-60px_rgba(15,23,42,0.85)] backdrop-blur-lg">
              <div className="flex items-center justify-between text-sm uppercase tracking-[0.28em] text-slate-300">
                <span>Now trending</span>
                <span className="text-emerald-400">Live</span>
              </div>
              <div className="space-y-4">
                <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                  <p className="text-sm text-slate-300">Spa & Wellness</p>
                  <h3 className="text-xl font-semibold text-white">Refresh with premium spa rituals</h3>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                  <p className="text-sm text-slate-300">Executive Meetings</p>
                  <h3 className="text-xl font-semibold text-white">Host polished events in our halls</h3>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-5">
                  <p className="text-sm text-slate-300">Local Cuisine</p>
                  <h3 className="text-xl font-semibold text-white">Dine on dishes made to remember</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950/95 py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.4em] text-cyan-300/80">Our expertise</p>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">Services built for travel, business, and local life.</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
                <p className="text-4xl font-semibold text-white">{stat.value}</p>
                <p className="mt-3 text-sm uppercase tracking-[0.22em] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Explore</p>
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Every part of your stay is connected.</h2>
            </div>
            <Link href="/contact" className="text-sm font-semibold text-cyan-300 transition hover:text-cyan-100">
              Talk to our booking team →
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <Link key={service.title} href={service.href} className="group block overflow-hidden rounded-[32px] border border-white/10 bg-slate-950/80 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-slate-900/90">
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/10 to-transparent" />
                </div>
                <CardContent className="p-6">
                  <CardTitle className="text-2xl font-semibold text-white">{service.title}</CardTitle>
                  <CardDescription className="mt-3 text-sm leading-relaxed text-slate-300">{service.description}</CardDescription>
                  <div className="mt-6 inline-flex items-center gap-2 text-cyan-300 group-hover:text-cyan-100 transition">
                    <span>Explore</span>
                    <span>→</span>
                  </div>
                </CardContent>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950/95 py-16 px-4">
        <div className="mx-auto max-w-7xl rounded-[40px] border border-white/10 bg-white/5 p-10 shadow-[0_40px_120px_-70px_rgba(15,23,42,0.9)] backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Live background</p>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">A design approach that feels active and premium.</h2>
              <p className="mt-6 max-w-2xl text-slate-300 sm:text-lg">
                We keep every page focused and intuitive, with clear redirection to rooms, halls, dining, amenities, activities, and contact. This homepage is the welcome gateway for business, leisure, and memorable guest journeys.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/amenities">
                  <Button size="lg" className="bg-cyan-400 text-slate-950 hover:bg-cyan-300">
                    Browse Amenities
                  </Button>
                </Link>
                <Link href="/activities">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:border-cyan-300 hover:bg-white/5">
                    See Activities
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 text-white shadow-lg shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Smooth flow</p>
                <p className="mt-4 text-lg font-semibold">Navigation to every service is precise and purposeful.</p>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-slate-950/90 p-6 text-white shadow-lg shadow-slate-950/20">
                <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Live messaging</p>
                <p className="mt-4 text-lg font-semibold">Animated hero text and layered imagery create momentum on first view.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
