import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeWrapper from "./theme/ThemeWrapper";
import { CameraStatusProvider } from "./components/context/CameraStatusContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeWrapper>
      <CameraStatusProvider>
        <App />
      </CameraStatusProvider>     
    </ThemeWrapper>
  </React.StrictMode>
);

