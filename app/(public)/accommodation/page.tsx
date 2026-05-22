'use client';

import React,  { useState } from 'react';
import Image from 'next/image';
import { ServiceCard } from '@/components/booking/ServiceCard';
import { rooms } from '@/lib/mock-data';
import Input from '@/components/ui/Input';

export default function AccommodationPage() {
  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<string>('all');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterRooms(value, priceFilter);
  };

  const handlePriceFilter = (value: string) => {
    setPriceFilter(value);
    filterRooms(searchTerm, value);
  };

  const filterRooms = (search: string, price: string) => {
    let filtered = rooms;

    if (search) {
      filtered = filtered.filter(
        (room) =>
          room.name.toLowerCase().includes(search.toLowerCase()) ||
          room.category.toLowerCase().includes(search.toLowerCase()) ||
          room.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (price !== 'all') {
      const [min, max] = price.split('-').map(Number);
      filtered = filtered.filter((room) => room.price >= min && room.price <= max);
    }

    setFilteredRooms(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-28 px-4 lg:py-36">
        <div className="absolute inset-0">
          <Image src="/images/rooms/bedroom.png" alt="" fill className="h-full w-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm" />
          <Image src="/foreground.png" alt="" width={384} height={384} className="absolute bottom-0 right-0 h-96 w-auto opacity-40 pointer-events-none" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl animate-float" />
          <div className="pointer-events-none absolute right-10 top-28 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl animate-pulse-slow" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.4em] text-slate-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              Premium accommodations
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Our Rooms & Suites
              </h1>
              <p className="max-w-2xl text-lg text-slate-200/80 sm:text-xl">
                Discover bright, modern suites with premium service and room-ready comforts for an unforgettable stay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Search & Filter</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Search Rooms"
                type="text"
                placeholder="Search by name or category..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={priceFilter}
                  onChange={(e) => handlePriceFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Prices</option>
                  <option value="0-150">Under KES 150</option>
                  <option value="150-300">KES 150 - 300</option>
                  <option value="300-450">KES 300 - 450</option>
                  <option value="450-1000">KES 450+</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Found <span className="font-bold">{filteredRooms.length}</span> room(s)
            </p>
          </div>

          {/* Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <ServiceCard
                key={room.id}
                id={room.id}
                name={room.name}
                description={room.description}
                price={room.price}
                image={room.image}
                serviceType="ROOM"
                amenities={room.amenities}
                extraInfo={{
                  Category: room.category,
                  'Max Guests': room.maxGuests.toString(),
                  'Price per Night': `KES ${room.price}`,
                }}
              />
            ))}
          </div>

          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No rooms found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
