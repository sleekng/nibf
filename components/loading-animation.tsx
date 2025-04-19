"use client";

import { motion } from "framer-motion";

export function LoadingAnimation() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-navy-900 to-navy-800">
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="absolute h-24 w-24 rounded-full border-4 border-crimson-500"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Middle ring */}
        <motion.div
          className="absolute h-16 w-16 rounded-full border-4 border-navy-300"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 0],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute h-8 w-8 rounded-full border-4 border-crimson-300"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute h-4 w-4 rounded-full bg-white"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Text */}
        <motion.div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.h2 
            className="text-xl font-bold"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading...
          </motion.h2>
        </motion.div>
      </div>
    </div>
  );
} 