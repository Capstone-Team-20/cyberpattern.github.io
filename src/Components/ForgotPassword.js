import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { createClient } from "@supabase/supabase-js";
import "../Styles/Setup.css";  // Apply the same styles as RegistrationPage
import logo from "../Assets/Logo.png"; // Import the logo image

// Initialize Supabase Client
const supabaseURL = "https://kdzamdxnnnzodftvjcrh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkemFtZHhubm56b2RmdHZqY3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NzA5NzIsImV4cCI6MjA1MzI0Njk3Mn0.0Ml4p6x7VDY2m5_t2ISl0aEYpEum-vD8uFL1BYxBaes";
const supabase = createClient(supabaseURL, supabaseAnonKey);

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailChange = (e) => {
    const emailValue = e.target.value.toUpperCase(); // Convert to uppercase like in RegistrationPage
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
      const { error } = await supabase.auth.resetPasswordForEmail(email);
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
              placeholder="USER@SOMEEMAIL.COM"
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
