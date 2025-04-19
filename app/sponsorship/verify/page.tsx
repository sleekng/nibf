"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

export default function VerifyPayment() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!reference) {
        setStatus("error");
        setMessage("No payment reference provided");
        return;
      }

      try {
        const response = await fetch(`/api/sponsorship/verify?reference=${reference}`);
        const data = await response.json();

        if (data.status === "success") {
          setStatus("success");
          setMessage("Payment verified successfully! Thank you for your sponsorship.");
        } else {
          setStatus("error");
          setMessage(data.message || "Payment verification failed");
        }
      } catch (error) {
        setStatus("error");
        setMessage("An error occurred while verifying payment");
      }
    };

    verifyPayment();
  }, [reference]);

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Payment Verification</CardTitle>
          <CardDescription>
            {status === "loading" && "Verifying your payment..."}
            {status === "success" && "Payment verified successfully"}
            {status === "error" && "Payment verification failed"}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-6">
          {status === "loading" && (
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          )}
          {status === "success" && (
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          )}
          {status === "error" && (
            <XCircle className="h-12 w-12 text-red-500" />
          )}
          
          <p className="text-center text-lg">{message}</p>
          
          <div className="flex gap-4">
            <Link href="/sponsorship">
              <Button variant="outline">Back to Sponsorship</Button>
            </Link>
            <Link href="/">
              <Button>Return to Home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 