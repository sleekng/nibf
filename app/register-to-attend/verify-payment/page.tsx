"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function VerifyPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");

  useEffect(() => {
    const reference = searchParams.get("reference") || searchParams.get("trxref");
    if (!reference) {
      toast.error("No payment reference found.");
      router.replace("/register-to-attend");
      return;
    }

    const verify = async () => {
      try {
        const response = await fetch(`/api/payment/verify?reference=${reference}`);
        const data = await response.json();
        if (data.success) {
          setStatus("success");
          // Optionally update registrationData in localStorage
          const regData = localStorage.getItem("registrationData");
          if (regData) {
            const reg = JSON.parse(regData);
            reg.paymentStatus = "completed";
            reg.paymentReference = reference;
            localStorage.setItem("registrationData", JSON.stringify(reg));
            setTimeout(() => {
              router.replace(`/register-to-attend/success?registrationId=${reg.registrationId}`);
            }, 1800);
          } else {
            toast.error("Registration data not found");
            setTimeout(() => {
              router.replace("/register-to-attend");
            }, 2000);
          }
        } else {
          setStatus("failed");
          toast.error(data.error || "Payment verification failed.");
          setTimeout(() => {
            router.replace("/register-to-attend");
          }, 2000);
        }
      } catch (error) {
        setStatus("failed");
        toast.error("Payment verification failed. Please try again.");
        setTimeout(() => {
          router.replace("/register-to-attend");
        }, 2000);
      }
    };
    verify();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <AnimatePresence mode="wait">
        {status === "verifying" && (
          <motion.div
            key="verifying"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center"
          >
            <Loader2 className="h-16 w-16 text-blue-500 animate-spin mb-6" />
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Verifying Payment...</h2>
            <p className="text-gray-600">Please wait while we verify your payment.</p>
          </motion.div>
        )}
        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center"
          >
            <CheckCircle className="h-20 w-20 text-green-500 mb-6 animate-bounce" />
            <h2 className="text-2xl font-semibold text-green-700 mb-2">Payment Verified!</h2>
            <p className="text-gray-600">Redirecting to your registration confirmation...</p>
          </motion.div>
        )}
        {status === "failed" && (
          <motion.div
            key="failed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl font-semibold text-red-700 mb-2">Payment Verification Failed</h2>
            <p className="text-gray-600">Redirecting to registration page...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 