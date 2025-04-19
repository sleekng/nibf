"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { LineLoader } from "./line-loader";
import { useNavigationLoading } from "@/hooks/use-navigation-loading";

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const isLoading = useNavigationLoading();

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LineLoader />}
      </AnimatePresence>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
} 