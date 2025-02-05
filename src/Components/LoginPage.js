import React, { useState } from "react";
import "../Styles/LoginPage.css";
import image from "../Assets/HomePage.png"; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';  // Make sure to import useNavigate
import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

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
    setEmail(emailValue);

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
      // Fetch the user from the Supabase "Users" table
      const { data: users, error } = await supabase
        .from("Users")
        .select("*")
        .eq("email", email);

      if (error) {
        throw new Error("Failed to fetch user data from Supabase.");
      }

      if (users.length === 0) {
        // Email not found
        setLoginError("There is no such email registered for an account.");
      } else {
        const user = users[0]; // email is unique so first response should be correct
        if (user.password !== password) {
          // Email found but password incorrect
          setLoginError("This password is incorrect, please try again!");
        } else {
          // Successful login
          setLoginError(""); // Clear any existing error message
          navigate("/mainmenu"); // Redirect to the main menu
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
