import React, { useState } from "react";
import "../Styles/LoginPage.css";
import image from "../Assets/HomePage.png"; // Adjust the path as needed

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState(""); // State for email error message

  // Regular expression for basic email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Handle email input change
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Check if the email matches the regex pattern
    if (emailValue && !emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError(""); // Clear error if email is valid
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
  const handleSignIn = () => {
    // If both fields are valid
    if (email && password && !emailError) {
      // Proceed to Main Menu
      window.location.href = "/mainmenu"; // Use path for routing
    } else {
      alert("Please fill in both email and password correctly.");
    }
  };

  // Handle create account button click
  const handleCreateAccount = () => {
    window.location.href = "/registration"; // Navigate to registration page
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
            value={email} // Controlled input for email
            onChange={handleEmailChange}
            required
          />
          {emailError && <p className="error-message">{emailError}</p>} {/* Display error if email is invalid */}

          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              placeholder="********"
              value={password} // Controlled input for password
              onChange={handlePasswordChange}
              required
            />
            <span
              className="show-password"
              onClick={togglePasswordVisibility}
              title={passwordVisible ? "Hide Password" : "Show Password"}
            >
              <i
                className={passwordVisible ? "fas fa-eye-slash" : "fas fa-eye"}
                aria-hidden="true"
              ></i>
            </span>
          </div>

          {/* Disable the Sign In button if either field is empty or email is invalid */}
          <button
            type="button"
            className="btn-primary"
            onClick={handleSignIn}
            disabled={!email || !password || emailError} // Button is disabled if email, password are empty or email is invalid
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
      </div>

      <div className="image-container">
        <img src={image} alt="Login illustration" />
      </div>
    </div>
  );
};

export default LoginPage;
