import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/MainLayout";
import Home from "./pages/Home";
import Leave from "./pages/Leave";
import Attendance from "./pages/Attendance";
import Login from "./auth/Login";
import ProfilePreview from "./pages/Profile-preview";
import LeavePreview from "./pages/Leave-preview";
import AttendancePreview from "./pages/Attendance-preview";
import ManagerLeave from "./pages/managerleave";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/ProtectedRoutes"; // import the component
import ManagerDashboard from "./pages/ManagerDashbord";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />}>
            <Route index element={<Navigate to="ppreview" replace />} />
            <Route path="ppreview" element={<ProfilePreview />} />
            <Route path="lpreview" element={<LeavePreview />} />
            <Route path="apreview" element={<AttendancePreview />} />
          </Route>
          <Route path="leave" element={<Leave />} />
          <Route path="manager-leave" element={<ManagerLeave />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="mhome" element={<ManagerDashboard />} />
        </Route>

        <Route path="*" element={<div>404 - page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
