import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./landing_page_hindadega";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);