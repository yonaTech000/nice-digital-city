'use client';

import React,  { useState } from 'react';
import Image from 'next/image';
import { ServiceCard } from '@/components/booking/ServiceCard';
import { amenities } from '@/lib/mock-data';
import Input from '@/components/ui/Input';

export default function AmenitiesPage() {
  const [filteredAmenities, setFilteredAmenities] = useState(amenities);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const types = [...new Set(amenities.map((a) => a.type))];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterAmenities(value, typeFilter);
  };

  const handleTypeFilter = (value: string) => {
    setTypeFilter(value);
    filterAmenities(searchTerm, value);
  };

  const filterAmenities = (search: string, type: string) => {
    let filtered = amenities;

    if (search) {
      filtered = filtered.filter(
        (amenity) =>
          amenity.name.toLowerCase().includes(search.toLowerCase()) ||
          amenity.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (type !== 'all') {
      filtered = filtered.filter((amenity) => amenity.type === type);
    }

    setFilteredAmenities(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-28 px-4 lg:py-36">
        <div className="absolute inset-0">
          <Image src="/images/amenities/nyama.png" alt="" fill className="h-full w-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm" />
          <Image src="/foreground.png" alt="" width={384} height={384} className="absolute bottom-0 right-0 h-96 w-auto opacity-40 pointer-events-none" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-emerald-400/15 blur-3xl animate-float" />
          <div className="pointer-events-none absolute right-5 top-20 h-56 w-56 rounded-full bg-teal-500/15 blur-3xl animate-pulse-slow" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <p className="text-sm uppercase tracking-[0.4em] text-slate-300 mb-4">Live amenities & services</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Amenities & Services</h1>
          <p className="text-xl text-slate-200/80">Everything you need for a perfect stay</p>
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
                label="Search Amenities"
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select
                  value={typeFilter}
                  onChange={(e) => handleTypeFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="all">All Types</option>
                  {types.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Found <span className="font-bold">{filteredAmenities.length}</span> amenity/amenities
            </p>
          </div>

          {/* Amenities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAmenities.map((amenity) => (
              <ServiceCard
                key={amenity.id}
                id={amenity.id}
                name={amenity.name}
                description={amenity.description}
                price={amenity.price || 0}
                image={amenity.image}
                serviceType="AMENITY"
                extraInfo={{
                  Type: amenity.type,
                  Price: amenity.price ? `KES ${amenity.price}` : 'Free Access',
                }}
              />
            ))}
          </div>

          {filteredAmenities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No amenities found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
