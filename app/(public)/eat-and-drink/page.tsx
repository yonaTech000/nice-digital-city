'use client';

import React,  { useState } from 'react';
import Image from 'next/image';
import { ServiceCard } from '@/components/booking/ServiceCard';
import { restaurants } from '@/lib/mock-data';
import Input from '@/components/ui/Input';

export default function EatAndDrinkPage() {
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState<string>('all');

  const cuisines = [...new Set(restaurants.map((r) => r.cuisineType))];

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterRestaurants(value, cuisineFilter);
  };

  const handleCuisineFilter = (value: string) => {
    setCuisineFilter(value);
    filterRestaurants(searchTerm, value);
  };

  const filterRestaurants = (search: string, cuisine: string) => {
    let filtered = restaurants;

    if (search) {
      filtered = filtered.filter(
        (rest) =>
          rest.name.toLowerCase().includes(search.toLowerCase()) ||
          rest.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (cuisine !== 'all') {
      filtered = filtered.filter((rest) => rest.cuisineType === cuisine);
    }

    setFilteredRestaurants(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-28 px-4 lg:py-36">
        <div className="absolute inset-0">
          <Image src="/dining-bars.png" alt="" fill className="h-full w-full object-cover" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm" />
          <Image src="/foreground.png" alt="" width={384} height={384} className="absolute bottom-0 right-0 h-96 w-auto opacity-40 pointer-events-none" onError={(e) => e.currentTarget.style.display = 'none'} />
          <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-orange-400/15 blur-3xl animate-float" />
          <div className="pointer-events-none absolute right-10 top-28 h-64 w-64 rounded-full bg-red-500/20 blur-3xl animate-pulse-slow" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm uppercase tracking-[0.4em] text-slate-200 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
              Culinary excellence
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Dining & Beverages
              </h1>
              <p className="max-w-2xl text-lg text-slate-200/80 sm:text-xl">
                Local flavor, international plates, and exceptional beverage experiences crafted for every palate.
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
                label="Search Restaurants"
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
                <select
                  value={cuisineFilter}
                  onChange={(e) => handleCuisineFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="all">All Cuisines</option>
                  {cuisines.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              Found <span className="font-bold">{filteredRestaurants.length}</span> restaurant(s)
            </p>
          </div>

          {/* Restaurants Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant) => (
              <ServiceCard
                key={restaurant.id}
                id={restaurant.id}
                name={restaurant.name}
                description={restaurant.description}
                price={restaurant.price}
                image={restaurant.image}
                serviceType="RESTAURANT"
                extraInfo={{
                  Cuisine: restaurant.cuisineType,
                  Hours: `${restaurant.openTime} - ${restaurant.closeTime}`,
                  'Price per Person': `KES ${restaurant.price}`,
                }}
              />
            ))}
          </div>

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No restaurants found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
