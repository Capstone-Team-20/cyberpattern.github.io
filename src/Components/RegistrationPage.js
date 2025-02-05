import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";  // Import Supabase client
import "../Styles/RegistrationPage.css";

const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

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

    // Validate First Name
    if (!firstName) {
      setFirstNameError("Please enter your first name.");
      return;
    }

    // Validate Last Name
    if (!lastName) {
      setLastNameError("Please enter your last name.");
      return;
    }

    // Validate Email
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    // Validate Password
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long.");
      return;
    }

    // Check if passwords match
    if (password !== verifyPassword) {
      setPasswordMatchError("Passwords do not match.");
      return;
    }

    // Check for existing email
    const { data } = await supabase
      .from("Users")
      .select("*")
      .eq("email", email);

    if (data && data.length > 0) {
      setEmailError("Email is already in use.");
      return;
    }

    try {
      // Insert Data into Supabase
      const { user, error: insertError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (insertError) {
        console.error('Error signing up:', insertError.message);
        alert("Error signing up.");
      } else {
        console.log('User signed up:', user);

        // Send verification email
        const { error: verifyError } = await supabase.auth.api.sendVerificationEmail(
          email
        );

        if (verifyError) {
          console.error("Error sending verification email:", verifyError.message);
          alert("Error sending verification email.");
        } else {
          alert("Check your email for the verification link!");
          navigate("/"); // Redirect to login page
        }
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert(error.message);
    }
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
            placeholder="hello@email.com"
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
