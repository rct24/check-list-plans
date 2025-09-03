import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from "./App.jsx";
import MobileBlocker from "./components/MobileBlocker";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MobileBlocker>
      <App />
    </MobileBlocker>
  </StrictMode>
);
