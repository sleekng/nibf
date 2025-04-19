import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch all book stands
    const bookStands = await prisma.bookStand.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });

    // Format the response
    return NextResponse.json({
      bookStands: bookStands.map(stand => ({
        id: stand.id,
        referenceId: stand.reference_id,
        companyName: stand.company_name,
        contactName: stand.contact_name,
        email: stand.email,
        phone: stand.phone,
        standType: stand.stand_type,
        paymentMethod: stand.payment_method,
        additionalRequirements: stand.additional_requirements,
        status: stand.status,
        adminConfirmed: stand.admin_confirmed,
        createdAt: stand.created_at,
        updatedAt: stand.updated_at
      }))
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching book stands:", error);
    return NextResponse.json(
      { error: "Failed to fetch book stands" },
      { status: 500 }
    );
  }
} 