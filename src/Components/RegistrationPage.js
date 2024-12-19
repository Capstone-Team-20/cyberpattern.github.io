import React, { useState } from "react";
import "../Styles/RegistrationPage.css";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [skills, setSkills] = useState({
    CTF: false,
    "Vulnerability Simulation": false,
    "Penetration Testing": false,
  });

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

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== verifyPassword) {
      setPasswordMatchError("Passwords do not match.");
      return;
    }
    // Additional form submission logic...
  };

  return (
    <div className="registration-container">
      {/* Home Icon */}
      <div className="home-icon" onClick={handleHomeClick}>
        <i className="fas fa-home"></i>
      </div>

      <div className="registration-content">
        <h1>Please Enter Your Details:</h1>
        <form onSubmit={handleSignUp}>
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

          <label>What are you using this platform for?(Optional)</label>
          <input
            type="text"
            placeholder="e.g. Learning, Training, Fun, etc."
          />

          <button className="btn-primary">NEXT</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
