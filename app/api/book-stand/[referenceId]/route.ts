import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  context: { params: { referenceId: string } }
) {
  try {
    const referenceId = context.params.referenceId;
    console.log('Fetching book stand with reference ID:', referenceId);
    
    if (!referenceId) {
      console.error('No reference ID provided');
      return NextResponse.json(
        { error: 'Reference ID is required' },
        { status: 400 }
      );
    }

    console.log('Querying database for reference_id:', referenceId);
    const bookStand = await prisma.bookStand.findUnique({
      where: { reference_id: referenceId },
    });

    console.log('Raw database result:', bookStand);

    if (!bookStand) {
      console.log('Book stand not found for reference ID:', referenceId);
      return NextResponse.json(
        { error: 'Stand not found' },
        { status: 404 }
      );
    }

    // Format the response to match the expected format in the frontend
    const formattedBookStand = {
      id: bookStand.id,
      referenceId: bookStand.reference_id,
      companyName: bookStand.company_name,
      contactName: bookStand.contact_name,
      email: bookStand.email,
      phone: bookStand.phone,
      standType: bookStand.stand_type,
      paymentMethod: bookStand.payment_method,
      additionalRequirements: bookStand.additional_requirements,
      status: bookStand.status,
      adminConfirmed: bookStand.admin_confirmed,
      createdAt: bookStand.created_at,
      updatedAt: bookStand.updated_at
    };

    console.log('Formatted response:', { bookStand: formattedBookStand });
    
    return NextResponse.json({ bookStand: formattedBookStand });
  } catch (error) {
    console.error('Error fetching book stand:', error);
    return NextResponse.json(
      { error: 'Failed to fetch book stand' },
      { status: 500 }
    );
  }
} 