import React, { useState, useEffect } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import AdminConsole from "../SpecialComponents/AdminConsole";
import "../../styles/AdminTab.css";

const API_URL = `${process.env.REACT_APP_API_URI}`;
axios.defaults.withCredentials = true;

const checkTokenValidity = async (setLoggedIn) => {
  try {
    const response = await axios.get(`${API_URL}/check-cookie`);
    if (response.data.valid) setLoggedIn(true);
  } catch {
    setLoggedIn(false);
  }
};

const AdminTab = ({ loggedIn, setLoggedIn }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [userVerified, setUserVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  useEffect(() => {
    checkTokenValidity(setLoggedIn);
  }, [setLoggedIn]);

  const handleEnterKey = (e, func) => {
    if (e.key === "Enter") func();
  };

  const verifyUsername = async () => {
    try {
      await axios.post(`${API_URL}/compareAdminName`, { userName });
      setUserVerified(true);
      setError("");
      setInfo("");
    } catch {
      setError("Invalid Username!");
    }
  };

  const verifyPassword = async () => {
    try {
      const response = await axios.post(`${API_URL}/compareAdminPassword`, {
        password,
      });
      if (response.data.otpSent) {
        const serverOtp = response.data.otp;
        setGeneratedOtp(serverOtp);
        sendOtpEmail(serverOtp);
        setOtpSent(true);
      }
    } catch {
      setError("Invalid Password!");
    }
  };

  const sendOtpEmail = (generatedOTP) => {
    const otpMessage = `Hey Aditya,\n\nHere is your OTP: ${generatedOTP}. It expires in 5 minutes.\n\nStay secure,\nPortfolio OTP Service`;
    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: "Portfolio OTP Service",
        from_email: "aditya.shukla@example.com",
        from_phone: "",
        message: otpMessage,
      },
      { publicKey: process.env.REACT_APP_EMAILJS_USER_ID },
    );
  };

  const sendRecoveryEmail = (recoveryTarget, recoveredUser, recoveredPassword) => {
    const message = `Hey Aditya,\n\nAs requested, here are your recovered admin credentials:\nUsername: ${recoveredUser}\nPassword: ${recoveredPassword}\n\nPlease log in and rotate them immediately from Admin Management if needed.\n\nRecovery Service`;
    return emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      {
        from_name: "Portfolio Recovery Service",
        from_email: recoveryTarget,
        from_phone: "",
        message,
      },
      { publicKey: process.env.REACT_APP_EMAILJS_USER_ID },
    );
  };

  const handleForgotCredentials = async () => {
    setError("");
    setInfo("");

    if (!recoveryEmail.trim()) {
      setError("Enter the recovery email configured in your contact/admin setup.");
      return;
    }

    try {
      const { data } = await axios.post(`${API_URL}/forgotAdminCredentials`, {
        recoveryEmail: recoveryEmail.trim(),
      });

      await sendRecoveryEmail(data.recoveryEmail, data.userName, data.password);
      setInfo(`Recovery email sent to ${data.recoveryEmail}. Check your inbox.`);
      setShowForgot(false);
      setRecoveryEmail("");
    } catch (err) {
      const message = err?.response?.data?.message || "Failed to recover admin credentials.";
      setError(message);
    }
  };

  const verifyOTP = async () => {
    try {
      await axios.post(`${API_URL}/compareOTP`, { otp, rememberMe });
      setLoggedIn(true);
      setError("");
      setInfo("");
    } catch {
      setError("Invalid or Expired OTP!");
    }
  };

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      axios.get(`${API_URL}/logout`).then(() => setLoggedIn(false));
    }
  };

  return (
    <div className="admin-tab">
      {!loggedIn ? (
        <div className="admin-login-container">
          <div className="admin-login-form">
            <h2 className="login-title">Admin Login</h2>
            {!userVerified ? (
              <>
                <input
                  id="admin-username"
                  name="admin_username"
                  type="text"
                  placeholder="Admin Username"
                  className="login-input"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  onKeyDown={(e) => handleEnterKey(e, verifyUsername)}
                />
                <button className="login-btn" onClick={verifyUsername}>
                  Verify Username
                </button>
                <button
                  type="button"
                  className="forgot-btn"
                  onClick={() => {
                    setShowForgot((prev) => !prev);
                    setError("");
                    setInfo("");
                  }}
                >
                  Forgot Username / Password?
                </button>
                {showForgot && (
                  <div className="forgot-panel">
                    <input
                      id="admin-recovery-email"
                      name="admin_recovery_email"
                      type="email"
                      placeholder="Recovery Email"
                      className="login-input"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                      onKeyDown={(e) => handleEnterKey(e, handleForgotCredentials)}
                    />
                    <button className="login-btn" type="button" onClick={handleForgotCredentials}>
                      Send Credentials To Email
                    </button>
                  </div>
                )}
              </>
            ) : !otpSent ? (
              <>
                <input
                  id="admin-password"
                  name="admin_password"
                  type="password"
                  placeholder="Admin Password"
                  className="login-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => handleEnterKey(e, verifyPassword)}
                />
                <button className="login-btn" onClick={verifyPassword}>
                  Send OTP
                </button>
              </>
            ) : (
              <>
                {generatedOtp && (
                  <p style={{ color: "#4ade80", fontSize: "0.85rem", marginBottom: "8px", textAlign: "center" }}>
                    OTP: <strong style={{ letterSpacing: "4px", fontSize: "1.1rem" }}>{generatedOtp}</strong>
                  </p>
                )}
                <input
                  id="admin-otp"
                  name="admin_otp"
                  type="text"
                  placeholder="Enter OTP"
                  className="login-input"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  onKeyDown={(e) => handleEnterKey(e, verifyOTP)}
                />
                <div className="toggle-container">
                  <label className="switch">
                    <input
                      id="admin-remember-me"
                      name="admin_remember_me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="remember-slider"></span>
                  </label>
                  <span className="toggle-label">Remember Me</span>
                </div>
                <button className="login-btn" onClick={verifyOTP}>
                  Verify OTP
                </button>
              </>
            )}
            {error && <p className="danger">{error}</p>}
            {info && <p className="success-msg">{info}</p>}
          </div>
        </div>
      ) : (
        <AdminConsole logout={logout} />
      )}
    </div>
  );
};

export default AdminTab;
