import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import QueryProvider from "./providers/QueryProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryProvider>
            <App />
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </QueryProvider>
    </React.StrictMode>
);