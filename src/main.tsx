import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ProducerProvider } from './contexts/ProducerContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <ProducerProvider>
      <App />
    </ProducerProvider>
  </React.StrictMode>
);
