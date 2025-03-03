import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { createClient } from "@supabase/supabase-js";
import "../Styles/Setup.css";  // Apply RegistrationPage styles
import logo from "../Assets/Logo.png"; // Import the logo image

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
    } else {
      setPasswordError("");
    }
    if (e.target.value !== verifyPassword) {
      setPasswordMatchError("Passwords do not match.");
    } else {
      setPasswordMatchError("");
    }
  };

  const handleVerifyPasswordChange = (e) => {
    setVerifyPassword(e.target.value);
    if (password !== e.target.value) {
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

    // Uncomment when integrating Supabase password reset
    // try {
    //   const { error } = await supabase.auth.updateUser({ password });
    //   if (error) throw error;
    //   setShowPopup(true);
    // } catch (error) {
    //   setPasswordError("Something went wrong. Please try again later.");
    // }
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate("/");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="page-wrapper">  {/* Background styling */}
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>
      <div className="registration-container"> {/* Matching container style */}
        {/* Home Icon */}
        <div className="home-icon" onClick={handleHomeClick}>
          <i className="fas fa-home"></i>
        </div>

        <div className="registration-content">
          <h1>Reset Your Password</h1>
          <p>Enter your new password below.</p>
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
              disabled={!password || !verifyPassword || passwordError || passwordMatchError}
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

      {/* Popup for password reset success */}
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
