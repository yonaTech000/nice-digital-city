'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { BookingModal } from './BookingModal';
import { formatCurrency } from '@/lib/utils';

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  serviceType: string;
  amenities?: string[];
  extraInfo?: Record<string, string>;
}

export function ServiceCard({
  id,
  name,
  description,
  price,
  image,
  serviceType,
  amenities,
  extraInfo,
}: ServiceCardProps) {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <>
      <Card className="hover:shadow-xl transition-shadow overflow-hidden h-full flex flex-col group">
        {image && (
          <div className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden relative">
            <Image
              src={image}
              alt={name}
              fill
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='224'%3E%3Crect fill='%23e5e7eb' width='400' height='224'/%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='18' font-weight='bold' fill='%23666'%3E${name}%3C/text%3E%3Ctext x='50%' y='65%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='14' fill='%23999'%3E${serviceType}%3C/text%3E%3C/svg%3E`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}

        <CardContent className="flex-1 flex flex-col">
          <CardTitle className="text-xl mt-4 text-gray-900">{name}</CardTitle>
          <CardDescription className="flex-1 text-gray-600 leading-relaxed">{description}</CardDescription>

          {amenities && amenities.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Amenities:</p>
              <ul className="grid grid-cols-2 gap-2">
                {amenities.map((amenity, idx) => (
                  <li key={idx} className="text-xs text-gray-600 flex items-center gap-1">
                    <span className="text-blue-600 font-bold">✓</span> {amenity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {extraInfo && Object.keys(extraInfo).length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
              {Object.entries(extraInfo).map(([key, value]) => (
                <p key={key} className="text-xs text-gray-600">
                  <span className="font-semibold text-gray-700">{key}:</span> {value}
                </p>
              ))}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-2xl font-bold text-blue-600 mb-4">
              {formatCurrency(price)}
            </p>
            <Button 
              onClick={() => setShowBooking(true)} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              Book Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <BookingModal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        serviceType={serviceType}
        serviceId={id}
        serviceName={name}
        price={price}
      />
    </>
  );
}
