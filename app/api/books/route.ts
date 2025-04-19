import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        skip,
        take: limit,
        orderBy: {
          created_at: 'desc'
        }
      }),
      prisma.book.count()
    ]);

    return NextResponse.json({
      books,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;

    let imagePath = '';
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Generate a unique filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const filename = `${uniqueSuffix}-${imageFile.name}`;
      
      // Save the file to the public directory
      const path = join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(path, buffer);
      
      imagePath = `/uploads/${filename}`;
    }

    const book = await prisma.book.create({
      data: {
        title,
        author,
        price,
        image: imagePath,
        category,
        description,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const id = parseInt(formData.get('id') as string);
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const price = parseFloat(formData.get('price') as string);
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const imageFile = formData.get('image') as File | null;
    const currentImage = formData.get('currentImage') as string;

    let imagePath = currentImage;
    if (imageFile) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Generate a unique filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const filename = `${uniqueSuffix}-${imageFile.name}`;
      
      // Save the file to the public directory
      const path = join(process.cwd(), 'public', 'uploads', filename);
      await writeFile(path, buffer);
      
      imagePath = `/uploads/${filename}`;
    }

    const book = await prisma.book.update({
      where: { id },
      data: {
        title,
        author,
        price,
        image: imagePath,
        category,
        description,
      },
    });

    return NextResponse.json(book);
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json({ error: 'Failed to update book' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id') as string);

    await prisma.book.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 });
  }
} 