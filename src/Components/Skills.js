import React, { useState } from "react";
import "../Styles/RegistrationPage.css";

const RegistrationPage = () => {
  const [skills, setSkills] = useState(5);


  
  return (
    <div className="registration-container">
      <div className="registration-content">
        <h1><u>Please Enter Your Details:</u></h1>
        <form>
        <label>Which Tools Do you want to use?</label>
          <div className="tools-section">
            <div className="tool-option">
              <input
                type="checkbox"
                name="tools"
                value="CTF"
                checked={skills.CTF}
                onChange={() => setSkills({ ...skills, CTF: !skills.CTF })}
              />
              <span>CTF Challenges</span>
            </div>
            <div className="tool-option">
              <input
                type="checkbox"
                name="tools"
                value="Vulnerability Simulation"
                checked={skills["Vulnerability Simulation"]}
                onChange={() =>
                  setSkills({
                    ...skills,
                    "Vulnerability Simulation": !skills["Vulnerability Simulation"],
                  })
                }
              />
              <span>Vulnerability Simulation</span>
            </div>
            <div className="tool-option">
              <input
                type="checkbox"
                name="tools"
                value="Penetration Testing"
                checked={skills["Penetration Testing"]}
                onChange={() =>
                  setSkills({
                    ...skills,
                    "Penetration Testing": !skills["Penetration Testing"],
                  })
                }
              />
              <span>Penetration Testing</span>
            </div>
          </div>

{/* Virtual Machines */}

          <label>Which Virtual Machines do you want to use?</label>
          <div className="tools-section">
            <div className="tool-option">
              <input
                type="checkbox"
                name="tools"
                value="Kali"
                checked={skills.Kali}
                onChange={() => setSkills({ ...skills, Kali: !skills.Kali })}
              />
              <span>Kali Linux</span>
            </div>
            <div className="tool-option">
              <input
                type="checkbox"
                name="tools"
                value="Ubuntu"
                checked={skills["Ubuntu"]}
                onChange={() =>
                  setSkills({
                    ...skills,
                    "Ubuntu": !skills["Ubuntu"],
                  })
                }
              />
              <span>Ubuntu</span>
            </div>
            <div className="tool-option">
              <input
                type="checkbox"
                name="tools"
                value="SEEDS LAB"
                checked={skills["SEEDS LAB"]}
                onChange={() =>
                  setSkills({
                    ...skills,
                    "SEEDS LAB": !skills["SEEDS LAB"],
                  })
                }
              />
              <span>SEEDS LAB</span>
            </div>
          </div>

          <label>What would you rate your skills?</label>
          <input
            type="range"
            min="1"
            max="9"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          
          <p>Skill Level: {skills}</p>
          <label>(1- Beginner, 5- Intermediate, 9- Expert)</label>

          <button className="btn-primary">SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
