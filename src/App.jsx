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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Layout with nested routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="/home" element={<Home />}>
          <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfilePreview />} />
            <Route path="leave" element={<LeavePreview />} />
            <Route path="attendance" element={<AttendancePreview />} />
          </Route>
          <Route path="leave" element={<Leave />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}
