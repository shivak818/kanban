// utils/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PublicRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Navigate to="/taskboard" /> : element;
};

export default PublicRoute;
