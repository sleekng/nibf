import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Define a schema for the QR code data
const qrDataSchema = z.object({
  qrData: z.string().min(1, "QR code data is required"),
});

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    // Validate the request body against the schema
    const validationResult = qrDataSchema.safeParse(body);
    
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error);
      return NextResponse.json(
        { error: "Invalid request data", details: validationResult.error.errors },
        { status: 400 }
      );
    }
    
    const { qrData } = validationResult.data;
    
    // Log the QR code data for debugging
    console.log("Received QR code data:", qrData);
    
    // Try to find the registration by QR code
    const registration = await prisma.registration.findFirst({
      where: {
        registration_id: qrData,
      },
    });
    
    if (!registration) {
      console.log("No registration found for QR code:", qrData);
      return NextResponse.json(
        { error: "No registration found for this QR code" },
        { status: 404 }
      );
    }
    
    // No need to parse interests as it's already a JSON object
    const registrationWithParsedInterests = {
      ...registration,
      interests: registration.interests || [],
    };
    
    // Return the registration data
    return NextResponse.json({ registration: registrationWithParsedInterests });
  } catch (error) {
    console.error("Error scanning QR code:", error);
    
    // Provide more detailed error information
    let errorMessage = "An error occurred while scanning the QR code";
    let statusCode = 500;
    
    if (error instanceof z.ZodError) {
      errorMessage = "Invalid request data";
      statusCode = 400;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage, details: error instanceof Error ? error.stack : undefined },
      { status: statusCode }
    );
  }
} 