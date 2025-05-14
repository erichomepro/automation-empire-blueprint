
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { NavigateFunction } from "react-router-dom";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Sanitizes a URL path, ensuring it's properly formatted for all devices
 */
export function sanitizePath(path: string): string {
  if (!path) return "/";
  let sanitized = path.trim().replace(/\\/g, '/');
  sanitized = sanitized.replace(/([^:])\/\/+/g, '$1/');
  if (!sanitized.startsWith('/')) sanitized = '/' + sanitized;
  return encodeURI(sanitized);
}

/**
 * Safely scrolls to an element by ID with fallback navigation
 */
export function safeScrollToElement(
  id: string,
  navigate: NavigateFunction,
  fallbackPath?: string
) {
  const target = document.getElementById(id);

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  } else if (fallbackPath) {
    const cleanPath = sanitizePath(fallbackPath);
    console.log(`[safeScrollToElement] Navigating to fallback: ${cleanPath}`);
    navigate(cleanPath);
  } else {
    console.warn(`[safeScrollToElement] Element '${id}' not found and no fallback provided.`);
  }
}

/**
 * Safely navigate to a path using React Router
 */
export function safeNavigate(navigate: NavigateFunction, path: string): void {
  try {
    // Always sanitize the path first
    const safePath = sanitizePath(path);
    console.log(`Navigating to: ${safePath}`);
    
    // Check if this is a mobile device for extra caution
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Additional validation for mobile devices
      if (safePath.includes('\\')) {
        console.error(`Mobile navigation error: Path contains backslashes: ${safePath}`);
        navigate('/'); // Safely navigate to home as fallback
        return;
      }
    }
    
    // Use React Router for navigation
    navigate(safePath);
  } catch (error) {
    console.error("Navigation error:", error);
    
    // Fallback to location.href for critical errors but ensure path is safe
    try {
      let fallbackPath = '/'; // Default to home
      window.location.href = fallbackPath;
    } catch (e) {
      console.error("Critical navigation error, redirecting to home:", e);
      window.location.href = '/';
    }
  }
}
