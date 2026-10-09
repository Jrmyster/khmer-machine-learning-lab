import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/kantumruy-pro/khmer-400.css";
import "@fontsource/kantumruy-pro/khmer-600.css";
import "@fontsource/kantumruy-pro/latin-400.css";
import "@fontsource/kantumruy-pro/latin-600.css";
import "./styles.css";
import { MachineLearningGuide } from "./components/MachineLearningGuide";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MachineLearningGuide />
  </StrictMode>,
);
