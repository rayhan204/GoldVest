import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import QueryProvider from "./providers/QueryProvider";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#0b1220",
            color: "#f6ecc8",
            fontSize: "13px",
            borderRadius: "10px",
            border: "1px solid rgba(201,162,39,0.35)",
          },
          success: {
            iconTheme: {
              primary: "#c9a227",
              secondary: "#0b1220",
            },
          },
        }}
      />
    </QueryProvider>
  </React.StrictMode>
);
