export interface Room {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  maxGuests: number;
  image: string;
  amenities: string[];
}

export interface Hall {
  id: string;
  name: string;
  description: string;
  capacity: number;
  price: number;
  image: string;
  amenities: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisineType: string;
  price: number;
  image: string;
  openTime: string;
  closeTime: string;
}

export interface Amenity {
  id: string;
  name: string;
  type: string;
  description: string;
  price?: number;
  image: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  maxParticipants?: number;
}

export interface Booking {
  id: string;
  userId: string;
  serviceType: string;
  serviceId: string;
  serviceName: string;
  checkInDate: string;
  checkOutDate?: string;
  timeSlot?: string;
  guests: number;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'USER' | 'ADMIN';
}
