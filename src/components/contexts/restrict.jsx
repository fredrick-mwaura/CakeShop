import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";
import PropTypes from "prop-types";

const Restricted = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Redirect authenticated users to the home page
  if (isAuthenticated) {
    return <Navigate to="/" replace />; // "replace" ensures no unnecessary history entry
  }

  // Render children for unauthenticated users
  return children;
};

Restricted.propTypes = {
  children: PropTypes.node.isRequired, // Ensures proper validation for children
};

export default Restricted;
