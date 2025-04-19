import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Delete all users
    const deleteResult = await prisma.user.deleteMany({});
    
    return NextResponse.json(
      { 
        message: 'All users deleted successfully', 
        count: deleteResult.count 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error clearing users:', error);
    return NextResponse.json(
      { error: 'An error occurred while clearing users' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 