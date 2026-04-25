import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

/**
 * Initialize and render the React application.
 * This function can be imported in tests to verify rendering behavior.
 */
function initializeApp() {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error('Root element not found');
  }
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Auto-initialize when this script is executed in a browser environment.
if (typeof document !== 'undefined') {
  initializeApp();
}

export { initializeApp };
