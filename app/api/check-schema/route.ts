import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Get all available models in the Prisma schema
    const prismaModels = Object.keys(prisma).filter(key => typeof prisma[key as keyof typeof prisma] === 'object');
    
    // Check if the Payment model exists
    const hasPaymentModel = 'payment' in prisma;
    
    // Get the BookStand model structure
    let bookStandStructure = null;
    try {
      const sampleBookStand = await prisma.bookStand.findFirst();
      if (sampleBookStand) {
        bookStandStructure = Object.keys(sampleBookStand);
      }
    } catch (error) {
      console.error('Error getting BookStand structure:', error);
    }
    
    return NextResponse.json({ 
      prismaModels,
      hasPaymentModel,
      bookStandStructure
    });
  } catch (error) {
    console.error('Error checking schema:', error);
    return NextResponse.json(
      { error: 'Failed to check schema' },
      { status: 500 }
    );
  }
} 