'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useBookings, useNotifications } from '@/lib/context';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Alert';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { bookings, updateBooking } = useBookings();
  const { notifications, unreadCount, markAllRead, dismissNotification } = useNotifications();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = useMemo(() => {
    const totalBookings = bookings.length;
    const pending = bookings.filter((b) => b.status === 'PENDING').length;
    const confirmed = bookings.filter((b) => b.status === 'CONFIRMED').length;
    const cancelled = bookings.filter((b) => b.status === 'CANCELLED').length;
    const totalRevenue = bookings
      .filter((b) => b.status === 'CONFIRMED')
      .reduce((sum, b) => sum + b.totalPrice, 0);

    const bookingsByService: Record<string, number> = {};
    bookings.forEach((b) => {
      bookingsByService[b.serviceType] = (bookingsByService[b.serviceType] || 0) + 1;
    });

    return {
      totalBookings,
      pending,
      confirmed,
      cancelled,
      totalRevenue,
      bookingsByService,
    };
  }, [bookings]);

  const filteredBookings = useMemo(
    () => bookings.filter((booking) => {
      const term = search.trim().toLowerCase();
      const matchesTerm =
        booking.serviceName.toLowerCase().includes(term) ||
        booking.id.toLowerCase().includes(term);
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      return matchesTerm && matchesStatus;
    }),
    [bookings, search, statusFilter]
  );

  if (!user || user.role !== 'ADMIN') {
    router.push('/');
    return null;
  }

  const pendingBookings = bookings.filter((b) => b.status === 'PENDING');

  const handleApprove = (bookingId: string) => {
    updateBooking(bookingId, { status: 'CONFIRMED' });
  };

  const handleReject = (bookingId: string) => {
    updateBooking(bookingId, { status: 'CANCELLED' });
  };

  const handleApproveAll = () => {
    pendingBookings.forEach((booking) => updateBooking(booking.id, { status: 'CONFIRMED' }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="bg-slate-900/95 border-b border-slate-800 py-8 px-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
            <p className="mt-2 text-slate-400">Monitor bookings, manage approvals, and review guest operations in one premium console.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={() => { logout(); router.push('/'); }}>
              Logout
            </Button>
            <Button onClick={handleApproveAll} disabled={pendingBookings.length === 0}>
              Approve all pending
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            <Card>
              <CardContent>
                <div className="text-4xl font-semibold text-cyan-300">{stats.totalBookings}</div>
                <p className="text-sm text-slate-400 mt-2">Total bookings</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-4xl font-semibold text-amber-300">{stats.pending}</div>
                <p className="text-sm text-slate-400 mt-2">Pending approvals</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-4xl font-semibold text-emerald-300">{stats.confirmed}</div>
                <p className="text-sm text-slate-400 mt-2">Confirmed bookings</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-4xl font-semibold text-rose-300">{stats.cancelled}</div>
                <p className="text-sm text-slate-400 mt-2">Canceled bookings</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <div className="text-4xl font-semibold text-emerald-300">KES {(stats.totalRevenue / 1000).toFixed(1)}K</div>
                <p className="text-sm text-slate-400 mt-2">Revenue confirmed</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.4fr_0.85fr]">
            <Card>
              <CardHeader>
                <CardTitle>Booking Operations</CardTitle>
                <CardDescription>Search, filter, and manage reservations from one place.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Search bookings</label>
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search by service or booking ID"
                      className="w-full rounded-3xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
                    <select
                      value={statusFilter}
                      onChange={(event) => setStatusFilter(event.target.value)}
                      className="w-full rounded-3xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-slate-100 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                    >
                      <option value="all">All statuses</option>
                      <option value="PENDING">Pending</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="CANCELLED">Cancelled</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>{unreadCount} unread</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.length === 0 ? (
                    <p className="text-slate-400">No notifications yet — new booking activity will surface here.</p>
                  ) : (
                    notifications.slice(0, 5).map((notification) => (
                      <div key={notification.id} className="rounded-3xl border border-slate-700/80 bg-slate-900/90 p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-slate-100">{notification.title}</p>
                            <p className="mt-2 text-sm text-slate-400">{notification.message}</p>
                          </div>
                          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                            {notification.type}
                          </span>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                          <span>{formatDate(new Date(notification.createdAt))}</span>
                          <button
                            type="button"
                            className="text-cyan-300 hover:text-cyan-100"
                            onClick={() => dismissNotification(notification.id)}
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" onClick={markAllRead}>
                      Mark all read
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {pendingBookings.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
                <CardDescription>{pendingBookings.length} bookings await review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-slate-700 text-slate-500">
                      <tr>
                        <th className="py-3 px-4 text-left font-semibold">Booking</th>
                        <th className="py-3 px-4 text-left font-semibold">Service</th>
                        <th className="py-3 px-4 text-left font-semibold">Date</th>
                        <th className="py-3 px-4 text-left font-semibold">Amount</th>
                        <th className="py-3 px-4 text-left font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-slate-800 hover:bg-slate-900/70">
                          <td className="py-3 px-4">
                            <p className="font-semibold text-slate-100">{booking.id.slice(0, 8)}</p>
                            <p className="text-xs text-slate-500">{booking.userId}</p>
                          </td>
                          <td className="py-3 px-4 text-slate-100">{booking.serviceName}</td>
                          <td className="py-3 px-4 text-slate-400">{formatDate(new Date(booking.checkInDate))}</td>
                          <td className="py-3 px-4 font-semibold text-slate-100">{formatCurrency(booking.totalPrice)}</td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" onClick={() => handleApprove(booking.id)}>
                                Approve
                              </Button>
                              <Button size="sm" variant="danger" onClick={() => handleReject(booking.id)}>
                                Reject
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>Latest activity across the hotel platform.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-slate-700 text-slate-500">
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold">Service</th>
                      <th className="py-3 px-4 text-left font-semibold">Date</th>
                      <th className="py-3 px-4 text-left font-semibold">Amount</th>
                      <th className="py-3 px-4 text-left font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.slice(0, 12).map((booking) => (
                      <tr key={booking.id} className="border-b border-slate-800 hover:bg-slate-900/70">
                        <td className="py-3 px-4 text-slate-100">{booking.serviceName}</td>
                        <td className="py-3 px-4 text-slate-400">{formatDate(new Date(booking.checkInDate))}</td>
                        <td className="py-3 px-4 text-slate-100">{formatCurrency(booking.totalPrice)}</td>
                        <td className="py-3 px-4">
                          <Badge variant={booking.status.toLowerCase()}>{booking.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
