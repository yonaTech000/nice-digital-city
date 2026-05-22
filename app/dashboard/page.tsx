'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useBookings } from '@/lib/context';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Alert';
import { formatCurrency } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { getUserBookings, cancelBooking } = useBookings();

  if (!user) {
    router.push('/login');
    return null;
  }

  const userBookings = getUserBookings();
  const pendingBookings = userBookings.filter((b) => b.status === 'PENDING');
  const confirmedBookings = userBookings.filter((b) => b.status === 'CONFIRMED');

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleCancel = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200 py-8 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}</h1>
            <p className="text-gray-600 mt-1">{user.email}</p>
          </div>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent>
                <div className="text-4xl font-bold text-blue-600 mb-2">{userBookings.length}</div>
                <p className="text-gray-600">Total Bookings</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="text-4xl font-bold text-yellow-600 mb-2">{pendingBookings.length}</div>
                <p className="text-gray-600">Pending Approvals</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="text-4xl font-bold text-green-600 mb-2">{confirmedBookings.length}</div>
                <p className="text-gray-600">Confirmed Bookings</p>
              </CardContent>
            </Card>
          </div>

          {/* Bookings Table */}
          <Card>
            <CardHeader>
              <CardTitle>My Bookings</CardTitle>
              <CardDescription>Manage your reservations</CardDescription>
            </CardHeader>

            <CardContent>
              {userBookings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">No bookings yet. Start exploring!</p>
                  <Link href="/accommodation">
                    <Button>Browse Services</Button>
                  </Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Service</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div>
                              <p className="font-semibold text-gray-900">{booking.serviceName}</p>
                              <p className="text-sm text-gray-500">{booking.serviceType}</p>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-600">
                            {new Date(booking.checkInDate).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 font-semibold text-gray-900">
                            {formatCurrency(booking.totalPrice)}
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant={booking.status.toLowerCase()}>
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            {booking.status !== 'CANCELLED' && (
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleCancel(booking.id)}
                              >
                                Cancel
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
