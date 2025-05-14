
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
    
    // Always use forward slashes, never backslashes
    sanitized = sanitized.replace(/\\/g, '/');
    
    // Remove any double slashes (except for http:// or https://)
    sanitized = sanitized.replace(/([^:])\/\/+/g, '$1/');
    
    // Ensure the path starts with a slash for relative paths
    if (!sanitized.startsWith('/') && !sanitized.startsWith('http')) {
      sanitized = '/' + sanitized;
    }
    
    // Handle special case for iOS where literal backslashes might be present in string
    if (sanitized.includes('\\')) {
      console.warn(`Path still contains backslashes after replacement: '${sanitized}'`);
      sanitized = sanitized.split('\\').join('/');
    }
    
    console.log(`Path sanitized: '${path}' → '${sanitized}'`);
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
      // Only attempt to sanitize if the original path is available
      if (typeof path === 'string') {
        fallbackPath = sanitizePath(path);
        // Double-check it's valid
        if (fallbackPath.includes('\\')) {
          fallbackPath = '/';
        }
      }
      
      console.log(`Fallback navigation to: ${fallbackPath}`);
      
      // Use safer history.pushState instead of direct location.href assignment
      if (window.history) {
        window.history.pushState({}, '', fallbackPath);
        window.dispatchEvent(new Event('popstate'));
      } else {
        // Last resort
        window.location.href = fallbackPath;
      }
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
