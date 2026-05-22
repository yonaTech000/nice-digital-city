import { Room, Hall, Restaurant, Amenity, Activity } from './types';

export const rooms: Room[] = [
  {
    id: 'room-1',
    name: 'Executive Suite',
    category: 'Executive',
    description: 'Luxurious executive suite with premium amenities, panoramic city views, and personalized service.',
    price: 450,
    maxGuests: 2,
    image: '/images/rooms/super-standard.png',
    amenities: ['King Bed', 'Marble Bath', 'Sauna', 'Mini Bar', 'WiFi', 'Work Desk'],
  },
  {
    id: 'room-2',
    name: 'Super Standard Room',
    category: 'Standard',
    description: 'Comfortable standard room with modern amenities and excellent value for money.',
    price: 4250,
    maxGuests: 2,
    image: '/images/rooms/executive.png',
    amenities: ['Double Bed', 'Air Conditioning', 'WiFi', 'Flat Screen TV', 'Shower'],
  },
  {
    id: 'room-3',
    name: 'Garden View Room',
    category: 'Premium',
    description: 'Beautiful room with garden views, balcony, and premium furnishings.',
    price: 2950,
    maxGuests: 2,
    image: '/images/rooms/bedroom.png',
    amenities: ['Queen Bed', 'Garden View', 'Balcony', 'WiFi', 'Air Conditioning', 'Shower'],
  },
  {
    id: 'room-4',
    name: 'Road View Room',
    category: 'Deluxe',
    description: 'Spacious deluxe room overlooking the main road with excellent connectivity.',
    price: 3000,
    maxGuests: 2,
    image: '/nicebg.png',
    amenities: ['Twin Beds', 'City View', 'WiFi', 'Air Conditioning', 'Shower'],
  },
  {
    id: 'room-5',
    name: 'Twin Room',
    category: 'Standard',
    description: 'Perfect for business travelers or friends sharing a room.',
    price: 3280,
    maxGuests: 2,
    image: '/images/rooms/bedroom.png',
    amenities: ['Twin Beds', 'WiFi', 'Air Conditioning', 'Shower', 'Work Desk'],
  },
  {
    id: 'room-6',
    name: 'Family Room',
    category: 'Premium',
    description: 'Spacious family room with multiple beds and separate living area.',
    price: 5480,
    maxGuests: 4,
    image: '/images/rooms/bedroom.png',
    amenities: ['Multiple Beds', 'Living Area', 'Kitchen', 'WiFi', 'Air Conditioning'],
  },
];

export const halls: Hall[] = [
  {
    id: 'hall-1',
    name: 'Simba Hall',
    description: 'Large, elegant conference hall perfect for corporate events and seminars. Features state-of-the-art audio-visual equipment.',
    capacity: 500,
    price: 20000,
    image: '/simba-hall.png',
    amenities: ['Projector', 'Microphone', 'WiFi', 'Catering', 'Parking'],
  },
  {
    id: 'hall-2',
    name: 'VIP Hall',
    description: 'Premium VIP hall with luxury seating and exclusive amenities for high-end events.',
    capacity: 150,
    price: 10200,
    image: '/vip-hall.png',
    amenities: ['Premium Seating', 'VIP Lounge', 'Catering', 'WiFi', 'Parking'],
  },
  {
    id: 'hall-3',
    name: 'Nyati Hall',
    description: 'Versatile medium-sized hall suitable for meetings, seminars, and intimate gatherings.',
    capacity: 200,
    price: 15500,
    image: '/nyati-hall.png',
    amenities: ['Projector', 'WiFi', 'Catering', 'Air Conditioning', 'Parking'],
  },
];

export const restaurants: Restaurant[] = [
  {
    id: 'rest-1',
    name: 'Main Restaurant',
    description: 'Fine dining restaurant offering international and local cuisines with impeccable service.',
    cuisineType: 'International',
    price: 500,
    image: '/dining-bars.png',
    openTime: '06:30',
    closeTime: '22:00',
  },
  {
    id: 'rest-2',
    name: 'Garden Bistro',
    description: 'Casual bistro with outdoor garden seating, perfect for relaxed dining and celebrations.',
    cuisineType: 'Mediterranean',
    price: 0,
    image: '/dining-bars.png',
    openTime: '11:00',
    closeTime: '23:00',
  },
  {
    id: 'rest-3',
    name: 'Nice Xpress',
    description: 'Fast casual concept serving quick bites, coffee, and snacks throughout the day.',
    cuisineType: 'Fast Casual',
    price: 1500,
    image: '/minimart.png',
    openTime: '06:00',
    closeTime: '20:00',
  },
  {
    id: 'rest-4',
    name: 'Choma Zone',
    description: 'Authentic Kenyan BBQ restaurant with grilled meats and traditional sides.',
    cuisineType: 'Kenyan',
    price: 2500,
    image: '/images/amenities/nyama-choma.png',
    openTime: '12:00',
    closeTime: '23:00',
  },
  {
    id: 'rest-5',
    name: 'Nice Club',
    description: 'Vibrant nightclub with premium beverages, entertainment, and live music.',
    cuisineType: 'Bar & Lounge',
    price: 5000,
    image: '/dining-bars.png',
    openTime: '18:00',
    closeTime: '04:00',
  },
];

export const amenities: Amenity[] = [
  {
    id: 'amenity-1',
    name: 'MiniMart',
    type: 'Shopping',
    description: 'Convenient shopping center with souvenirs, toiletries, and essentials.',
    image: '/minimart.png',
  },
  {
    id: 'amenity-2',
    name: 'Parking',
    type: 'Parking',
    description: 'Secure parking facility with 24-hour surveillance.',
    price: 2000,
    image: '/parking.png',
  },
  {
    id: 'amenity-3',
    name: 'Service Bay',
    type: 'Service',
    description: 'Professional car service and maintenance facility.',
    price: 5000,
    image: '/service-bay.png',
  },
  {
    id: 'amenity-4',
    name: 'Gym',
    type: 'Fitness',
    description: 'Modern fitness center with equipment and trained staff.',
    price: 2000,
    image: '/spa-wellness.png',
  },
  {
    id: 'amenity-5',
    name: 'Swimming Pool',
    type: 'Recreation',
    description: 'Olympic-size swimming pool with professional lifeguards.',
    price: 1500,
    image: '/images/activities/pool.png',
  },
  {
    id: 'amenity-6',
    name: 'Fun Park',
    type: 'Entertainment',
    description: 'Outdoor recreation area with games and entertainment for all ages.',
    price: 2500,
    image: '/images/activities/funbaze.png',
  },
];

export const activities: Activity[] = [
  {
    id: 'activity-1',
    name: 'City Tour',
    description: 'Guided tour of the city with stops at major attractions and cultural sites.',
    price: 10000,
    duration: '4 hours',
    image: '/city2.png',
    maxParticipants: 30,
  },
  {
    id: 'activity-2',
    name: 'Cooking Class',
    description: 'Learn to cook traditional dishes with our expert chefs.',
    price: 2000,
    duration: '3 hours',
    image: '/cooking-class.png',
    maxParticipants: 12,
  },
  {
    id: 'activity-3',
    name: 'Spa & Wellness',
    description: 'Relaxing spa treatments and wellness therapies.',
    price: 6500,
    duration: '2 hours',
    image: '/spa-wellness.png',
    maxParticipants: 20,
  },
  {
    id: 'activity-4',
    name: 'Team Building',
    description: 'Customized team-building activities and outdoor games.',
    price: 7500,
    duration: '5 hours',
    image: '/vip-hall.png',
    maxParticipants: 50,
  },
];

// Simple in-memory bookings mock for frontend-only mode
import { Booking, User } from './types';
import { v4 as uuidv4 } from 'uuid';

export const bookings: Booking[] = [
  {
    id: 'booking-1',
    userId: 'user-1',
    serviceType: 'ROOM',
    serviceId: 'room-1',
    serviceName: 'Executive Suite',
    checkInDate: new Date().toISOString(),
    checkOutDate: undefined,
    guests: 2,
    totalPrice: 450,
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  },
];

export const users: User[] = [
  { id: 'user-1', name: 'Demo User', email: 'demo@nice.com', role: 'USER' },
  { id: 'admin-1', name: 'Admin', email: 'admin@nice.com', role: 'ADMIN' },
];

export function createBooking(data: Partial<Booking>): Booking {
  const b: Booking = {
    id: uuidv4(),
    userId: data.userId || 'user-1',
    serviceType: (data.serviceType as string) || 'ROOM',
    serviceId: data.serviceId || 'room-1',
    serviceName: data.serviceName || 'Executive Suite',
    checkInDate: data.checkInDate || new Date().toISOString(),
    checkOutDate: data.checkOutDate,
    timeSlot: data.timeSlot,
    guests: data.guests ?? 1,
    totalPrice: data.totalPrice ?? 0,
    status: (data.status as Booking['status']) || 'PENDING',
    notes: data.notes,
    createdAt: new Date().toISOString(),
  };
  bookings.unshift(b);
  return b;
}

