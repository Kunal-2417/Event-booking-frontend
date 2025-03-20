// import { useSelector } from "react-redux";
import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import Popup from "./Popup"; // Assuming you have a Popup component

const ProtectedRoute = ({ children }) => {
  // const user = useSelector((state) => state.auth.user);
  const { user } = useAuth();
  
  if (!user) {
    <Popup
      message="Please log in to access this page."
      />
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
