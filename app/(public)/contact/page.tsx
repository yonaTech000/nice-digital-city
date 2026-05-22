'use client';

import React,  { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      messages.push({
        id: `msg-${Date.now()}`,
        ...formData,
        status: 'new',
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('contactMessages', JSON.stringify(messages));
      
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setLoading(false);

      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-28 px-4 lg:py-36">
        <div className="absolute inset-0">
          <Image src="/contactus.png" alt="Contact hero image" fill className="h-full w-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm" />
          <Image src="/foreground.png" alt="Luxury overlay" width={384} height={384} className="absolute bottom-0 right-0 h-96 w-auto opacity-40 pointer-events-none" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-pink-400/15 blur-3xl animate-float" />
          <div className="pointer-events-none absolute right-10 top-28 h-64 w-64 rounded-full bg-rose-500/20 blur-3xl animate-pulse-slow" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.4em] text-slate-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-pink-400 animate-pulse" />
              Get connected with us
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Get In Touch
              </h1>
              <p className="max-w-2xl text-lg text-slate-200/80 sm:text-xl">
                We&apos;d love to hear from you. Fast answers, curated booking help, and personal service whenever you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-2">📍 Location</h3>
                    <p className="text-gray-600">Nice Digital City<br />Nairobi, Kenya</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-2">📞 Phone</h3>
                    <p className="text-gray-600">+254 (0) 123 456 789<br />+254 (0) 700 000 000</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-2">📧 Email</h3>
                    <p className="text-gray-600">info@nicedigitalcity.com<br />bookings@nicedigitalcity.com</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent>
                    <h3 className="text-lg font-semibold mb-2">🕒 Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 4:00 PM<br />Sunday: Closed</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardContent>
                  {submitted && (
                    <Alert variant="success" className="mb-6">
                      Thank you! We&apos;ve received your message and will get back to you soon.
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      label="Full Name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />

                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />

                    <Input
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                    />

                    <Input
                      label="Subject"
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      required
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us more..."
                        required
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>

                    <Button type="submit" disabled={loading} className="w-full">
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
