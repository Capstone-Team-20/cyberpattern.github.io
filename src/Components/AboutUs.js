import React from "react";
import "../Styles/AboutUs.css";
import logo from "../Assets/Logo.png";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
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

      {/* Main content */}
      <div className="about-us-content">
        <h1>About Us</h1>
        <h2>Our Mission</h2>
        <p>
          Our mission is to empower undergraduate students by breaking down the
          barriers to accessing cybersecurity training. We aim to provide a
          free, virtual lab environment where students can safely practice
          ethical hacking, simulate real-world cyberattacks, and gain hands-on
          experience. Through structured, step-by-step scenarios, we bridge the
          gap between theoretical knowledge and practical application, enabling
          students to build essential cybersecurity skills. By eliminating
          financial and skill-based obstacles, we strive to prepare the next
          generation of cybersecurity professionals for the workforce.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
