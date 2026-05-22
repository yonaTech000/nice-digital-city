import React from 'react';
import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-300 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4 mb-10">
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Nice Digital City</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              A premium hospitality experience showcasing luxurious rooms, event venues, dining, and seamless guest journeys.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/accommodation" className="transition hover:text-white">Accommodation</Link></li>
              <li><Link href="/conferencing" className="transition hover:text-white">Conferencing</Link></li>
              <li><Link href="/eat-and-drink" className="transition hover:text-white">Dining</Link></li>
              <li><Link href="/activities" className="transition hover:text-white">Activities</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>📞 +254 (0) 123 456 789</li>
              <li>📧 info@nicedigitalcity.com</li>
              <li>📍 Nairobi, Kenya</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="transition hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="transition hover:text-white">Terms of Service</Link></li>
              <li><Link href="#" className="transition hover:text-white">Cancellation Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Nice Digital City. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="transition hover:text-white">Facebook</a>
            <a href="#" className="transition hover:text-white">Twitter</a>
            <a href="#" className="transition hover:text-white">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
