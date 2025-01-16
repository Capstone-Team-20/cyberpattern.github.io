import React, { useState } from "react";
import "../Styles/RegistrationPage.css";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleHomeClick = () => {
    window.location.href = "/"; // Redirect to Login page
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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

  const handleNextClick = (e) => {
    e.preventDefault();

    // Validate Email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError("");
    }

    // Validate Password
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    } else {
      setPasswordError("");
    }

    // Check if passwords match
    if (password !== verifyPassword) {
      setPasswordMatchError("Passwords do not match.");
      return;
    } else {
      setPasswordMatchError("");
    }

    // If all validations pass, redirect to the Skills page
    window.location.href = "/skills";
  };

  return (
    <div className="registration-container">
      {/* Home Icon */}
      <div className="home-icon" onClick={handleHomeClick}>
        <i className="fas fa-home"></i>
      </div>

      <div className="registration-content">
        <h1>Please Enter Your Details:</h1>
        <form>
          <label>Email</label>
          <input
            type="email"
            placeholder="hello@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          {passwordError && <p className="error-message">{passwordError}</p>}

          <label>Verify Password</label>
          <input
            type="password"
            value={verifyPassword}
            onChange={handleVerifyPasswordChange}
            required
          />
          {passwordMatchError && (
            <p className="error-message">{passwordMatchError}</p>
          )}

          <label>Date of Birth</label>
          <input type="date" required />

          <label>What are you using this platform for? (Optional)</label>
          <input
            type="text"
            placeholder="e.g. Learning, Training, Fun, etc."
          />

          <button
            type="button"
            className="btn-secondary"
            onClick={handleNextClick}
          >
            NEXT
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
