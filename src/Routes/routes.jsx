import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegiaterPage/RegisterPage";
import ProductPage from "../pages/ProductPage/ProductPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
            {
                path: 'register',
                element: <RegisterPage />,
            },
            {
                path: 'product',
                element: (
                    <ProtectedRoute>
                        <ProductPage />
                    </ProtectedRoute>
                ),
            },
        ]
    }
])