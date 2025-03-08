import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/MainMenu.css';
import { FaHome, FaUser, FaTools, FaUserPlus } from 'react-icons/fa'; // Import icons
import logo from '../Assets/Logo.png'; // Import the logo

export const MainMenu = () => {
    return (
        <div className="page-wrapper">
            {/* Logo in the Top Left */}
            <div className="logo-container">
                <img src={logo} alt="Logo" />
            </div>

            {/* Navbar */}
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <NavLink to="/mainmenu" end className={({ isActive }) => (isActive ? "active-link" : "")}>
                                    <FaHome className="nav-icon" /> Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/skills" className={({ isActive }) => (isActive ? "active-link" : "")}>
                                    <FaTools className="nav-icon" /> Skills
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/registration" className={({ isActive }) => (isActive ? "active-link" : "")}>
                                    <FaUserPlus className="nav-icon" /> Register
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/UserProfile" className={({ isActive }) => (isActive ? "active-link" : "")}>
                                    <FaUser className="nav-icon" /> Profile
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main>
                <h1>Welcome to Cyber Pattern Labs</h1>
            </main>

            {/* Footer */}
            <footer>
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} Cyber Pattern Labs</p>
                </div>
            </footer>
        </div>
    );
};
