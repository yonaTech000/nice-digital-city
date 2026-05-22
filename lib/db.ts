/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment */
// Lightweight DB facade: tries to use Prisma client if available,
// otherwise falls back to an in-memory mock DB (frontend-only mode).
import {
  rooms,
  halls,
  restaurants,
  amenities,
  activities,
  bookings,
  users,
  createBooking,
} from './mock-data';

type AnyModel = Record<string, unknown>;

let prismaClient: unknown = null;

async function getPrisma() {
  if (prismaClient) return prismaClient as unknown;
  try {
    const mod = await import('@prisma/client');
    const { PrismaClient } = mod as { PrismaClient: new (...args: any[]) => unknown };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    prismaClient = new PrismaClient({ log: ['query'] } as any);
    return prismaClient as unknown;
  } catch {
    // Prisma not available/generated — stay in mock mode
    return null;
  }
}

function createModelFromArray(array: unknown[], name?: string): AnyModel {
  return {
    findMany: async (_opts?: unknown) => {
      return array;
    },
    findUnique: async (opts?: { where?: Record<string, unknown> }) => {
      if (!opts || !opts.where) return null;
      const key = Object.keys(opts.where)[0];
      const val = opts.where[key];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return (array as any[]).find((r) => r[key] === val) || null;
    },
    create: async (opts?: { data?: Record<string, unknown> }) => {
      if (name === 'booking') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const created = createBooking((opts as any).data);
        return created;
      }
      const item = { id: (opts?.data as any)?.id || `${name || 'item'}-${Date.now()}`, ...(opts?.data || {}) };
      (array as any[]).unshift(item);
      return item;
    },
    update: async (opts?: { where?: Record<string, unknown>; data?: Record<string, unknown> }) => {
      const key = Object.keys(opts?.where || {})[0];
      const val = opts?.where?.[key];
      const idx = (array as any[]).findIndex((r) => r[key] === val);
      if (idx === -1) return null;
      (array as any[])[idx] = { ...(array as any[])[idx], ...(opts?.data || {}) };
      return (array as any[])[idx];
    },
    count: async (opts?: { where?: Record<string, unknown> }) => {
      if (!opts || !opts.where) return array.length;
      const where = opts.where;
      return (array as any[]).filter((r) => {
        return Object.entries(where).every(([k, v]) => r[k] === v);
      }).length;
    },
    aggregate: async (opts?: { where?: Record<string, unknown>; _sum?: { totalPrice?: boolean } }) => {
      // support simple _sum of totalPrice
      if (opts && opts._sum && opts._sum.totalPrice) {
        const filtered = opts.where ? (array as any[]).filter((r) => Object.entries(opts.where!).every(([k, v]) => r[k] === v)) : array;
        const sum = (filtered as any[]).reduce((s, it) => s + (it.totalPrice || 0), 0);
        return { _sum: { totalPrice: sum } };
      }
      return {};
    },
    groupBy: async (opts?: { by?: string[] }) => {
      // support grouping by one field with _count
      const by = opts?.by && opts.by[0];
      const map: Record<string, number> = {};
      for (const it of array as any[]) {
        const key = it[by] || 'unknown';
        map[key] = (map[key] || 0) + 1;
      }
      return Object.entries(map).map(([k, v]) => ({ [by as string]: k, _count: { id: v } }));
    },
  };
}

export const db: any = {
  // Prisma-compatible models backed by mock arrays
  user: createModelFromArray(users, 'user'),
  room: createModelFromArray(rooms, 'room'),
  hall: createModelFromArray(halls, 'hall'),
  restaurant: createModelFromArray(restaurants, 'restaurant'),
  amenity: createModelFromArray(amenities, 'amenity'),
  activity: createModelFromArray(activities, 'activity'),
  event: createModelFromArray([], 'event'),
  gymPackage: createModelFromArray([], 'gymPackage'),
  booking: createModelFromArray(bookings, 'booking'),
};

// Attempt to wire real Prisma client if available — replace methods with actual client
getPrisma().then((p) => {
  if (!p) return;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  prismaClient = p;
  // map prisma models if available
  try {
    db.user = (prismaClient as any).user;
    db.room = (prismaClient as any).room;
    db.hall = (prismaClient as any).hall;
    db.restaurant = (prismaClient as any).restaurant;
    db.amenity = (prismaClient as any).amenity;
    db.activity = (prismaClient as any).activity;
    db.event = (prismaClient as any).event;
    db.gymPackage = (prismaClient as any).gymPackage;
    db.booking = (prismaClient as any).booking;
  } catch {
    // ignore
  }
});
