import { createBrowserRouter, Navigate } from "react-router-dom";

// Layout
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Protected Route
import ProtectedRoute from "./ProtectedRoute";

// Auth Pages
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

// Dashboard
import DashboardPage from "../pages/dashboard/DashboardPage";

// Wallet
import WalletPage from "../pages/wallet/WalletPage";

// Portofolio
import PortofolioPage from "../pages/portofolios/PortofolioPage";

// Transaction
import TransactionPage from "../pages/transaction/TransactionPage";

// Profile
import ProfilePage from "../pages/profile/ProfilePage";

// Admin
import GoldPricePage from "../pages/admin/GoldPricePage";

const router = createBrowserRouter([
    // ==========================
    // AUTH ROUTES
    // ==========================
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/",
                element: <Navigate to="/login" replace />,
            },
            {
                path: "/login",
                element: <LoginPage />,
            },
            {
                path: "/register",
                element: <RegisterPage />,
            },
        ],
    },

    // ==========================
    // PROTECTED ROUTES
    // ==========================
    {
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/dashboard",
                element: <DashboardPage />,
            },
            {
                path: "/wallet",
                element: <WalletPage />,
            },
            {
                path: "/portofolios",
                element: <PortofolioPage />,
            },
            {
                path: "/transactions",
                element: <TransactionPage />,
            },
            {
                path: "/profile",
                element: <ProfilePage />,
            },
            {
                path: "/admin/gold-prices",
                element: <GoldPricePage />,
            },
        ],
    },
]);

export default router;