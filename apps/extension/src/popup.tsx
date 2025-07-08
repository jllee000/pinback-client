// src/popup.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<App />);
} else {
  console.error('❌ root element not found!');
}
