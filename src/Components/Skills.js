import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Skills.css";  // Apply RegistrationPage styles
import logo from "../Assets/Logo.png"; // Import the logo image

const SkillsPage = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState({
    CTF: false,
    "Vulnerability Simulation": false,
    "Penetration Testing": false,
    Kali: false,
    Ubuntu: false,
    "SEEDS LAB": false,
    skillLevel: 5,
  });

  const [errors, setErrors] = useState({ tools: false, vms: false });

  const handleSubmit = (e) => {
    e.preventDefault();

    const toolsSelected = skills.CTF || skills["Vulnerability Simulation"] || skills["Penetration Testing"];
    const vmsSelected = skills.Kali || skills.Ubuntu || skills["SEEDS LAB"];

    if (!toolsSelected) {
      setErrors({ tools: true, vms: false });
    } else if (!vmsSelected) {
      setErrors({ tools: false, vms: true });
    } else {
      // Proceed to the next page or submit the form
      console.log("Form submitted successfully");
      setErrors({ tools: false, vms: false });
      navigate("/mainmenu"); // Redirect to Login page
    }
  };


  return (
    <div className="page-wrapper">  {/* Apply background style */}
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>
      <div className="registration-container"> {/* Consistent container */}
        <div className="registration-content">
          <form onSubmit={handleSubmit}>
            <label><b>Which Tools Do you want to use?</b></label>
            <div className="tools-section">
              <div className="tool-option">
                <input
                  type="checkbox"
                  value="CTF"
                  checked={skills.CTF}
                  onChange={() => setSkills({ ...skills, CTF: !skills.CTF })}
                />
                <span>CTF Challenges</span>
              </div>
              <div className="tool-option">
                <input
                  type="checkbox"
                  value="Vulnerability Simulation"
                  checked={skills["Vulnerability Simulation"]}
                  onChange={() =>
                    setSkills({ ...skills, "Vulnerability Simulation": !skills["Vulnerability Simulation"] })
                  }
                />
                <span>Vulnerability Simulation</span>
              </div>
              <div className="tool-option">
                <input
                  type="checkbox"
                  value="Penetration Testing"
                  checked={skills["Penetration Testing"]}
                  onChange={() =>
                    setSkills({ ...skills, "Penetration Testing": !skills["Penetration Testing"] })
                  }
                />
                <span>Penetration Testing</span>
              </div>
              {errors.tools && <p className="error-message">Please select at least one tool.</p>}
            </div>

            <label><b>Which Virtual Machines do you want to use?</b></label>
            <div className="tools-section">
              <div className="tool-option">
                <input
                  type="checkbox"
                  value="Kali"
                  checked={skills.Kali}
                  onChange={() => setSkills({ ...skills, Kali: !skills.Kali })}
                />
                <span>Kali Linux</span>
              </div>
              <div className="tool-option">
                <input
                  type="checkbox"
                  value="Ubuntu"
                  checked={skills.Ubuntu}
                  onChange={() =>
                    setSkills({ ...skills, Ubuntu: !skills.Ubuntu })
                  }
                />
                <span>Ubuntu</span>
              </div>
              <div className="tool-option">
                <input
                  type="checkbox"
                  value="SEEDS LAB"
                  checked={skills["SEEDS LAB"]}
                  onChange={() =>
                    setSkills({ ...skills, "SEEDS LAB": !skills["SEEDS LAB"] })
                  }
                />
                <span>SEEDS LAB</span>
              </div>
              {errors.vms && <p className="error-message">Please select at least one virtual machine.</p>}
            </div>

            <label><b>What would you rate your skills?</b></label>
            <input
              type="range"
              min="1"
              max="9"
              value={skills.skillLevel}
              onChange={(e) => setSkills({ ...skills, skillLevel: e.target.value })}
            />
            
            <label><b>Skill Level: {skills.skillLevel}</b></label>
            <label><b>(1 - Beginner, 5 - Intermediate, 9 - Expert)</b></label>

            <button className="btn-secondary" type="submit"><b>SUBMIT</b></button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SkillsPage;
