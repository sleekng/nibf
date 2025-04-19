import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      { status: "error", message: "No reference provided" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { data } = response.data;

    if (data.status === "success") {
      // Here you can save the payment details to your database
      // For example:
      // await savePaymentToDatabase({
      //   reference: data.reference,
      //   amount: data.amount,
      //   email: data.customer.email,
      //   metadata: data.metadata,
      //   status: data.status,
      // });

      return NextResponse.json({
        status: "success",
        message: "Payment verified successfully",
        data,
      });
    } else {
      return NextResponse.json({
        status: "error",
        message: "Payment verification failed",
        data,
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { status: "error", message: "Error verifying payment" },
      { status: 500 }
    );
  }
} 