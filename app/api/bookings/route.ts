import { db } from '@/lib/db';
import { verifyToken, getTokenFromRequest } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const {
      serviceType,
      serviceId,
      checkInDate,
      checkOutDate,
      date,
      time,
      guests,
      notes,
      totalPrice,
    } = body;

    // Validate required fields
    if (!serviceType || !serviceId || !totalPrice) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if service exists and get price
    let service;
    switch (serviceType) {
      case 'ROOM':
        service = await db.room.findUnique({ where: { id: serviceId } });
        break;
      case 'HALL':
        service = await db.hall.findUnique({ where: { id: serviceId } });
        break;
      case 'RESTAURANT':
        service = await db.restaurant.findUnique({ where: { id: serviceId } });
        break;
      case 'ACTIVITY':
        service = await db.activity.findUnique({ where: { id: serviceId } });
        break;
      case 'EVENT':
        service = await db.event.findUnique({ where: { id: serviceId } });
        break;
      case 'GYM':
        service = await db.gymPackage.findUnique({ where: { id: serviceId } });
        break;
      case 'AMENITY':
        service = await db.amenity.findUnique({ where: { id: serviceId } });
        break;
      default:
        return NextResponse.json({ error: 'Invalid service type' }, { status: 400 });
    }

    if (!service) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    // Create booking
    const bookingData: Record<string, unknown> = {
      userId: decoded.userId,
      serviceType,
      totalPrice,
      guests,
      notes,
      status: 'PENDING',
    };

    if (serviceType === 'ROOM') {
      bookingData.roomId = serviceId;
      bookingData.checkInDate = new Date(checkInDate);
      bookingData.checkOutDate = checkOutDate ? new Date(checkOutDate) : undefined;
    } else if (serviceType === 'HALL') {
      bookingData.hallId = serviceId;
      bookingData.checkInDate = new Date(checkInDate);
      bookingData.timeSlot = time;
    } else if (serviceType === 'RESTAURANT') {
      bookingData.restaurantId = serviceId;
      bookingData.checkInDate = new Date(date);
      bookingData.timeSlot = time;
    } else if (serviceType === 'ACTIVITY') {
      bookingData.activityId = serviceId;
      bookingData.checkInDate = new Date(date);
      bookingData.timeSlot = time;
    } else if (serviceType === 'EVENT') {
      bookingData.eventId = serviceId;
      bookingData.checkInDate = new Date(date);
    } else if (serviceType === 'GYM') {
      bookingData.gymPackageId = serviceId;
      bookingData.checkInDate = new Date(checkInDate);
    } else if (serviceType === 'AMENITY') {
      bookingData.amenityId = serviceId;
      bookingData.checkInDate = new Date(date);
    }

    const booking = await db.booking.create({
      data: bookingData,
      include: {
        user: true,
        room: true,
        hall: true,
        restaurant: true,
        activity: true,
        event: true,
        gymPackage: true,
        amenity: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get user's bookings
    const bookings = await db.booking.findMany({
      where: { userId: decoded.userId },
      include: {
        room: true,
        hall: true,
        restaurant: true,
        activity: true,
        event: true,
        gymPackage: true,
        amenity: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
