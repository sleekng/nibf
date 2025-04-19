"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode, Children } from "react";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const slideInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const slideInDown = {
  hidden: { opacity: 0, y: -50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const zoomIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const flipIn = {
  hidden: { opacity: 0, rotateX: 90 },
  visible: { 
    opacity: 1, 
    rotateX: 0,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

// Animation types
type AnimationType = "fade" | "slide" | "slideLeft" | "slideRight" | "slideUp" | "slideDown" | "zoom" | "flip";

// Get animation variant based on type
const getAnimationVariant = (type: AnimationType) => {
  switch (type) {
    case "fade":
      return fadeIn;
    case "slide":
      return slideInUp;
    case "slideLeft":
      return slideInLeft;
    case "slideRight":
      return slideInRight;
    case "slideUp":
      return slideInUp;
    case "slideDown":
      return slideInDown;
    case "zoom":
      return zoomIn;
    case "flip":
      return flipIn;
    default:
      return fadeIn;
  }
};

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animationType?: AnimationType;
  delay?: number;
  threshold?: number;
}

export function AnimatedSection({ 
  children, 
  className = "", 
  animationType = "fade",
  delay = 0,
  threshold = 0.1
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  const variant = getAnimationVariant(animationType);
  
  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      transition={{ delay }}
    >
      {children}
    </motion.section>
  );
}

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  animationType?: AnimationType;
  delay?: number;
  threshold?: number;
}

export function AnimatedElement({ 
  children, 
  className = "", 
  animationType = "fade",
  delay = 0,
  threshold = 0.1
}: AnimatedElementProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  const variant = getAnimationVariant(animationType);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedHeadingProps {
  children: ReactNode;
  className?: string;
  animationType?: AnimationType;
  delay?: number;
  threshold?: number;
}

export function AnimatedHeading({ 
  children, 
  className = "", 
  animationType = "flip",
  delay = 0,
  threshold = 0.1
}: AnimatedHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  const variant = getAnimationVariant(animationType);
  
  return (
    <motion.h2
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      transition={{ delay }}
    >
      {children}
    </motion.h2>
  );
}

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  animationType?: AnimationType;
  delay?: number;
  threshold?: number;
}

export function AnimatedText({ 
  children, 
  className = "", 
  animationType = "fade",
  delay = 0,
  threshold = 0.1
}: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  const variant = getAnimationVariant(animationType);
  
  return (
    <motion.p
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      transition={{ delay }}
    >
      {children}
    </motion.p>
  );
}

interface AnimatedImageProps {
  src: string;
  alt: string;
  className?: string;
  animationType?: AnimationType;
  delay?: number;
  threshold?: number;
  priority?: boolean;
}

export function AnimatedImage({ 
  src, 
  alt, 
  className = "", 
  animationType = "zoom",
  delay = 0,
  threshold = 0.1,
  priority = false
}: AnimatedImageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  const variant = getAnimationVariant(animationType);
  
  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variant}
      transition={{ delay }}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
        loading={priority ? "eager" : "lazy"}
      />
    </motion.div>
  );
}

interface AnimatedStaggerProps {
  children: ReactNode;
  className?: string;
  animationType?: AnimationType;
  delay?: number;
  threshold?: number;
}

export function AnimatedStagger({ 
  children, 
  className = "", 
  animationType = "fade",
  delay = 0,
  threshold = 0.1
}: AnimatedStaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  
  const containerVariant = {
    ...staggerContainer,
    visible: {
      ...staggerContainer.visible,
      transition: {
        ...staggerContainer.visible.transition,
        delayChildren: delay
      }
    }
  };
  
  const childVariant = getAnimationVariant(animationType);
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariant}
    >
      {Children.map(children, (child) => (
        <motion.div variants={childVariant}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
} 