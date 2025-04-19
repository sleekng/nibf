import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Hash the password
    const hashedPassword = await hash("password123", 10);
    
    // Create a test user
    const testUser = await prisma.user.create({
      data: {
        firstName: "Test",
        lastName: "User",
        email: "test@example.com",
        password: hashedPassword
      }
    });
    
    return NextResponse.json({
      status: "success",
      message: "Test user created successfully",
      user: {
        id: testUser.id,
        firstName: testUser.firstName,
        lastName: testUser.lastName,
        email: testUser.email
      }
    });
  } catch (error) {
    console.error("Error creating test user:", error);
    
    // Check if the error is due to a unique constraint violation
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return NextResponse.json(
        { 
          status: "info",
          message: "Test user already exists",
          error: "A user with this email already exists"
        },
        { status: 200 }
      );
    }
    
    return NextResponse.json(
      { 
        status: "error",
        message: "Error creating test user",
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 