import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/LoginPage.css";
import image from "../Assets/Logo.png";
import { createClient } from "@supabase/supabase-js";

// Access environment variables
const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Initialize Supabase Client
const supabase = createClient(supabaseURL, supabaseAnonKey);

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state to manage button disabling
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle the hamburger menu
  const signInButtonRef = useRef(null); // create reference to button

  // handles enter key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        signInButtonRef.current?.click();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue.toLowerCase());

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

  const handleSignIn = async () => {
    setLoading(true); // start loading once button is hit
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setLoginError(
          "We couldn't log you in. Please check your email and password and try again."
        );
        setLoading(false); // stop loading if there is an error
        return;
      }

      // set user variable with user data
      const user = data.user;

      // if user is empty
      if (!user) {
        setLoginError("Authentication failed. Please try again.");
        setLoading(false); // stop loading if there is no user data
        return;
      }

      // Check if the user already has a Skills row
      const { data: skillsData, error: skillsError } = await supabase
        .from("Skills")
        .select("auth_userID")
        .eq("auth_userID", user.id)
        .maybeSingle();

      if (skillsError) {
        console.error("Error checking Skills table:", skillsError.message);
        setLoginError("There was a problem checking your profile.");
        return;
      }

      if (!skillsData) {
        // no row in skills yet - go to skills page
        console.log("User signed in:", data.user);
        setLoginError("");
        setLoading(false);
        navigate("/skills");
      } else {
        // already set skills, go to main menu
        console.log("User signed in:", data.user);
        setLoginError("");
        setLoading(false);
        navigate("/mainmenu");
      }

    } catch (error) {
      console.error("Error:", error);
      setLoginError("An error occurred while processing your request.");
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigate("/registration");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle the menu state
  };

  return (
    <div className="page-wrapper">
      {/* Hamburger Menu */}
      <div className="hamburger-menu">
        <button className="hamburger-icon" onClick={toggleMenu}>
          &#9776; {/* Unicode for hamburger icon */}
        </button>
        {menuOpen && (
          <div className="menu-dropdown">
            <button onClick={() => navigate("/about")}>About Us</button>
            <button onClick={() => navigate("/faq")}>FAQ</button>
          </div>
        )}
      </div>

      <div className="login-grid">
        <div className="image-container">
          <img src={image} alt="Company Logo" />
        </div>
        <div className="form-container">
          <form>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
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
                  className={`fas ${
                    passwordVisible ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </span>
            </div>

            <div className="forgot-password-container">
              <button
                type="button"
                className="forgot-password-btn"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={handleSignIn}
              ref={signInButtonRef}
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
      </div>
    </div>
  );
};

export default LoginPage;
