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
import { ToastContainer } from "react-toastify";
import ManagerLeave from "./pages/managerleave";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={4000}  // 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Layout with nested routes */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />}>
            <Route index element={<Navigate to="ppreview" replace />} />
            <Route path="ppreview" element={<ProfilePreview />} />
            <Route path="lpreview" element={<LeavePreview />} />
            <Route path="apreview" element={<AttendancePreview />} />
          </Route>
          <Route path="/dashboard/leave" element={<Leave />} />
          <Route path="/dashboard/manager-leave" element={<ManagerLeave />} />
          <Route path="attendance" element={<Attendance />} />

        </Route>

        {/* Fallback */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>

    </BrowserRouter>
  );
}
