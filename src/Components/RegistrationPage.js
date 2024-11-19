import React, { useState } from "react";
import "../Styles/RegistrationPage.css";

const RegistrationPage = () => {
  const [skills, setSkills] = useState(5);

  const passwordMatch = (password, verifyPassword) => {
    return password === verifyPassword;
  }
  
  return (
    <div className="registration-container">
      <div className="registration-content">
        <h1>Please Enter Your Details:</h1>
        <form>
          <label>Email</label>
          <input type="email" placeholder="hello@email.com" required />

          <label>Password</label>
          <input type="password" required />

          <label>Verify Password</label>
          <input type="password" required />
          
          <label>Date of Birth</label>
          <input type="date" required />

          <label>What are you using this platform for?(Optional)</label>
          <input type="text" placeholder="e.g. Learning, Training, Fun, etc." required />
          
          <label>Which Tools Do you want to use?</label>
          <input 
            type="checkbox"
            name="tools"
            value="CTF"
            /> CTF Challenges
            <input
            type="checkbox"
            name = "tools"
            value="Vulnerability Simulation"
            /> Vulnerability Simulation
            <input
            type="checkbox"
            name = "tools"
            value="Penetration Testing"
            /> Penetration Testing

          <button className="btn-primary">NEXT</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
