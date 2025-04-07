import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For navigation and useNavigate
import '../Styles/Profile.css';

export const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
    });
    const [skills, setSkills] = useState([]); // State to store current skills
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        // Fetch skills from backend or localStorage
        const fetchSkills = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
                const response = await fetch(`/api/users/${userId}/skills`); // Example API endpoint
                if (response.ok) {
                    const data = await response.json();
                    setSkills(data.skills); // Assuming the API returns a "skills" array
                } else {
                    console.error("Failed to fetch skills");
                }
            } catch (error) {
                console.error("Error fetching skills:", error);
            }
        };

        fetchSkills();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsEditing(false);
        console.log('Updated details:', formData);
    };

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your account? This action cannot be undone."
        );
        if (confirmDelete) {
            try {
                const userId = localStorage.getItem('userId'); // Assuming user ID is stored in localStorage
                const response = await fetch(`/api/users/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    alert("Your account has been deleted successfully.");
                    localStorage.clear(); // Clear user data
                    navigate('/'); // Redirect to the Login Page
                } else {
                    alert("Failed to delete your account. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting account:", error);
                alert("An error occurred while deleting your account. Please try again.");
            }
        }
    };

    return (
        <div className="profile-container">
            {/* Back to Main Menu Button */}
            <div className="back-button-container">
                <Link to="/mainmenu">
                    <button className="back-button">Back to Dashboard</button>
                </Link>
            </div>

            <div className="profile-card">
                {!isEditing ? (
                    <>
                        <h2>Profile Overview</h2>
                        <div className="profile-section">
                            <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                        </div>

                        {/* Current Skills Section */}
                        <div className="skills-section">
                            <h3>Current Skills</h3>
                            {skills.length > 0 ? (
                                <ul>
                                    {skills.map((skill, index) => (
                                        <li key={index}>{skill}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No skills added yet.</p>
                            )}
                        </div>

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

                        <div className="profile-section">
                            <label htmlFor="password">New Password</label>
                            <input type="password" name="password" placeholder="New Password" />
                        </div>

                        <div className="profile-section">
                            <Link to="/skills">
                                <button type="button" className="skills-button">Update Skills</button>
                            </Link>
                        </div>

                        <div className="profile-buttons">
                            <button type="submit" className="save-button">Save</button>
                        </div>

                        {/* Delete Account Button */}
                        <div className="delete-account-container">
                            <button className="delete-account-button" onClick={handleDeleteAccount}>
                                Delete Account
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
