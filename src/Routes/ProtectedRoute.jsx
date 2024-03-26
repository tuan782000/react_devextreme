/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();
    return isLoggedIn() ? (
        <>{children}</>
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default ProtectedRoute