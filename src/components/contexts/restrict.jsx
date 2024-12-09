import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Restricted = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default Restricted;
