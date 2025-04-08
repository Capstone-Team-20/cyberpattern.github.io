import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Profile.css';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [originalData, setOriginalData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error || !user) {
                console.error("Error fetching user:", error);
                return;
            }

            const initialData = {
                firstName: user.user_metadata?.firstName || '',
                lastName: user.user_metadata?.lastName || '',
                email: user.email || '',
            };

            setFormData(initialData);
            setOriginalData(initialData);
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isFormModified = () => {
        return (
            formData.firstName !== originalData?.firstName ||
            formData.lastName !== originalData?.lastName ||
            formData.email !== originalData?.email
        );
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (isFormModified()) {
            const confirmSave = window.confirm("Are you sure you want to save these changes?");
            if (!confirmSave) return;
        }

        setIsEditing(false);

        try {
            const { data: { user }, error: getUserError } = await supabase.auth.getUser();

            if (getUserError || !user) {
                throw getUserError || new Error("User not found");
            }

            const { error: updateError } = await supabase.auth.updateUser({
                email: formData.email,
                data: {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                },
            });

            if (updateError) {
                throw updateError;
            }

            alert("Profile updated! If you changed your email, check your inbox to confirm.");
            setOriginalData(formData); // Update the reference
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
                        <div className="profile-details-container">
                            <div className="profile-detail">
                                <span className="label">Name:</span>
                                <span className="value">{formData.firstName} {formData.lastName}</span>
                            </div>
                            <div className="profile-detail">
                                <span className="label">Email:</span>
                                <span className="value">{formData.email}</span>
                            </div>
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

                        {/* Skills section is commented out until DB table is ready */}
                        {/*
                        <div className="profile-section">
                            <Link to="/skills">
                                <button type="button" className="skills-button">Update Skills</button>
                            </Link>
                        </div>
                        */}

                        <div className="profile-buttons">
                            {isFormModified() && (
                                <button type="submit" className="save-button">Save</button>
                            )}
                            <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
