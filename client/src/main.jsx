import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { OpportunityProvider } from "./context/OpportunityContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <OpportunityProvider>
      <App />
    </OpportunityProvider>
  </AuthProvider>,
);
