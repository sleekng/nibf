 "use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function VerifyBookStandPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");

  useEffect(() => {
    const reference = searchParams.get("reference") || searchParams.get("trxref");
    if (!reference) {
      toast.error("No payment reference found.");
      router.replace("/book-stand");
      return;
    }

    const verify = async () => {
      try {
        const response = await fetch(`/api/payment/verify?reference=${reference}`);
        const data = await response.json();
        
        if (data.status === 'success') {
          setStatus("success");
          
          // Update book stand status
          try {
            const updateResponse = await fetch(`/api/book-stand/payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                referenceId: data.metadata.referenceId,
                paymentMethod: 'credit_card',
                amount: data.amount,
                currency: data.currency,
                status: 'paid'
              }),
            });

            if (!updateResponse.ok) {
              throw new Error('Failed to update book stand status');
            }

            // Redirect to success page with reference ID
            setTimeout(() => {
              router.replace(`/book-stand?ref=${data.metadata.referenceId}&fromPayment=true`);
            }, 1800);
          } catch (error) {
            console.error('Error updating book stand status:', error);
            toast.error('Payment verified but failed to update status. Please contact support.');
            setTimeout(() => {
              router.replace("/book-stand");
            }, 2000);
          }
        } else {
          setStatus("failed");
          toast.error(data.error || "Payment verification failed.");
          setTimeout(() => {
            router.replace("/book-stand");
          }, 2000);
        }
      } catch (error) {
        setStatus("failed");
        toast.error("Payment verification failed. Please try again.");
        setTimeout(() => {
          router.replace("/book-stand");
        }, 2000);
      }
    };
    verify();
  }, [router, searchParams]);

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
            <p className="text-gray-600">Redirecting to your stand booking confirmation...</p>
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
            <p className="text-gray-600">Redirecting to stand booking page...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}