import React from "react";
import "../Styles/AboutUs.css"; // Import the CSS file for styling
import logo from "../Assets/Logo.png"; // Import the logo image

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Logo at the top center */}
      <div className="logo-container">
        <img src={logo} alt="Company Logo" className="about-us-logo" />
      </div>

      <h1>About Us</h1>
      <h2>Our Mission</h2>
      <p>
        Our mission is to empower undergraduate students by breaking down the barriers to accessing cybersecurity
        training. We aim to provide a free, virtual lab environment where students can safely practice
        ethical hacking, simulate real-world cyberattacks, and gain hands-on experience. Through structured,
        step-by-step scenarios, we bridge the gap between theoretical knowledge and practical application,
        enabling students to build essential cybersecurity skills. By eliminating financial and skill-based
        obstacles, we strive to prepare the next generation of cybersecurity professionals for the workforce.
      </p>
    </div>
  );
};

export default AboutUs;