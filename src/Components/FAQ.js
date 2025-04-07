import React from "react";
import "../Styles/FAQ.css"; // Optional: Add a CSS file for FAQ-specific styles

const FAQ = () => {
  return (
    <div className="faq-container">
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
  );
};

export default FAQ;