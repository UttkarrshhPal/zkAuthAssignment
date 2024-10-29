import React from "react";
import ReactDOM from "react-dom/client"; // Ensure ReactDOM is imported correctly
import App from "./App";
import "./index.css";
import init from "./pkg/zk_wasm.js"; // Import the default WASM init function

// Initialize WASM before rendering the app
init()
  .then(() => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App />);
  })
  .catch((error) => {
    console.error("Failed to initialize WebAssembly:", error);
  });
