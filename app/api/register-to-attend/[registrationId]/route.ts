import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { registrationId: string } }
) {
  try {
    const registrationId = params.registrationId;
    console.log('Looking up registration:', registrationId);

    const registration = await prisma.registration.findUnique({
      where: {
        registration_id: registrationId
      }
    });

    console.log('Registration found:', registration);

    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ registration });
  } catch (error) {
    console.error('Error looking up registration:', error);
    return NextResponse.json(
      { error: 'Failed to look up registration' },
      { status: 500 }
    );
  }
} 