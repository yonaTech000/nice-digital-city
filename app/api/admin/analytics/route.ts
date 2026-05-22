import { db } from '@/lib/db';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Middleware to check admin role
async function checkAdmin(request: Request) {
  const token = getTokenFromRequest(request);
  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);
  if (!decoded || decoded.role !== 'ADMIN') {
    return null;
  }

  return decoded;
}

// GET analytics
export async function GET(request: Request) {
  try {
    const admin = await checkAdmin(request);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get booking statistics
    const totalBookings = await db.booking.count();
    const pendingBookings = await db.booking.count({
      where: { status: 'PENDING' },
    });
    const confirmedBookings = await db.booking.count({
      where: { status: 'CONFIRMED' },
    });
    const completedBookings = await db.booking.count({
      where: { status: 'COMPLETED' },
    });

    // Get revenue
    const totalRevenue = await db.booking.aggregate({
      _sum: {
        totalPrice: true,
      },
      where: { status: 'CONFIRMED' },
    });

    // Get service counts
    const roomCount = await db.room.count();
    const hallCount = await db.hall.count();
    const restaurantCount = await db.restaurant.count();
    const activityCount = await db.activity.count();
    const gymCount = await db.gymPackage.count();

    // Get most booked services
    const bookingsByService = await db.booking.groupBy({
      by: ['serviceType'],
      _count: {
        id: true,
      },
    });

    return NextResponse.json({
      analytics: {
        bookings: {
          total: totalBookings,
          pending: pendingBookings,
          confirmed: confirmedBookings,
          completed: completedBookings,
        },
        revenue: {
          total: totalRevenue._sum.totalPrice || 0,
        },
        services: {
          rooms: roomCount,
          halls: hallCount,
          restaurants: restaurantCount,
          activities: activityCount,
          gym: gymCount,
        },
        bookingsByService,
      },
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
