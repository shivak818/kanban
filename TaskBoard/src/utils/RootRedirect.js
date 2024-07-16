import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const RootRedirect = () => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? (
        <Navigate to="/taskboard" />
    ) : (
        <Navigate to="/login" />
    );
};

export default RootRedirect;
