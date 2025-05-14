
import { NavigateFunction } from "react-router-dom";

/**
 * Sanitizes a URL path to prevent parsing errors, especially on mobile devices
 */
export const sanitizePath = (path: string): string => {
  if (!path) return "/";
  let sanitized = path.trim().replace(/\\/g, '/');
  sanitized = sanitized.replace(/([^:])\/\/+/g, '$1/');
  if (!sanitized.startsWith('/')) sanitized = '/' + sanitized;
  
  // Add mobile device logging to help with debugging
  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    console.log(`[MOBILE SANITIZE] Path from '${path}' to '${sanitized}'`);
  }
  
  return encodeURI(sanitized);
};

/**
 * Centralized navigation utility that handles scrolling to elements or 
 * navigating to fallback paths with proper error handling
 */
export const navigateToSection = (
  id: string,
  navigate: NavigateFunction,
  fallbackPath?: string
) => {
  try {
    const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
    const target = document.getElementById(id);
    
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      console.log(`[navigateToSection] Scrolled to element: ${id}`);
    } else if (fallbackPath) {
      const cleanPath = sanitizePath(fallbackPath);
      console.log(`[navigateToSection] Navigating to fallback path: ${cleanPath}`);
      
      // Additional logging for mobile devices
      if (isMobile) {
        console.log("[MOBILE NAVIGATION] Clean path to:", cleanPath);
      }
      
      navigate(cleanPath);
    } else {
      console.error(`[navigateToSection] Element '${id}' not found and no fallback provided.`);
    }
  } catch (error) {
    console.error("[navigateToSection] Navigation error:", error);
    // We could add visual recovery UI here in a future update
  }
};
