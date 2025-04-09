import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Skills.css";
import logo from "../Assets/Logo.png";
import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseURL, supabaseAnonKey);

const UpdateSkills = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toolsSelected = skills.CTF || skills["Vulnerability Simulation"] || skills["Penetration Testing"];
    const vmsSelected = skills.Kali || skills.Ubuntu || skills["SEEDS LAB"];

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      console.error("No user is logged in or error fetching user:", error);
      return;
    }

    const userId = user.id;

    if (!toolsSelected) {
      setErrors({ tools: true, vms: false });
    } else if (!vmsSelected) {
      setErrors({ tools: false, vms: true });
    } else {
      // Reset all skills first
      const { error: resetError } = await supabase
        .from("Skills")
        .update({
          CTF: false,
          "Vulnerability Simulation": false,
          "Penetration Testing": false,
          Kali: false,
          Ubuntu: false,
          "SEEDS LAB": false,
          skill_level: 5,
        })
        .eq("auth_userID", userId);

      if (resetError) {
        console.error("Error resetting skills:", resetError.message);
        return;
      }

      // Now apply the updated selection
      const { error: updateError } = await supabase
        .from("Skills")
        .update({
          CTF: skills.CTF,
          "Vulnerability Simulation": skills["Vulnerability Simulation"],
          "Penetration Testing": skills["Penetration Testing"],
          Kali: skills.Kali,
          Ubuntu: skills.Ubuntu,
          "SEEDS LAB": skills["SEEDS LAB"],
          skill_level: skills.skillLevel,
        })
        .eq("auth_userID", userId);

      if (updateError) {
        console.error("Update failed:", updateError.message);
      } else {
        console.log("Skills updated successfully");
        setErrors({ tools: false, vms: false });
        navigate("/profile");
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>
      <div className="registration-container">
        <div className="registration-content">
          <form onSubmit={handleSubmit}>
            <label><b>Which Tools Do you want to use?</b></label>
            <div className="tools-section">
              {["CTF", "Vulnerability Simulation", "Penetration Testing"].map((tool) => (
                <div key={tool} className="tool-option">
                  <input
                    type="checkbox"
                    checked={skills[tool]}
                    onChange={() => setSkills({ ...skills, [tool]: !skills[tool] })}
                  />
                  <span>{tool}</span>
                </div>
              ))}
              {errors.tools && <p className="error-message">Please select at least one tool.</p>}
            </div>

            <label><b>Which Virtual Machines do you want to use?</b></label>
            <div className="tools-section">
              {["Kali", "Ubuntu", "SEEDS LAB"].map((vm) => (
                <div key={vm} className="tool-option">
                  <input
                    type="checkbox"
                    checked={skills[vm]}
                    onChange={() => setSkills({ ...skills, [vm]: !skills[vm] })}
                  />
                  <span>{vm}</span>
                </div>
              ))}
              {errors.vms && <p className="error-message">Please select at least one virtual machine.</p>}
            </div>

            <label><b>What would you rate your skills?</b></label>
            <input
              type="range"
              min="1"
              max="9"
              value={skills.skillLevel}
              onChange={(e) => setSkills({ ...skills, skillLevel: parseInt(e.target.value) })}
            />

            <label><b>Skill Level: {skills.skillLevel}</b></label>
            <label><b>(1 - Beginner, 5 - Intermediate, 9 - Expert)</b></label>

            <button className="btn-secondary" type="submit"><b>SUBMIT</b></button>
            <button
              className="cancel-button"
              type="button"
              onClick={() => navigate("/profile")}
              style={{ marginTop: "10px", padding: "10px 20px" }}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSkills;
