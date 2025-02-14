import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    //alert("로그인이 필요합니다.");
    return <Navigate to="/users/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
