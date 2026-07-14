import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// We wait for the DOM to be fully loaded to ensure the element exists.
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('root');
  if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error('canvas-container not found');
  }
});
