
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// For debugging blank screen issues
console.log("Main.tsx is executing");

// Error boundary for better error visualization, especially on mobile
const renderApp = () => {
  try {
    console.log("Attempting to render the app");
    
    // Create root with error handling
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      console.error("Failed to find the root element");
      document.body.innerHTML = '<div style="color:white;padding:20px;">Failed to initialize the application. Please refresh the page.</div>';
    } else {
      console.log("Root element found, rendering App");
      
      // Add a basic fallback in case React fails to render
      rootElement.innerHTML = '<div id="app-loading" style="display:flex;justify-content:center;align-items:center;height:100vh;color:white;text-align:center;padding:20px;">Loading application...</div>';
      
      const root = createRoot(rootElement);
      root.render(<App />);
      
      // If we get here, React has started rendering
      console.log("React rendering started");
      
      // Remove loading indicator after a delay
      setTimeout(() => {
        const loadingElement = document.getElementById("app-loading");
        if (loadingElement) {
          loadingElement.style.display = "none";
        }
      }, 1000);
    }
  } catch (error) {
    console.error("Critical rendering error:", error);
    // Show error visibly on screen for mobile debugging
    document.body.innerHTML = `
      <div style="color:white;padding:20px;text-align:center;">
        <h2>Something went wrong</h2>
        <p>Please try refreshing the page</p>
        <p style="font-size:12px;margin-top:20px;color:#888;">Error details: ${error instanceof Error ? error.message : 'Unknown error'}</p>
      </div>
    `;
  }
};

// Initialize with a delay to ensure DOM is fully ready
window.addEventListener('DOMContentLoaded', () => {
  console.log("DOM fully loaded");
  renderApp();
});

// Add global error handler for uncaught exceptions
window.addEventListener('error', (event) => {
  console.error("Global error caught:", event.error);
  const rootElement = document.getElementById("root");
  if (rootElement && rootElement.innerHTML === '') {
    rootElement.innerHTML = `
      <div style="color:white;padding:20px;text-align:center;">
        <h2>Application Error</h2>
        <p>Please refresh the page</p>
        <p style="font-size:12px;margin-top:20px;color:#888;">Error: ${event.message}</p>
      </div>
    `;
  }
});
