import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PhishingSimulationPage from "./pages/PhishingSimulationPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

export const router = createBrowserRouter([
  // Public routes
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: (
          <div className="text-center">Password Reset Page (Coming Soon)</div>
        ),
      },
    ],
  },

  // Protected routes
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "phishing",
            element: <PhishingSimulationPage />,
          },
          {
            path: "analytics",
            element: (
              <div className="p-8">Analytics Dashboard (Coming Soon)</div>
            ),
          },
          {
            path: "users",
            element: <div className="p-8">User Management (Coming Soon)</div>,
          },
          {
            path: "settings",
            element: <div className="p-8">Settings Page (Coming Soon)</div>,
          },
          {
            path: "activity",
            element: <div className="p-8">Activity Log (Coming Soon)</div>,
          },
          {
            path: "profile",
            element: <div className="p-8">User Profile (Coming Soon)</div>,
          },
        ],
      },
    ],
  },

  // Fallback route
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
