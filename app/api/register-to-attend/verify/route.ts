import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const registrationId = searchParams.get('registrationId');

    console.log('Verifying registration with ID:', registrationId);

    if (!registrationId) {
      console.log('No registration ID provided');
      return NextResponse.json(
        { error: 'Registration ID is required' },
        { status: 400 }
      );
    }

    // Normalize the registration ID format (always use uppercase for consistency)
    const normalizedId = registrationId.trim().toUpperCase();
    console.log('Original registration ID:', registrationId);
    console.log('Normalized registration ID:', normalizedId);

    // Find registration in database using case-sensitive comparison
    console.log('Querying database for registration...');
    const registration = await prisma.registration.findFirst({
      where: {
        registration_id: normalizedId
      },
      include: {
        paymentReferences: {
          orderBy: {
            created_at: 'desc'
          },
          take: 1
        }
      }
    });

    console.log('Database query result:', registration);

    if (!registration) {
      console.log('Registration not found in database');
      
      // For debugging: Let's check what registrations exist
      const allRegistrations = await prisma.registration.findMany({
        select: {
          registration_id: true
        }
      });
      console.log('All registration IDs in database:', allRegistrations.map(r => r.registration_id));
      
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      registration: {
        id: registration.id,
        registrationId: registration.registration_id,
        firstName: registration.first_name,
        lastName: registration.last_name,
        email: registration.email,
        organization: registration.organization,
        ticketType: registration.ticket_type,
        paymentStatus: registration.payment_status,
        latestPayment: registration.paymentReferences[0] || null
      }
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify registration' },
      { status: 500 }
    );
  }
} 