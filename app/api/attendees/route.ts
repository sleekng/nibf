import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Fetch all registrations (attendees)
    const attendees = await prisma.registration.findMany({
      select: {
        id: true,
        registration_id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        organization: true,
        ticket_type: true,
        created_at: true,
        job_title: true,
        country: true,
        interests: true,
        special_requirements: true,
        terms_accepted: true,
        newsletter_subscribed: true,
        payment_status: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json({
      attendees,
    });
  } catch (error) {
    console.error('Error fetching attendees:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 