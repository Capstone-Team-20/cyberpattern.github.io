import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/FAQ.css";
import logo from "../Assets/Logo.png";

const FAQ = () => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="about-us-wrapper">
      {/* Header with logo and home icon */}
      <img src={logo} alt="Cyber Pattern Labs Logo" className="about-us-logo" />
      <div className="home-icon" onClick={handleHomeClick}>
        <i className="fas fa-home"></i>
      </div>

      {/* Main content (now FAQ content) */}
      <div className="about-us-content">
        <h1>Frequently Asked Questions</h1>

        <div className="faq-item">
          <h3>How do I reset my password?</h3>
          <p>You can reset your password by clicking on the "Forgot Password" link on the login page.</p>
        </div>

        <div className="faq-item">
          <h3>How do I register for an account?</h3>
          <p>Click on the "Create an Account" button on the login page to register.</p>
        </div>

        <div className="faq-item">
          <h3>What should I do if I encounter an issue?</h3>
          <p>If you encounter any issues, please contact support at support@example.com.</p>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
