import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Homepage from "./pages/homepage.jsx";
import Booking from "./pages/booking.jsx";
import AdminLoginModal from "./pages/adminmodal.jsx";
import Dashboard from "./pages/dashboard.jsx";
import WelcomePage from "./pages/welc.jsx";

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("user");

  return isAuth ? children : <Navigate to="/" />;
}

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));


  
  return user?.role === "admin"
    ? children
    : <Navigate to="/home" />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/welcome" element={<WelcomePage />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTE */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}