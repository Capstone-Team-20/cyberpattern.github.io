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
        const confirmDelete = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
        if (!confirmDelete) return;

        try {
            const { data: { user }, error: getUserError } = await supabase.auth.getUser();
            if (getUserError || !user) throw getUserError || new Error("User not found");

            const { error } = await supabase.auth.admin.deleteUser(user.id);
            if (error) throw error;

            alert("Account deleted successfully.");
            localStorage.clear();
            window.location.href = "/";
        } catch (error) {
            console.error("Error deleting account:", error.message);
            alert("Failed to delete account.");
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