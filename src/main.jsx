import { createRoot } from "react-dom/client";
import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import React from "react";

const engine = new Styletron();

createRoot(document.getElementById("root")).render(
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <App />
      <Toaster />
    </BaseProvider>
  </StyletronProvider>
);
