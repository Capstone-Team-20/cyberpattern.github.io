import React, { useState } from "react";
import "../Styles/LoginPage.css";
import image from "../Assets/HomePage.png"; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();  // Hook to programmatically navigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");

  // Regular expression for basic email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Handle email input change
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (emailValue && !emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle sign-in button click
  const handleSignIn = async () => {
    try {
      const response = await fetch("/fakeDatabase.json"); // Adjusted path to public directory
      if (!response.ok) {
        throw new Error("Failed to fetch the database.");
      }

      const users = await response.json();

      // Check for user by email
      const user = users.find((user) => user.email === email);

      if (!user) {
        // Email not found
        setLoginError("There is no such email registered for an account.");
      } else if (user.password !== password) {
        // Email found but password incorrect
        setLoginError("This password is incorrect, please try again!");
      } else {
        // Successful login
        setLoginError(""); // Clear any existing error message
        window.location.href = "/mainmenu"; // Proceed to main menu
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError("An error occurred while processing your request.");
    }
  };

  // Handle create account button click
  const handleCreateAccount = () => {
    navigate("/registration");
  };


  return (
    <div className="login-grid">


      <div className="form-container">
        <h1>Let's Get Started!</h1>
        <form>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="hello@someemail.com"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>}

          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="********"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span
              className="show-password"
              onClick={togglePasswordVisibility}
              title={passwordVisible ? "Hide Password" : "Show Password"}
            >
              <i
                className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}
                aria-hidden="true"
              ></i>
            </span>
          </div>

          {/* Forgot Password Button */}
          <div className="forgot-password-container">
            <button
              type="button"
              className="forgot-password-btn"
              onClick={() => alert("Redirecting to Forgot Password page...")}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={handleSignIn}
            disabled={!email || !password || emailError}
          >
            SIGN IN
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={handleCreateAccount}
          >
            CREATE AN ACCOUNT
          </button>
        </form>
        {loginError && <p className="error-message">{loginError}</p>}
      </div>

      <div className="image-container">
        <img src={image} alt="Login illustration" />
      </div>
    </div>
  );
};

export default LoginPage;
