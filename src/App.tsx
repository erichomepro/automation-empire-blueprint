
import React, { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import { sanitizePath } from "./lib/utils";

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
    
    // Detect mobile devices for specific debugging
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      console.log("Mobile device detected:", navigator.userAgent);
      
      // Add global error handler specifically for mobile URL errors
      window.addEventListener('error', (event) => {
        // Check if this is a URL parsing error
        if (event.message && event.message.includes("parsed as a URL")) {
          console.error("URL parsing error detected:", event.message);
          console.error("Error location:", event.filename, event.lineno, event.colno);
          
          // Display visible error for debugging
          const errorEl = document.createElement('div');
          errorEl.style.position = 'fixed';
          errorEl.style.bottom = '50px';
          errorEl.style.left = '0';
          errorEl.style.right = '0';
          errorEl.style.backgroundColor = 'rgba(255,0,0,0.8)';
          errorEl.style.color = 'white';
          errorEl.style.padding = '10px';
          errorEl.style.textAlign = 'center';
          errorEl.style.zIndex = '9999';
          errorEl.textContent = `URL Error: ${event.message}`;
          
          document.body.appendChild(errorEl);
          
          // Remove after 5 seconds
          setTimeout(() => {
            if (errorEl.parentNode) {
              errorEl.parentNode.removeChild(errorEl);
            }
          }, 5000);
          
          // Try to recover by navigating to home
          try {
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new Event('popstate'));
          } catch (e) {
            console.error("Failed to recover from URL error:", e);
          }
        }
      });
    }
    
    // Add a global error handler specifically for URL parsing errors
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
      try {
        // For string inputs, ensure they're sanitized properly
        if (typeof input === 'string') {
          input = sanitizePath(input);
        }
        return originalFetch(input, init);
      } catch (error) {
        console.error("Fetch error intercepted:", error);
        if (error instanceof TypeError && error.message.includes("URL")) {
          console.error("URL parsing error. Input was:", input);
          // Try to recover by sanitizing the URL
          if (typeof input === 'string') {
            const sanitized = sanitizePath(input);
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
          // Always sanitize URLs and ensure no backslashes
          url = sanitizePath(url);
          
          // Double check for iOS
          if (isMobile && url.includes('\\')) {
            console.error("Mobile pushState error: URL contains backslashes after sanitization:", url);
            url = '/';
          }
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
