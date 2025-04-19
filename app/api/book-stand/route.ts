import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    console.log('Received POST request to /api/book-stand');
    
    // Parse request body with error handling
    let body;
    try {
      body = await request.json();
      console.log('Request body:', body);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const {
      companyName,
      contactName,
      email,
      phone,
      standType,
      paymentMethod,
      additionalRequirements,
    } = body;

    // Validate required fields
    if (!companyName || !contactName || !email || !phone || !standType || !paymentMethod) {
      console.error('Missing required fields:', { companyName, contactName, email, phone, standType, paymentMethod });
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate a unique reference ID
    const referenceId = `BS-${uuidv4().substring(0, 8).toUpperCase()}`;
    console.log('Generated reference ID:', referenceId);

    // Create the book stand record with error handling
    let bookStand;
    try {
      bookStand = await prisma.bookStand.create({
        data: {
          company_name: companyName,
          contact_name: contactName,
          email,
          phone,
          stand_type: standType,
          payment_method: paymentMethod,
          additional_requirements: additionalRequirements || "",
          reference_id: referenceId,
          status: "pending",
          admin_confirmed: false,
        },
      });
      console.log('Created book stand:', bookStand);
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to create book stand record", details: dbError instanceof Error ? dbError.message : String(dbError) },
        { status: 500 }
      );
    }

    // Format the response to match what the frontend expects
    const response = { 
      bookStand: {
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
      }
    };
    console.log('Sending response:', response);

    return NextResponse.json(response, { 
      status: 201,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error("Error in POST /api/book-stand:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

// Get book stand by reference ID
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const referenceId = searchParams.get('referenceId');

    if (!referenceId) {
      return NextResponse.json(
        { error: "Reference ID is required" },
        { status: 400 }
      );
    }

    // Find the book stand record using Prisma
    const bookStand = await prisma.bookStand.findUnique({
      where: { reference_id: referenceId },
    });

    if (!bookStand) {
      return NextResponse.json(
        { error: "Book stand not found" },
        { status: 404 }
      );
    }

    // Format the response
    return NextResponse.json({ 
      bookStand: {
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
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching book stand:", error);
    return NextResponse.json(
      { error: "Failed to fetch book stand" },
      { status: 500 }
    );
  }
}

// Update book stand status
export async function PATCH(req: Request) {
  try {
    const { referenceId, status } = await req.json();

    if (!referenceId || !status) {
      return NextResponse.json(
        { error: "Reference ID and status are required" },
        { status: 400 }
      );
    }

    // Check if book stand exists
    const existingBookStand = await prisma.bookStand.findUnique({
      where: { reference_id: referenceId },
    });

    if (!existingBookStand) {
      return NextResponse.json(
        { error: "Book stand not found" },
        { status: 404 }
      );
    }

    // Update book stand status
    const updatedBookStand = await prisma.bookStand.update({
      where: { reference_id: referenceId },
      data: { status },
    });

    return NextResponse.json(
      { 
        message: "Book stand status updated successfully",
        bookStand: {
          id: updatedBookStand.id,
          referenceId: updatedBookStand.reference_id,
          companyName: updatedBookStand.company_name,
          contactName: updatedBookStand.contact_name,
          email: updatedBookStand.email,
          phone: updatedBookStand.phone,
          standType: updatedBookStand.stand_type,
          paymentMethod: updatedBookStand.payment_method,
          additionalRequirements: updatedBookStand.additional_requirements,
          status: updatedBookStand.status,
          adminConfirmed: updatedBookStand.admin_confirmed,
          createdAt: updatedBookStand.created_at,
          updatedAt: updatedBookStand.updated_at
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating book stand status:", error);
    return NextResponse.json(
      { error: "Failed to update book stand status" },
      { status: 500 }
    );
  }
} 