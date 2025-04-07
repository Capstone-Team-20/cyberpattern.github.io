import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation
import '../Styles/Profile.css';
import logo from '../Assets/Logo.png'; // Make sure path is correct

export const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setIsEditing(false);
        console.log('Updated details:', formData);
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
                    </form>
                )}
            </div>
        </div>
    );
};
