import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function Home() {
  const [isCheckedIn, setCheckedIn] = useState(false);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [activeTab, setActiveTab] = useState("profile");
  const tabs = ["profile", "leave", "attendance"];
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
    <div className="flex flex-col lg:flex-row p-4 gap-4 min-h-screen bg-gray-50 font-sans">
      {/* Left Panel */}
      <motion.div
        className="lg:w-1/4 bg-white p-4 rounded-xl shadow-md flex flex-col items-center"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{ alignSelf: "flex-start" }}
      >
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="w-20 h-20 rounded-full mb-3"
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
              className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg text-base font-semibold shadow text-gray-800"
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
              className="w-full py-2 border-2 border-green-400 bg-transparent text-green-500 font-semibold rounded-lg hover:bg-green-100 hover:text-green text-sm transition-colors duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Check In
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setCheckedIn(false)}
              className="w-full py-2 border-2 border-red-400 bg-transparent text-red-500 font-semibold rounded-lg hover:bg-red-100 hover:text-red text-sm transition-colors duration-300"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Check Out
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Right Panel */}
      <div className="lg:w-3/4 flex flex-col gap-4 flex-1">
        {/* Greeting */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-gray-800">Hello, Abhijit</h1>
            <p className="text-gray-400 text-sm mt-1">Have a productive day!</p>
          </motion.div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                className={`p-4 rounded-xl shadow-md flex flex-col justify-between ${card.color}`}
                whileHover={{ scale: 1.03, boxShadow: "0px 4px 12px rgba(36, 32, 32, 0.15)" }}
              >
                <div className="text-2xl">{card.icon}</div>
                <div className="mt-2">
                  <p className="text-gray-700 font-semibold text-sm">{card.title}</p>
                  <p className="text-lg font-bold text-gray-900">{card.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* Tabs with Nested Routes */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex border-b border-gray-200 mb-4">
            {tabs.map((tab) => {
              const isActive = location.pathname.includes(tab);
              return (
                <Link
                  key={tab}
                  to={`/home/${tab}`}
                  className={`px-4 py-2 -mb-px font-semibold transition-colors ${isActive
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-500 hover:text-purple-600"
                    }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Link>
              );
            })}
          </div>

          {/* Nested Route Outlet */}
          <Outlet context={{ isCheckedIn, hours, minutes, secs }} />
        </div>
      </div>
    </div>
  );
}
