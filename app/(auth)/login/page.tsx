'use client';

import React,  { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { useAuth } from '@/lib/context';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: 'user@example.com',
    password: 'password123',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      login(formData.email, formData.password);
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Login failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-12">
      <Card className="max-w-md w-full border-slate-700/80 bg-slate-900/95 shadow-2xl shadow-slate-950/40">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Image src="/nicelogo.png" alt="Nice Digital City" width={64} height={64} className="h-16 w-16 rounded-3xl object-contain" />
          </div>
          <CardTitle className="text-center text-2xl">Welcome Back</CardTitle>
          <CardDescription className="text-center text-slate-400">Sign in to manage your bookings and experience.</CardDescription>
        </CardHeader>

        <CardContent>
          {error && <Alert variant="error" className="mb-4">{error}</Alert>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="user@example.com"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center text-slate-400">
            <p className="text-sm mb-4">Don&apos;t have an account yet?</p>
            <Link href="/register">
              <Button variant="outline" className="w-full">
                Create Account
              </Button>
            </Link>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-700/70 bg-slate-900/90 p-4 text-sm text-slate-300">
            <p className="font-semibold text-slate-100 mb-2">Demo credentials</p>
            <p className="leading-relaxed">User: user@example.com / password123</p>
            <p className="leading-relaxed">Admin: admin@example.com / admin123</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
