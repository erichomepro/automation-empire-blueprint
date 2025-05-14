
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

// Create a URL validator helper
const sanitizePath = (path: string): string => {
  // Make sure path starts with / and doesn't contain backslashes
  let sanitized = path.replace(/\\/g, '/');
  if (!sanitized.startsWith('/')) {
    sanitized = '/' + sanitized;
  }
  return sanitized;
};

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
    
    return () => {
      window.removeEventListener('resize', logViewportSize);
      window.fetch = originalFetch;
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
