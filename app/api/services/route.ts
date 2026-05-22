import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (!type) {
      return NextResponse.json(
        { error: 'Service type is required' },
        { status: 400 }
      );
    }

    let services;

    switch (type) {
      case 'rooms':
        services = await db.room.findMany();
        break;
      case 'halls':
        services = await db.hall.findMany();
        break;
      case 'restaurants':
        services = await db.restaurant.findMany();
        break;
      case 'amenities':
        services = await db.amenity.findMany();
        break;
      case 'activities':
        services = await db.activity.findMany();
        break;
      case 'events':
        services = await db.event.findMany();
        break;
      case 'gym':
        services = await db.gymPackage.findMany();
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid service type' },
          { status: 400 }
        );
    }

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Get services error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
