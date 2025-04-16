import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../Styles/Setup.css";  // Apply the same styles as RegistrationPage
import logo from "../Assets/Logo.png"; // Import the logo image
import { createClient } from "@supabase/supabase-js";

// Access environment variables
const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Initialize Supabase Client
const supabase = createClient(supabaseURL, supabaseAnonKey);

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailChange = (e) => {
    const emailValue = e.target.value; // Keep the email as entered
    setEmail(emailValue);
    if (emailValue && !emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handleHomeClick = () => {
    navigate("/"); // Redirect to Login page
  };

  const handleResetPassword = async () => {
    if (!email || emailError) return;

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:3000/reset-password", // ✅ your reset page route
      });
      if (error) throw error;
      setMessage("If this email is registered, you will receive password reset instructions.");
    } catch (error) {
      setEmailError("Something went wrong. Please try again later.");
    }
  };


  return (
    <div className="page-wrapper">  {/* Apply the same wrapper style */}
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>
      <div className="registration-container"> {/* Same container style */}
        {/* Home Icon */}
        <div className="home-icon" onClick={handleHomeClick}>
          <i className="fas fa-home"></i>
        </div>

        <div className="registration-content">
          <h1>Forgot Password</h1>
          <p>Enter your email to receive a password reset link</p>
          <form>
            <input
              type="email"
              id="email"
              placeholder="Valid Email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            {emailError && <p className="error-message">{emailError}</p>}
            {message && <p className="success-message">{message}</p>}

            <button
              type="button"
              className="btn-secondary"
              onClick={handleResetPassword}
              disabled={!email || emailError}
            >
              SEND RESET LINK
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
    </div>
  );
};

export default ForgotPassword;
