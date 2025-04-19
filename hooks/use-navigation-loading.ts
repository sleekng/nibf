"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useNavigationLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleStop = () => setIsLoading(false);

    // Handle navigation start
    window.addEventListener("beforeunload", handleStart);
    window.addEventListener("load", handleStop);

    // Handle client-side navigation
    const handleRouteChangeStart = () => setIsLoading(true);
    const handleRouteChangeComplete = () => {
      // Add a small delay to ensure the loading indicator is visible
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    // Listen for navigation events
    window.addEventListener("popstate", handleRouteChangeStart);
    window.addEventListener("pushstate", handleRouteChangeStart);
    window.addEventListener("popstate", handleRouteChangeComplete);
    window.addEventListener("pushstate", handleRouteChangeComplete);

    // Handle link clicks
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && !link.href.includes('#') && !link.hasAttribute('data-no-loading')) {
        setIsLoading(true);
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener("beforeunload", handleStart);
      window.removeEventListener("load", handleStop);
      window.removeEventListener("popstate", handleRouteChangeStart);
      window.removeEventListener("pushstate", handleRouteChangeStart);
      window.removeEventListener("popstate", handleRouteChangeComplete);
      window.removeEventListener("pushstate", handleRouteChangeComplete);
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  // Reset loading state when pathname or search params change
  useEffect(() => {
    // Add a small delay to ensure the loading indicator is visible
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return isLoading;
} 