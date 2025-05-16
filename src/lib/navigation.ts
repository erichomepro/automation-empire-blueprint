
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
  }
};

/**
 * Enhanced navigation function with built-in error handling
 */
export const safeNavigate = (navigate: NavigateFunction, path: string) => {
  try {
    console.log(`[safeNavigate] Navigating to: ${path}`);
    navigate(path);
  } catch (error) {
    console.error("[safeNavigate] Navigation failed:", error);
    // Fallback to direct location change if navigate fails
    try {
      window.location.href = path;
    } catch (innerError) {
      console.error("[safeNavigate] Even direct location change failed:", innerError);
    }
  }
};
