import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/login.css";
import App from "./app.jsx";

createRoot(document.getElementById("root")).render( //the skeleton im the head
   <StrictMode> 
    <App />
  </StrictMode>
);