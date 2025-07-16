import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";



const clientId=process.env.REACT_APP_GOOGLE_CLIENT_ID
console.log(clientId);

ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId={clientId}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </GoogleOAuthProvider>
)