
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
          // Always sanitize URLs
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
