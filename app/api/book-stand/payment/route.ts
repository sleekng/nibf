import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { referenceId, paymentMethod, cardData } = body;

    // Validate required fields
    if (!referenceId || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Find the book stand record
    const bookStand = await prisma.bookStand.findUnique({
      where: { reference_id: referenceId },
    });

    if (!bookStand) {
      return NextResponse.json(
        { error: "Book stand not found" },
        { status: 404 }
      );
    }

    // Update the book stand status based on payment method
    const updatedBookStand = await prisma.bookStand.update({
      where: { reference_id: referenceId },
      data: {
        status: paymentMethod === "credit_card" ? "paid" : "pending",
      },
    });

    // Format the response to match what the frontend expects
    return NextResponse.json({ 
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
        createdAt: updatedBookStand.created_at,
        updatedAt: updatedBookStand.updated_at
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    );
  }
} 