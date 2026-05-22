import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'KES',
  }).format(amount);
}

export function getServiceTypeLabel(serviceType: string): string {
  const labels: Record<string, string> = {
    ROOM: 'Room',
    HALL: 'Conference Hall',
    RESTAURANT: 'Restaurant',
    AMENITY: 'Amenity',
    ACTIVITY: 'Activity',
    GYM: 'Gym',
    POOL: 'Swimming Pool',
    FUN_PARK: 'Fun Park',
  };
  return labels[serviceType] || serviceType;
}

export function getBookingStatusColor(status: string): string {
  const colors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    COMPLETED: 'bg-blue-100 text-blue-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
}

export function calculateDays(checkIn: Date, checkOut: Date): number {
  return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
}

export function isDateAvailable(date: Date, blockedDates: Date[]): boolean {
  return !blockedDates.some(
    (blocked) =>
      blocked.toDateString() === date.toDateString()
  );
}
