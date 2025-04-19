"use client";

import { motion } from "framer-motion";

export function LineLoader() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 overflow-hidden">
      {/* Background track */}
      <div className="absolute inset-0 bg-slate-200/30" />
      
      {/* Animated progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-full w-full origin-left"
        initial={{ scaleX: 0 }}
        animate={{ 
          scaleX: [0, 0.3, 0.7, 1],
        }}
        transition={{
          duration: 1.5,
          times: [0, 0.3, 0.7, 1],
          ease: "easeInOut",
        }}
      >
        <div className="h-full w-full bg-gradient-to-r from-navy-500 via-crimson-500 to-navy-500" />
      </motion.div>
      
      {/* Shimmer effect */}
      <motion.div
        className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "400%" }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
} 