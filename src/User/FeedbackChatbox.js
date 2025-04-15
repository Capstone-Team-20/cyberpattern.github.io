// src/Components/FeedbackChatbox.js
import React, { useState } from 'react';
import '../Styles/FeedbackChatbox.css';

const FeedbackChatbox = ({ onClose }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim()) {
      console.log("Bug report submitted:", message); // Replace with Supabase insert or email
      alert("Thank you for your feedback!");
      setMessage('');
      onClose();
    } else {
      alert("Please type a message.");
    }
  };

  return (
    <div className="chatbox-overlay">
      <div className="chatbox">
        <h3>🐞 Report a Bug</h3>
        <textarea
          placeholder="Describe the issue..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="chatbox-buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button className="close-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackChatbox;
