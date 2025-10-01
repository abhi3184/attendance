// ProfileDrawer.js
import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import ProfileImage from "../assets/logo/new_color_logo.png";

export default function ProfileDrawer({ isOpen, setIsOpen }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Drawer */}
          <motion.div
            className="fixed top-4 right-4 z-50 w-72 bg-white shadow-lg flex flex-col rounded-xl"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-1 rounded hover:bg-gray-100"
            >
              <XMarkIcon className="h-5 w-5 text-gray-700" />
            </button>

            <div className="flex items-center gap-3 p-4">
              <img
                src={ProfileImage}
                alt="Profile"
                className="h-12 w-12 rounded-full border border-gray-200 shadow-sm"
              />
              <div>
                <p className="font-semibold text-gray-800 text-sm">Abhijit Dinkar Deshmukh</p>
                <p className="text-xs text-gray-500">Manager</p>
                <p className="text-xs text-gray-500">abhijit@example.com</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mx-4 mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-sm font-medium mt-auto"
            >
              Logout
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}