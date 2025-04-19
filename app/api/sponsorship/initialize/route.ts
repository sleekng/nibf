import { NextResponse } from "next/server";
import { initializePayment } from "@/lib/paystack";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, amount, metadata } = body;

    if (!email || !amount) {
      return NextResponse.json(
        { status: "error", message: "Email and amount are required" },
        { status: 400 }
      );
    }

    // Initialize payment with Paystack
    const payment = await initializePayment(email, amount, {
      ...metadata,
      type: "sponsorship",
    });

    return NextResponse.json(payment);
  } catch (error) {
    console.error("Error initializing payment:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to initialize payment" },
      { status: 500 }
    );
  }
} 