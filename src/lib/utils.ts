
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
  
  // Always use forward slashes, never backslashes
  let sanitized = String(path).replace(/\\/g, '/');
  
  // Remove any double slashes (except for http:// or https://)
  sanitized = sanitized.replace(/([^:])\/\/+/g, '$1/');
  
  // Ensure the path starts with a slash for relative paths
  if (!sanitized.startsWith('/') && !sanitized.startsWith('http')) {
    sanitized = '/' + sanitized;
  }
  
  console.log(`Path sanitized: '${path}' → '${sanitized}'`);
  return sanitized;
}

/**
 * Safely navigate to a path using React Router
 */
export function safeNavigate(navigate: NavigateFunction, path: string): void {
  try {
    // Always sanitize the path first
    const safePath = sanitizePath(path);
    console.log(`Navigating to: ${safePath}`);
    
    // Use React Router for navigation
    navigate(safePath);
  } catch (error) {
    console.error("Navigation error:", error);
    
    // Fallback to location.href for critical errors
    try {
      const fallbackPath = sanitizePath(path);
      console.log(`Fallback navigation to: ${fallbackPath}`);
      window.location.href = fallbackPath;
    } catch (e) {
      console.error("Critical navigation error, redirecting to home:", e);
      window.location.href = '/';
    }
  }
}

/**
 * Safely scrolls to an element by ID with fallback navigation
 */
export function safeScrollToElement(
  elementId: string, 
  navigate?: NavigateFunction, 
  fallbackPath?: string
): void {
  try {
    console.log(`Attempting to scroll to element: #${elementId}`);
    const element = document.getElementById(elementId);
    
    if (element) {
      // Element found, scroll to it
      element.scrollIntoView({ behavior: 'smooth' });
      console.log(`Successfully scrolled to #${elementId}`);
    } else {
      console.warn(`Element #${elementId} not found`);
      
      // If we have navigation fallback info, use it
      if (fallbackPath && navigate) {
        console.log(`Element not found, navigating to: ${fallbackPath}`);
        safeNavigate(navigate, fallbackPath);
      }
    }
  } catch (error) {
    console.error(`Error scrolling to #${elementId}:`, error);
    
    // If we have navigation fallback info, use it
    if (fallbackPath && navigate) {
      safeNavigate(navigate, fallbackPath);
    }
  }
}
