import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ForgotPassword from "./ForgetPassword";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=username, 2=password, 3=forgot password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameSubmit = () => {
    if (!username.trim()) return;
    setStep(2);
  };

  const handleLogin = () => {
    navigate("/home");
  };

  const handleForgotPassword = () => {
    setStep(3);
  };

  const handleBackToLogin = () => {
    setStep(2);
  };

  return (
    <div className="login-page">
      <div className="login-left"></div>

      <div className="login-right">
        {step === 3 ? (
          <ForgotPassword email={username} onBack={handleBackToLogin} />
        ) : (
          <motion.div
            className="login-form"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2>Sign In</h2>

            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                <label htmlFor="username">Username</label>
                <motion.input
                  type="text"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  whileFocus={{ scale: 1.02 }}
                />
                <motion.button
                  onClick={() => navigate("/home")}
                  whileHover={{ scale: 1.03, boxShadow: "0px 4px 12px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Next
                </motion.button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
                <p className="text-sm mb-2 text-gray-600">Hello, <strong>{username}</strong></p>

                <label htmlFor="password">Password</label>
                <motion.input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  whileFocus={{ scale: 1.02 }}
                />

                <motion.button
                  onClick={() => console.log("/home")}
                  whileHover={{ scale: 1.03, boxShadow: "0px 4px 12px rgba(0,0,0,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  Login
                </motion.button>

                <span className="forgot-password" onClick={handleForgotPassword}>
                  Forgot Password?
                </span>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
