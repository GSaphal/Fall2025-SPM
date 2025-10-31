import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export function ProtectedRoute() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("HERE", user);
  return user ? <Outlet /> : <Navigate to="/" />;
}
