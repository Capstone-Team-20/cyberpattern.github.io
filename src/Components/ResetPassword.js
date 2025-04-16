import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Setup.css";
import logo from "../Assets/Logo.png";
import { createClient } from "@supabase/supabase-js";

// Supabase credentials from environment variables
const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseURL, supabaseAnonKey);

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Grabs token from URL hash (after Supabase email link)
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      const params = new URLSearchParams(hash.substring(1));
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (access_token && refresh_token) {
        supabase.auth.setSession({ access_token, refresh_token }).then(() => {
          console.log("Session set successfully!");
        });
      } else {
        console.log("Tokens not found.");
      }
    } else {
      console.log("No access token in URL.");
    }
  }, []);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError("");
    }
    if (value !== verifyPassword) {
      setPasswordMatchError("Passwords do not match.");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleVerifyPasswordChange = (e) => {
    const value = e.target.value;
    setVerifyPassword(value);
    if (value !== password) {
      setPasswordMatchError("Passwords do not match.");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleResetPassword = async () => {
    if (!password || password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== verifyPassword) {
      setPasswordMatchError("Passwords do not match.");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setShowPopup(true);
    } catch (error) {
      console.error("Password reset error:", error.message);
      setPasswordError("Something went wrong. Please try again later.");
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="page-wrapper">
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>
      <div className="registration-container">
        <div className="home-icon" onClick={handleHomeClick}>
          <i className="fas fa-home"></i>
        </div>

        <div className="registration-content">
          <h1>Reset Your Password</h1>
          <form>
            <label>New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {passwordError && <p className="error-message">{passwordError}</p>}

            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={verifyPassword}
              onChange={handleVerifyPasswordChange}
              required
            />
            {passwordMatchError && (
              <p className="error-message">{passwordMatchError}</p>
            )}

            <button
              type="button"
              className="btn-secondary"
              onClick={handleResetPassword}
              disabled={
                !password ||
                !verifyPassword ||
                passwordError ||
                passwordMatchError
              }
            >
              RESET PASSWORD
            </button>

            <button
              type="button"
              className="btn-primary"
              onClick={handleHomeClick}
            >
              BACK TO LOGIN
            </button>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Your password has successfully been updated.</p>
            <button onClick={handlePopupClose}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
