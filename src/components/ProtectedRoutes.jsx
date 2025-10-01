import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // token check होईपर्यंत काहीही render करू नकोस
  if (loading) return null; // किंवा loader दाखवू शकतो

  if (!user || !user.token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
