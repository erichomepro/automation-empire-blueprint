
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
  
  try {
    // Ensure we're working with a string
    let sanitized = String(path);
    
    // Check if this is an iOS device for extra logging
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isIOS) {
      console.log(`iOS device detected, sanitizing path: '${path}'`);
    }
    
    // Aggressively replace all backslashes with forward slashes
    while (sanitized.includes('\\')) {
      sanitized = sanitized.replace(/\\/g, '/');
    }
    
    // Remove any double slashes (except for http:// or https://)
    sanitized = sanitized.replace(/([^:])\/\/+/g, '$1/');
    
    // Ensure the path starts with a slash for relative paths
    if (!sanitized.startsWith('/') && !sanitized.startsWith('http')) {
      sanitized = '/' + sanitized;
    }
    
    // Additional mobile safety checks
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      // Final verification for any remaining backslashes
      if (sanitized.includes('\\')) {
        console.error(`Critical: Path still contains backslashes after sanitization: '${sanitized}'`);
        return '/'; // Return home as safeguard
      }
    }
    
    console.log(`Path sanitized from '${path}' to '${sanitized}'`);
    return sanitized;
  } catch (error) {
    console.error("Path sanitization error:", error);
    // Fail safe: return home path
    return '/';
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

/**
 * Safely scrolls to an element by ID with fallback navigation
 */
export function safeScrollToElement(
  elementId: string, 
  navigate?: NavigateFunction, 
  fallbackPath?: string
): void {
  try {
    // Sanitize element ID to prevent issues
    const safeId = elementId.replace(/[^\w-]/g, '');
    
    console.log(`Attempting to scroll to element: #${safeId}`);
    const element = document.getElementById(safeId);
    
    if (element) {
      // Element found, scroll to it
      element.scrollIntoView({ behavior: 'smooth' });
      console.log(`Successfully scrolled to #${safeId}`);
    } else {
      console.warn(`Element #${safeId} not found`);
      
      // If we have navigation fallback info, use it
      if (fallbackPath && navigate) {
        // CRITICAL FIX: Always sanitize the fallback path before navigation
        const sanitizedPath = sanitizePath(fallbackPath);
        console.log(`Element not found, navigating to sanitized path: ${sanitizedPath}`);
        
        // Use our safe navigation function
        safeNavigate(navigate, sanitizedPath);
      }
    }
  } catch (error) {
    console.error(`Error scrolling to #${elementId}:`, error);
    
    // If we have navigation fallback info, use it
    if (fallbackPath && navigate) {
      // CRITICAL FIX: Always sanitize the fallback path before navigation
      const sanitizedPath = sanitizePath(fallbackPath);
      safeNavigate(navigate, sanitizedPath);
    }
  }
}
