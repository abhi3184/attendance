import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Home() {
  const [isCheckedIn, setCheckedIn] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
 const tabs = [
  { path: "ppreview", label: "Profile" },
  { path: "lpreview", label: "Leave" },
  { path: "apreview", label: "Attendance" }
];
  const location = useLocation();

  useEffect(() => {
    let interval = null;
    if (isCheckedIn) {
      interval = setInterval(() => setSecondsElapsed((prev) => prev + 1), 1000);
    } else {
      setSecondsElapsed(0);
    }
    return () => clearInterval(interval);
  }, [isCheckedIn]);

  const formatTime = (sec) => {
    const hrs = String(Math.floor(sec / 3600)).padStart(2, "0");
    const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const secs = String(sec % 60).padStart(2, "0");
    return [hrs, mins, secs];
  };
  const [hours, minutes, secs] = formatTime(secondsElapsed);

  const cards = [
    { title: "Today Attendance", value: isCheckedIn ? "Present" : "Absent", color: "bg-green-100", icon: "🟢" },
    { title: "Pending Leaves", value: 2, color: "bg-yellow-100", icon: "🟡" },
    { title: "Projects", value: 5, color: "bg-blue-100", icon: "🔵" },
    { title: "Tasks", value: 8, color: "bg-purple-100", icon: "🟣" },
  ];

  return (
    <div className="flex flex-col lg:flex-row p-4 gap-4 h-full bg-gray-50 font-sans">

      {/* Left Panel */}
      <motion.div
        className="lg:w-1/4 bg-white p-6 rounded-xl flex flex-col items-center shadow-md"
        style={{
          maxHeight: "fit-content",
          boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
        }} // only up to Check In/Out button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="w-20 h-20 rounded-full mb-3 shadow-lg"
        />
        <h2 className="text-sm font-semibold text-gray-800 text-center">
          <span className="text-gray-500 text-sm">AO1</span> - Abhijit Deshmukh
        </h2>
        <p className="text-gray-600 text-sm mb-3 text-center">Software Engineer</p>
        <p className={`text-sm mb-4 text-center ${isCheckedIn ? "text-green-600" : "text-red-600"}`}>
          {isCheckedIn ? "Checked-in" : "Yet to check-in"}
        </p>

        {/* Timer */}
        <div className="flex gap-2 mb-4">
          {[hours, minutes, secs].map((t, idx) => (
            <div
              key={idx}
              className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg font-semibold text-gray-800 shadow-md"
            >
              {t}
            </div>
          ))}
        </div>

        {/* Check In/Out Button */}
        <div className="flex flex-col gap-3 w-full">
          {!isCheckedIn ? (
            <motion.button
              onClick={() => setCheckedIn(true)}
              className="w-full py-2 border-2 border-green-400 bg-transparent text-green-500 font-semibold rounded-lg hover:bg-green-100 hover:text-green text-sm shadow-md transition-colors duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Check In
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setCheckedIn(false)}
              className="w-full py-2 border-2 border-red-400 bg-transparent text-red-500 font-semibold rounded-lg hover:bg-red-100 hover:text-red text-sm shadow-md transition-colors duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Check Out
            </motion.button>
          )}
        </div>
      </motion.div>
      <div className="lg:w-3/4 flex flex-col gap-4 flex-1">
        <div
          className="bg-white rounded-xl p-6 flex-shrink-0 shadow-lg"
          style={{
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          }}
        >
          <motion.div className="mb-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-2xl font-bold text-gray-800">Hello, Abhijit</h1>
            <p className="text-gray-400 text-sm mt-1">Have a productive day!</p>
          </motion.div>
        </div>
        <div className="flex border-b border-gray-200 ">
          {tabs.map((tab) => {
            const isActive = location.pathname.includes(tab.path);
            return (
              <motion.div
                key={tab.label}
                whileHover={{ scale: 1.03 }} // hover animation safe
                className={`px-4 py-2 -mb-px text-sm font-semibold transition-colors ${isActive
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-500 hover:text-purple-600"
                  }`}
              >
                <Link  to={`/dashboard/home/${tab.path}`}>{tab.label}</Link>
              </motion.div>
            );
          })}
        </div>

        {/* Scrollable Outlet */}
        <div
          className="overflow-y-auto flex-1 bg-white rounded-xl p-4"
          style={{
            maxHeight: "calc(100vh - 100px - 40px)", // header + greeting + tabs height adjust करा
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
          }}
        >
          <Outlet context={{ isCheckedIn, hours, minutes, secs }} />
        </div>
      </div>



    </div>
  );
}
