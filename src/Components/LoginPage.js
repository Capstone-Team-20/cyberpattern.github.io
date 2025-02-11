import React, { useState } from "react";
import "../Styles/LoginPage.css";
import image from "../Assets/HomePage.png"; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';  // Make sure to import useNavigate
import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://kdzamdxnnnzodftvjcrh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkemFtZHhubm56b2RmdHZqY3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc2NzA5NzIsImV4cCI6MjA1MzI0Njk3Mn0.0Ml4p6x7VDY2m5_t2ISl0aEYpEum-vD8uFL1BYxBaes";
const supabase = createClient(supabaseURL, supabaseAnonKey);

const LoginPage = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");

  // Regular expression for basic email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue.toLowerCase()); // Display in lowercase
  
    if (emailValue && !emailRegex.test(emailValue)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Updated sign-in logic using Supabase
  const handleSignIn = async () => {
    try {
      const upperCaseEmail = email.toUpperCase(); // Store as uppercase
  
      const { data: users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", upperCaseEmail); // Query with uppercase
  
      if (error) {
        throw new Error("Failed to fetch user data from Supabase.");
      }
  
      if (users.length === 0) {
        setLoginError("There is no such email registered for an account.");
      } else {
        const user = users[0];
        if (user.password !== password) {
          setLoginError("This password is incorrect, please try again!");
        } else {
          setLoginError("");
          navigate("/skills");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginError("An error occurred while processing your request.");
    }
  };

  const handleCreateAccount = () => {
    navigate("/registration");
  };

  return (
    <div className="login-grid">
      <div className="form-container">
        <h1>Welcome to Cyber PATTerN Labs</h1>
        <form>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="hello@email.com"
            value={email}
            onChange={handleEmailChange}
            onInput={(e) => e.target.value = e.target.value.toUpperCase()}
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

          <div className="forgot-password-container">
            <button
              type="button"
              className="forgot-password-btn"
              onClick={() => navigate("/forgot-password")} // This redirects to Forgot Password page
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
