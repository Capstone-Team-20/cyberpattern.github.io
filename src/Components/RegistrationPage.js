import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Setup.css";
import logo from "../Assets/Logo.png"; // Import the logo image
import { createClient } from "@supabase/supabase-js";

// Access environment variables
const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Initialize Supabase Client
const supabase = createClient(supabaseURL, supabaseAnonKey);

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [purpose, setPurpose] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const handleHomeClick = () => {
    navigate("/"); // Redirect to Login page
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

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    if (e.target.value) {
      setFirstNameError("");
    }
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    if (e.target.value) {
      setLastNameError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value && /\S+@\S+\.\S+/.test(e.target.value)) {
      setEmailError("");
    }
  };

  const handleNextClick = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!firstName) {
      setFirstNameError("Please enter your first name.");
      return;
    }
    if (!lastName) {
      setLastNameError("Please enter your last name.");
      return;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== verifyPassword) {
      setPasswordMatchError("Passwords do not match.");
      return;
    }

    try {

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            firstName: firstName,
            lastName: lastName,
            purpose: purpose
          }
        }
      });

      if (error) {
        console.error('Error inserting data:', error);
        alert("Error signing up.");
      } else {
        console.log('Data inserted:', data);
        alert("Check your email for the verification link!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message);
    }
  };


  return (
    <div className="page-wrapper">
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>
      <div className="registration-container">
        {/* Home Icon */}
        <div className="home-icon" onClick={handleHomeClick}>
          <i className="fas fa-home"></i>
        </div>

        <div className="registration-content">
          <h1>Please Enter Your Details:</h1>
          <form>
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
              required
            />
            {firstNameError && <p className="error-message">{firstNameError}</p>}

            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
              required
            />
            {lastNameError && <p className="error-message">{lastNameError}</p>}

            <label>Email</label>
            <input
              type="email"
              placeholder="Valid Email Address"
              value={email}
              onChange={handleEmailChange}
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

            <label>What are you using this platform for? (Optional)</label>
            <input
              type="text"
              placeholder="e.g. Learning, Training, Fun, etc."
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
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
    </div>
  );
};

export default RegistrationPage;
