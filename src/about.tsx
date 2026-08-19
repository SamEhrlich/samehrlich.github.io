import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AboutPage from './AboutPage';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AboutPage />
  </React.StrictMode>
);
