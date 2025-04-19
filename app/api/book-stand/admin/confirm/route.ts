import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { referenceId } = body;

    // Validate required fields
    if (!referenceId) {
      return NextResponse.json(
        { error: "Missing reference ID" },
        { status: 400 }
      );
    }

    // Find and update the book stand record
    const bookStand = await prisma.bookStand.update({
      where: { reference_id: referenceId },
      data: {
        admin_confirmed: true,
        status: "confirmed",
      },
    });

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
    console.error("Error confirming book stand:", error);
    return NextResponse.json(
      { error: "Failed to confirm book stand" },
      { status: 500 }
    );
  }
} 