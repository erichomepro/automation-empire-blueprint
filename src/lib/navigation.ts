
import { NavigateFunction } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

/**
 * Sanitizes a URL path, fixing backslashes and ensuring proper format
 * @param path The path to sanitize
 * @returns Sanitized path string
 */
export const sanitizePath = (path: string): string => {
  if (!path) return "/";
  
  // Replace backslashes with forward slashes
  let sanitized = path.replace(/\\/g, '/');
  
  // Remove any double slashes (except for http:// or https://)
  sanitized = sanitized.replace(/([^:])\/\/+/g, '$1/');
  
  // Ensure the path starts with a slash if it's a relative path
  if (!sanitized.startsWith('/') && !sanitized.startsWith('http')) {
    sanitized = '/' + sanitized;
  }
  
  return sanitized;
};

/**
 * Safely navigate to a path using React Router's navigate function
 * with fallbacks for error scenarios
 */
export const safeNavigate = (navigate: NavigateFunction, path: string): boolean => {
  try {
    const sanitized = sanitizePath(path);
    console.log(`Safe navigating to: ${sanitized}`);
    navigate(sanitized);
    return true;
  } catch (error) {
    console.error("Navigation error:", error);
    toast({
      title: "Debug Info",
      description: `Navigation error: ${error instanceof Error ? error.message : String(error)}`,
      duration: 5000,
    });
    
    // Fallback for navigation errors
    try {
      window.location.href = sanitizePath(path);
      return true;
    } catch (e) {
      console.error("Critical navigation error:", e);
      window.location.href = "/";
      return false;
    }
  }
};

/**
 * Safely scrolls to an element by ID, with fallback navigation
 */
export const safeScrollToElement = (
  elementId: string, 
  navigate?: NavigateFunction, 
  fallbackPath?: string
): boolean => {
  try {
    console.log(`Attempting to scroll to element: #${elementId}`);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      console.log(`Successfully scrolled to #${elementId}`);
      return true;
    } else {
      console.warn(`Element not found: #${elementId}`);
      
      // If a fallback path and navigation function are provided, navigate there
      if (fallbackPath && navigate) {
        return safeNavigate(navigate, fallbackPath);
      }
      return false;
    }
  } catch (error) {
    console.error(`Error scrolling to #${elementId}:`, error);
    toast({
      title: "Debug Info",
      description: `Scroll error: ${error instanceof Error ? error.message : String(error)}`,
      duration: 5000,
    });
    
    // If a fallback path is provided, try to navigate there
    if (fallbackPath && navigate) {
      return safeNavigate(navigate, fallbackPath);
    }
    return false;
  }
};
