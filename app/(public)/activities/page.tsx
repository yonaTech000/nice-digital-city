'use client';

import React,  { useState } from 'react';
import Image from 'next/image';
import { ServiceCard } from '@/components/booking/ServiceCard';
import { activities } from '@/lib/mock-data';
import Input from '@/components/ui/Input';

export default function ActivitiesPage() {
  const [filteredActivities, setFilteredActivities] = useState(activities);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<string>('all');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterActivities(value, priceFilter);
  };

  const handlePriceFilter = (value: string) => {
    setPriceFilter(value);
    filterActivities(searchTerm, value);
  };

  const filterActivities = (search: string, price: string) => {
    let filtered = activities;

    if (search) {
      filtered = filtered.filter(
        (activity) =>
          activity.name.toLowerCase().includes(search.toLowerCase()) ||
          activity.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (price !== 'all') {
      const [min, max] = price.split('-').map(Number);
      filtered = filtered.filter((activity) => activity.price >= min && activity.price <= max);
    }

    setFilteredActivities(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-28 px-4 lg:py-36">
        <div className="absolute inset-0">
          <Image src="/images/activities/funbaze.png" alt="" fill className="h-full w-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm" />
          <Image src="/foreground.png" alt="" width={384} height={384} className="absolute bottom-0 right-0 h-96 w-auto opacity-40 pointer-events-none" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-yellow-400/15 blur-3xl animate-float" />
          <div className="pointer-events-none absolute right-10 top-28 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl animate-pulse-slow" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.4em] text-slate-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
              Experiences & entertainment
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Activities & Tours
              </h1>
              <p className="max-w-2xl text-lg text-slate-200/80 sm:text-xl">
                Explore guided tours, wellness experiences, and dynamic activities designed for every traveler.
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
              <div className="space-y-4">
                <div className="rounded-3xl border border-slate-700/80 bg-slate-950/95 p-4">
                  <p className="text-xs uppercase tracking-[0.5em] text-cyan-300">Search Activities</p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    Find your next adventure
                  </h3>
                </div>
                <Input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <select
                  value={priceFilter}
                  onChange={(e) => handlePriceFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Prices</option>
                  <option value="0-100">Under KES 100</option>
                  <option value="100-200">KES 100 - 200</option>
                  <option value="200-300">KES 200 - 300</option>
                  <option value="300-1000">KES 300+</option>
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Found <span className="font-bold">{filteredActivities.length}</span> activity/activities
            </p>
          </div>

          {/* Activities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((activity) => (
              <ServiceCard
                key={activity.id}
                id={activity.id}
                name={activity.name}
                description={activity.description}
                price={activity.price}
                image={activity.image}
                serviceType="ACTIVITY"
                extraInfo={{
                  Duration: activity.duration,
                  'Max Participants': activity.maxParticipants?.toString() || 'Unlimited',
                  Price: `KES ${activity.price}`,
                }}
              />
            ))}
          </div>

          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No activities found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
