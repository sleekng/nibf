import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { reference: string } }
) {
  try {
    const donation = await prisma.donationRecord.findUnique({
      where: { reference: params.reference },
      include: {
        donor: true,
        items: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!donation) {
      return NextResponse.json(
        { error: 'Donation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      reference: donation.reference,
      amount: donation.amount,
      status: donation.status,
      donorName: donation.donor.name,
      items: donation.items.map((item) => ({
        title: item.book.title,
        quantity: item.quantity,
        price: item.price,
      })),
    });
  } catch (error) {
    console.error('Error fetching donation details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donation details' },
      { status: 500 }
    );
  }
} 