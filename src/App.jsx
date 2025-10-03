import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/MainLayout";
import PrivateRoute from "./components/ProtectedRoutes";
import RoleRedirect from "./components/Roleredirect";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = lazy(() => import("./auth/Login"));
const Home = lazy(() => import("./pages/employee/Home"));
const Leave = lazy(() => import("./pages/employee/Leave"));
const Attendance = lazy(() => import("./pages/employee/Attendance"));
const ManagerDashboard = lazy(() => import("./pages/manager/ManagerDashbord"));
const ManagerLeave = lazy(() => import("./pages/manager/ManagerLeave"));
const TeamOverview = lazy(() => import("./pages/manager/TeamOverview"));
const ManagerAttendance = lazy(() => import("./pages/manager/ManagerAttendance"));
const EmployeeManagement = lazy(() => import("./pages/hr/EmployeeManagement"));
const LeaveRequests = lazy(() => import("./pages/hr/LeaveRequest"));
const HrAttendance = lazy(() => import("./pages/hr/HrAttendance"));
const Payroll = lazy(() => import("./pages/hr/PayrollManage"));
const Holiday = lazy(() => import("./pages/hr/Holidays"));

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<RoleRedirect />} />
            <Route path="home" element={<Home />} />
            <Route path="leave" element={<Leave />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="mhome" element={<ManagerDashboard />} />
            <Route path="mleave" element={<ManagerLeave />} />
            <Route path="overview" element={<TeamOverview />} />
            <Route path="mattendance" element={<ManagerAttendance />} />
            <Route path="emanagement" element={<EmployeeManagement />} />
            <Route path="eleave" element={<LeaveRequests />} />
            <Route path="hattendance" element={<HrAttendance />} />
            <Route path="payroll" element={<Payroll />} />
            <Route path="holiday" element={<Holiday />} />
          </Route>

          <Route path="*" element={<div>404 - page not found</div>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
