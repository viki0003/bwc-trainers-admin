import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./APIContext/LoginContext";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
  <BrowserRouter>
   <LoginProvider>
    <App />
    </LoginProvider>
  </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();