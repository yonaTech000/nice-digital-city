'use client';

import React from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/Card';

export default function AboutPage() {
  const values = [
    {
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service',
      icon: '✨',
    },
    {
      title: 'Customer Focus',
      description: 'Your satisfaction is our top priority',
      icon: '👥',
    },
    {
      title: 'Innovation',
      description: 'We embrace technology and modern hospitality trends',
      icon: '💡',
    },
    {
      title: 'Integrity',
      description: 'We conduct business with honesty and transparency',
      icon: '🤝',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Nice Digital City</h1>
          <p className="text-xl text-blue-100">Redefining Hospitality Excellence</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Our Story */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Nice Digital City is a premier hospitality destination that combines luxury accommodations,
              world-class dining, professional conferencing spaces, and entertainment facilities. Founded
              with the vision to provide an integrated hospitality experience, we have become a leading
              choice for business travelers, tourists, and event organizers.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our commitment to excellence, innovation, and customer satisfaction has made us a trusted
              name in the hospitality industry. From our comfortable rooms to our fine dining restaurants,
              we ensure every guest experience is memorable.
            </p>
          </div>

          {/* Our Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-2 border-blue-200">
              <CardContent>
                <div className="text-4xl mb-4">🎯</div>
                <CardTitle>Our Mission</CardTitle>
                <p className="text-gray-600 mt-4">
                  To provide exceptional hospitality services that exceed expectations, creating
                  memorable experiences for every guest through our commitment to quality, innovation,
                  and personalized service.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-indigo-200">
              <CardContent>
                <div className="text-4xl mb-4">🚀</div>
                <CardTitle>Our Vision</CardTitle>
                <p className="text-gray-600 mt-4">
                  To be the most trusted and preferred hospitality destination in Kenya, known for our
                  world-class facilities, exceptional service, and innovative approach to guest
                  satisfaction.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Our Values */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, idx) => (
                <Card key={idx}>
                  <CardContent>
                    <div className="text-4xl mb-3">{value.icon}</div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                    <p className="text-gray-600 text-sm mt-2">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Choose Us */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { icon: '🏨', title: 'Luxury Accommodations', desc: 'Premium rooms with modern amenities' },
                { icon: '🍽️', title: 'Fine Dining', desc: 'International and local cuisine excellence' },
                { icon: '🏢', title: 'Conference Facilities', desc: 'State-of-the-art meeting spaces' },
                { icon: '💪', title: 'Complete Amenities', desc: 'Gym, pool, and recreation facilities' },
                { icon: '🎉', title: 'Event Services', desc: 'Dedicated event planning team' },
                { icon: '🤖', title: 'Digital Experience', desc: 'Easy online booking and management' },
              ].map((item, idx) => (
                <Card key={idx}>
                  <CardContent>
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    <p className="text-gray-600 mt-2">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
