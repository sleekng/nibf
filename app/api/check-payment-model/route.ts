import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Check if the Payment model exists in the Prisma schema
    const hasPaymentModel = 'payment' in prisma;
    
    return NextResponse.json({ 
      hasPaymentModel,
      prismaModels: Object.keys(prisma).filter(key => typeof prisma[key as keyof typeof prisma] === 'object')
    });
  } catch (error) {
    console.error('Error checking payment model:', error);
    return NextResponse.json(
      { error: 'Failed to check payment model' },
      { status: 500 }
    );
  }
} 