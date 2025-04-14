import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Profile.css';
import { createClient } from "@supabase/supabase-js";

const supabaseURL = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseURL, supabaseAnonKey);

const skillCategories = {
    tools: ["CTF", "Vulnerability Simulation", "Penetration Testing"],
    vms: ["Kali", "Ubuntu", "SEEDS LAB"]
};

const skillLabels = {
    CTF: "CTF Challenges",
    "Vulnerability Simulation": "Vulnerability Simulation",
    "Penetration Testing": "Penetration Testing",
    Kali: "Kali Linux",
    Ubuntu: "Ubuntu",
    "SEEDS LAB": "SEEDS LAB"
};

const getSkillLevelLabel = (level) => {
    if (level <= 4) return "Beginner";
    if (level <= 8) return "Intermediate";
    return "Expert";
};

export const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [originalData, setOriginalData] = useState(null);
    const [tools, setTools] = useState([]);
    const [vms, setVMs] = useState([]);
    const [skillLevel, setSkillLevel] = useState(null);
    const [lab1Progress, setLab1Progress] = useState(0);
    const [lab2Progress, setLab2Progress] = useState(0);

    useEffect(() => {
        // Load lab progress from localStorage
        setLab1Progress(Number(localStorage.getItem('lab1Progress') || 0));
        setLab2Progress(Number(localStorage.getItem('lab2Progress') || 0));
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) return console.error("Error fetching user:", error);

            const initialData = {
                firstName: user.user_metadata?.firstName || '',
                lastName: user.user_metadata?.lastName || '',
                email: user.email || '',
            };

            setFormData(initialData);
            setOriginalData(initialData);

            const { data: skillsData, error: skillsError } = await supabase
                .from("Skills")
                .select("*")
                .eq("auth_userID", user.id)
                .single();

            if (!skillsError && skillsData) {
                const selectedTools = skillCategories.tools.filter(key => skillsData[key]);
                const selectedVMs = skillCategories.vms.filter(key => skillsData[key]);
                setTools(selectedTools);
                setVMs(selectedVMs);
                setSkillLevel(skillsData.skill_level || null);
            }
        };

        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isFormModified = () => (
        formData.firstName !== originalData?.firstName ||
        formData.lastName !== originalData?.lastName ||
        formData.email !== originalData?.email
    );

    const handleSave = async (e) => {
        e.preventDefault();
        if (isFormModified()) {
            const confirmSave = window.confirm("Are you sure you want to save these changes?");
            if (!confirmSave) return;
        }

        setIsEditing(false);

        try {
            const { data: { user }, error: getUserError } = await supabase.auth.getUser();
            if (getUserError || !user) throw getUserError || new Error("User not found");

            const { error: updateError } = await supabase.auth.updateUser({
                email: formData.email,
                data: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                },
            });

            if (updateError) throw updateError;
            alert("Profile updated! If you changed your email, check your inbox to confirm.");
            setOriginalData(formData);
        } catch (error) {
            console.error("Error updating profile:", error.message);
            alert("Failed to update profile.");
        }
    };

    const handleCancel = () => {
        if (isFormModified()) {
            const confirmCancel = window.confirm("Discard all changes?");
            if (!confirmCancel) return;
        }

        setFormData(originalData);
        setIsEditing(false);
    };

    const handleDeleteAccount = async (e) => {
        e.preventDefault();

        const doubleConfirm = window.confirm("⚠️ Are you sure you want to permanently delete your account? This action cannot be undone.");
        if (!doubleConfirm) return;

        try {
            const { data: { user }, error: getUserError } = await supabase.auth.getUser();
            if (getUserError || !user) throw getUserError || new Error("User not found");

            const { error } = await supabase.auth.admin.deleteUser(user.id);
            if (error) throw error;

            alert("Your account has been deleted. Thanks for being part of our platform.");
            localStorage.clear();
            window.location.href = "/";
        } catch (error) {
            console.error("Error deleting account:", error.message);
            alert("Account deletion failed. Please try again.");
        }
    };

    return (
        <div className="profile-container">
            <div className="back-button-container">
                <Link to="/mainmenu">
                    <button className="back-button">Back to Dashboard</button>
                </Link>
            </div>

            <div className="profile-card">
                {!isEditing ? (
                    <>
                        <h2>Profile Overview</h2>
                        <table className="profile-details-table">
                            <tbody>
                                <tr><th>Name:</th><td>{formData.firstName} {formData.lastName}</td></tr>
                                <tr><th>Email:</th><td>{formData.email}</td></tr>
                                <tr>
                                    <th>🛠️ Tools:</th>
                                    <td>
                                        {tools.length ? tools.map(t => <div key={t}>{skillLabels[t]}</div>) : "None selected"}
                                    </td>
                                </tr>
                                <tr>
                                    <th>💻 Virtual Machines:</th>
                                    <td>
                                        {vms.length ? vms.map(vm => <div key={vm}>{skillLabels[vm]}</div>) : "None selected"}
                                    </td>
                                </tr>
                                {skillLevel !== null && (
                                    <tr>
                                        <th>📊 Skill Level:</th>
                                        <td>{getSkillLevelLabel(skillLevel)} ({skillLevel})</td>
                                    </tr>
                                )}
                                <tr>
                                <th>🧪 Lab Progress:</th>
                                <td>
                                    <div className="lab-progress">
                                    {/* Lab 1 */}
                                    <div className="lab-label">Lab 1: ICMP Redirect Attack</div>
                                    <div className="lab-progress-bar">
                                        <div
                                        className="lab-progress-fill"
                                        style={{ width: `${(lab1Progress / 7) * 100}%` }}
                                        />
                                        <span className="lab-progress-text">
                                        {lab1Progress >= 7 ? '✅ Completed!' : `${Math.round((lab1Progress / 7) * 100)}%`}
                                        </span>
                                    </div>

                                    {/* Lab 2 */}
                                    <div className="lab-label" style={{ marginTop: '15px' }}>Lab 2: Packet Sniffing</div>
                                    <div className="lab-progress-bar">
                                        <div
                                        className="lab-progress-fill"
                                        style={{ width: `${(lab2Progress / 7) * 100}%` }}
                                        />
                                        <span className="lab-progress-text">
                                        {lab2Progress >= 7 ? '✅ Completed!' : `${Math.round((lab2Progress / 7) * 100)}%`}
                                        </span>
                                    </div>
                                    </div>
                                </td>
                                </tr>

                            </tbody>
                        </table>

                        <div className="profile-buttons">
                            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
                        </div>
                    </>
                ) : (
                    <form onSubmit={handleSave}>
                        <h2>Edit Profile</h2>

                        <div className="profile-section">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>

                        <div className="profile-section">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>

                        <div className="profile-section">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>

                        <div className="profile-buttons">
                            {isFormModified() && (
                                <button type="submit" className="save-button">Save</button>
                            )}
                            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                        </div>

                        <div className="profile-buttons">
                            <Link to="/update-skills" className="unstyled-link">
                                <button type="button" className="skills-button">Update Skills</button>
                            </Link>
                        </div>

                        <div className="delete-account-container">
                            <button type="button" className="delete-account-button" onClick={handleDeleteAccount}>
                                Delete Account
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
