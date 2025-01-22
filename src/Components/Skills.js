import React, { useState } from "react";

const SkillsPage = () => {
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
      window.location.href = "/"; // Redirect to Login page
    }
  };

  const handleBackClick = () => {
    window.location.href = "/registration"; // Redirect to Registration page
  };

  return (
    <div className="registration-container">
      <div className="registration-content">
        <h1><u>Please Enter Your Details:</u></h1>
        <form onSubmit={handleSubmit}>
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
              <span style={{ position: 'relative', top: '-7px', marginLeft: '10px' }}>CTF Challenges</span>
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
              <span style={{ position: 'relative', top: '-7px', marginLeft: '10px' }}>Vulnerability Simulation</span>
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
              <span style={{ position: 'relative', top: '-7px', marginLeft: '10px' }}>Penetration Testing</span>
            </div>
          {errors.tools && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>Please select at least one tool.</p>}
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
              <span style={{ position: 'relative', top: '-7px', marginLeft: '10px' }}>Kali Linux</span>
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
              <span style={{ position: 'relative', top: '-7px', marginLeft: '10px' }}>Ubuntu</span>
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
              <span style={{ position: 'relative', top: '-7px', marginLeft: '10px' }}>SEEDS LAB</span>
            </div>
          {errors.vms && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>Please select at least one virtual machine.</p>}
          </div>
          <label>What would you rate your skills?</label>
          <input
            type="range"
            min="1"
            max="9"
            value={skills.skillLevel}
            onChange={(e) => setSkills({ ...skills, skillLevel: e.target.value })}
          />
          
          <p>Skill Level: {skills.skillLevel}</p>
          <label>(1- Beginner, 5- Intermediate, 9- Expert)</label>

          <button className="btn-primary" type="submit">SUBMIT</button>
        </form>
        <button className="btn-secondary" onClick={handleBackClick}>BACK</button>
      </div>
    </div>
  );
};

export default SkillsPage;