import * as React from "react";
import AppRoutes from "./routes";
import { AuthProvider } from "./services/AuthContext";

export default function App() {
  return (
    <AuthProvider> {/* Envolvendo AppRoutes com AuthProvider */}
      <AppRoutes />
    </AuthProvider>
  );
}
