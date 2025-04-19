import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    console.log('Fetching all registrations...');
    const registrations = await prisma.registration.findMany({
      select: {
        id: true,
        registration_id: true,
        first_name: true,
        last_name: true,
        email: true,
        ticket_type: true,
        payment_status: true,
        created_at: true
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    console.log('Found registrations:', registrations.length);
    return NextResponse.json({ registrations });
  } catch (error) {
    console.error('Error fetching registrations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch registrations' },
      { status: 500 }
    );
  }
} 