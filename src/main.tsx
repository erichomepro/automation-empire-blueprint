
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root with error handling
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Failed to find the root element");
  document.body.innerHTML = '<div style="color:white;padding:20px;">Failed to initialize the application. Please refresh the page.</div>';
} else {
  createRoot(rootElement).render(<App />);
}
