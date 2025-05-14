
import React, { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, NavigateFunction } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";

// Create a URL validator helper
const sanitizePath = (path: string): string => {
  // Make sure path starts with / and doesn't contain backslashes
  if (!path) return "/";
  
  let sanitized = path.replace(/\\/g, '/');
  
  // Remove any double slashes (except for http:// or https://)
  sanitized = sanitized.replace(/([^:])\/\/+/g, '$1/');
  
  if (!sanitized.startsWith('/')) {
    sanitized = '/' + sanitized;
  }
  
  console.log(`Sanitized path from '${path}' to '${sanitized}'`);
  return sanitized;
};

// Make the sanitizePath function globally available for debugging
// @ts-ignore
window.sanitizePath = sanitizePath;

// Create a safe navigation wrapper function
const safeNavigate = (navigate: NavigateFunction, path: string) => {
  try {
    const sanitized = sanitizePath(path);
    console.log(`Safe navigating to: ${sanitized}`);
    navigate(sanitized);
    return true;
  } catch (error) {
    console.error("Navigation error:", error);
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

// Make the safeNavigate function globally available for all components
// @ts-ignore
window.safeNavigate = safeNavigate;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // Debug mobile rendering issues
  useEffect(() => {
    console.log("App component mounted");
    
    // Log viewport dimensions for debugging
    const logViewportSize = () => {
      console.log(`Viewport size: ${window.innerWidth}x${window.innerHeight}`);
    };
    
    logViewportSize();
    window.addEventListener('resize', logViewportSize);
    
    // Add a global error handler specifically for URL parsing errors
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
      try {
        return originalFetch(input, init);
      } catch (error) {
        console.error("Fetch error intercepted:", error);
        if (error instanceof TypeError && error.message.includes("URL")) {
          console.error("URL parsing error. Input was:", input);
          // Try to recover by sanitizing the URL
          if (typeof input === 'string') {
            const sanitized = input.replace(/\\/g, '/');
            console.log("Attempting recovery with sanitized URL:", sanitized);
            return originalFetch(sanitized, init);
          }
        }
        throw error;
      }
    };
    
    // Override history.pushState to sanitize URLs
    const originalPushState = window.history.pushState;
    window.history.pushState = function(state, title, url) {
      try {
        if (typeof url === 'string') {
          url = sanitizePath(url);
        }
        return originalPushState.call(this, state, title, url);
      } catch (e) {
        console.error("pushState error:", e);
        // Safe fallback
        try {
          return originalPushState.call(this, state, title, "/");
        } catch (criticalError) {
          console.error("Critical pushState error:", criticalError);
          return null;
        }
      }
    };
    
    return () => {
      window.removeEventListener('resize', logViewportSize);
      window.fetch = originalFetch;
      window.history.pushState = originalPushState;
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename="">
          <Suspense fallback={
            <div className="h-screen w-full flex items-center justify-center bg-dark text-light">
              <p>Loading...</p>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
