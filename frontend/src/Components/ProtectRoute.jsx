import React from "react";
import { Navigate } from "react-router-dom";
const ProtectRoute = ({ children }, event) => {
  return localStorage.getItem("valid") ? children : <Navigate to={"/"} />;
};
export default ProtectRoute;
