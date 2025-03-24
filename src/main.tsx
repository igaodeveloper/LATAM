import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./styles/animations.css";
import { BrowserRouter } from "react-router-dom";

const basename = import.meta.env.VITE_BASE_PATH || '/';
const isDevelopment = import.meta.env.MODE === 'development';

// Log de informações apenas em desenvolvimento
if (isDevelopment) {
  console.log('Running in development mode');
  console.log('Base URL:', basename);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
