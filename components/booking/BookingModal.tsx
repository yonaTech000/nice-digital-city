'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { useAuth, useBookings, useNotifications } from '@/lib/context';
import { Alert } from '@/components/ui/Alert';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: string;
  serviceId: string;
  serviceName: string;
  price: number;
}

export function BookingModal({
  isOpen,
  onClose,
  serviceType,
  serviceId,
  serviceName,
  price,
}: BookingModalProps) {
  const { user } = useAuth();
  const { addBooking } = useBookings();
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    checkInDate: '',
    checkOutDate: '',
    date: '',
    time: '',
    guests: '1',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const guestsCount = Math.max(1, parseInt(formData.guests, 10) || 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (!user) {
        setError('You must be logged in to book');
        setLoading(false);
        return;
      }

      const booking = {
        id: `booking-${Date.now()}`,
        userId: user.id,
        serviceType,
        serviceId,
        serviceName,
        checkInDate: formData.checkInDate || formData.date,
        checkOutDate: formData.checkOutDate,
        timeSlot: formData.time,
        guests: guestsCount,
        totalPrice: price * guestsCount,
        status: 'PENDING' as const,
        notes: formData.notes,
        createdAt: new Date().toISOString(),
      };

      addBooking(booking);
      addNotification({
        title: 'New booking request',
        message: `${serviceName} booking request created and pending approval.`,
        type: 'success',
      });
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setFormData({ checkInDate: '', checkOutDate: '', date: '', time: '', guests: '1', notes: '' });
        setSuccess(false);
      }, 1400);
    } catch {
      setError('Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Book ${serviceName}`} size="lg">
      {!user ? (
        <Alert variant="error">Please login to make a booking</Alert>
      ) : success ? (
        <Alert variant="success">Booking created successfully! Check your dashboard.</Alert>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <Alert variant="error">{error}</Alert>}

          {['ROOM', 'HALL'].includes(serviceType) && (
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Check-in Date"
                type="date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                required
              />
              {serviceType === 'ROOM' && (
                <Input
                  label="Check-out Date"
                  type="date"
                  name="checkOutDate"
                  value={formData.checkOutDate}
                  onChange={handleChange}
                  required
                />
              )}
            </div>
          )}

          {['RESTAURANT', 'ACTIVITY', 'AMENITY'].includes(serviceType) && (
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Date"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
              <Input
                label="Time"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <Select
              label="Number of Guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              options={[
                { value: '1', label: '1 Guest' },
                { value: '2', label: '2 Guests' },
                { value: '3', label: '3 Guests' },
                { value: '4', label: '4 Guests' },
                { value: '5', label: '5+ Guests' },
              ]}
            />
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special requests?"
                className="min-h-[136px] w-full rounded-3xl border border-slate-700/80 bg-slate-900/90 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-700/80 bg-slate-900/90 p-4 text-slate-100">
            <p className="text-sm text-slate-400">Price per unit: KES {price.toLocaleString()}</p>
            <p className="mt-2 text-xl font-semibold text-white">
              Total: KES {(price * guestsCount).toLocaleString()}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Processing...' : 'Confirm Booking'}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
