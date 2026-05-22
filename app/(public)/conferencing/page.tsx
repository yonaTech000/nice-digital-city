'use client';

import React,  { useState } from 'react';
import Image from 'next/image';
import { ServiceCard } from '@/components/booking/ServiceCard';
import { halls } from '@/lib/mock-data';
import Input from '@/components/ui/Input';

export default function ConferencingPage() {
  const [filteredHalls, setFilteredHalls] = useState(halls);
  const [searchTerm, setSearchTerm] = useState('');
  const [capacityFilter, setCapacityFilter] = useState<string>('all');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterHalls(value, capacityFilter);
  };

  const handleCapacityFilter = (value: string) => {
    setCapacityFilter(value);
    filterHalls(searchTerm, value);
  };

  const filterHalls = (search: string, capacity: string) => {
    let filtered = halls;

    if (search) {
      filtered = filtered.filter(
        (hall) =>
          hall.name.toLowerCase().includes(search.toLowerCase()) ||
          hall.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (capacity !== 'all') {
      const [min, max] = capacity.split('-').map(Number);
      filtered = filtered.filter(
        (hall) => hall.capacity >= min && hall.capacity <= max
      );
    }

    setFilteredHalls(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-28 px-4 lg:py-36">
        <div className="absolute inset-0">
          <Image src="/images/halls/meetroom.png" alt="" fill className="h-full w-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm" />
          <Image src="/foreground.png" alt="" width={384} height={384} className="absolute bottom-0 right-0 h-96 w-auto opacity-40 pointer-events-none" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-purple-400/15 blur-3xl animate-float" />
          <div className="pointer-events-none absolute right-10 top-28 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl animate-pulse-slow" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.4em] text-slate-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
              Professional conferencing
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Conference Halls
              </h1>
              <p className="max-w-2xl text-lg text-slate-200/80 sm:text-xl">
                Flexible halls and meeting spaces designed for business, celebrations, and memorable events.
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
                label="Search Halls"
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
                <select
                  value={capacityFilter}
                  onChange={(e) => handleCapacityFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="all">Any Capacity</option>
                  <option value="0-100">Up to 100 people</option>
                  <option value="100-200">100 - 200 people</option>
                  <option value="200-500">200 - 500 people</option>
                  <option value="500-1000">500+ people</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Found <span className="font-bold">{filteredHalls.length}</span> hall(s)
            </p>
          </div>

          {/* Halls Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHalls.map((hall) => (
              <ServiceCard
                key={hall.id}
                id={hall.id}
                name={hall.name}
                description={hall.description}
                price={hall.price}
                image={hall.image}
                serviceType="HALL"
                amenities={hall.amenities}
                extraInfo={{
                  Capacity: `${hall.capacity} people`,
                  'Price per Hour': `KES ${hall.price}`,
                }}
              />
            ))}
          </div>

          {filteredHalls.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No halls found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
