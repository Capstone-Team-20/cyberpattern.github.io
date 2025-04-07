import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../Styles/MainMenu.css';
import { FaHome, FaUser, FaFlask } from 'react-icons/fa'; // Import icons
import logo from '../Assets/Logo.png'; // Import the logo

export const MainMenu = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

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
                            <li className="dropdown">
                                <button className="dropdown-toggle" onClick={toggleDropdown}>
                                    <FaFlask className="nav-icon" /> Labs
                                </button>
                                {isDropdownOpen && (
                                    <ul className="dropdown-menu">
                                        <li><NavLink to="/Lab1">ICMP Redirect Attack</NavLink></li>
                                        <li><NavLink to="/Lab2">Packet Sniffing & Spoofing</NavLink></li>
                                        <li><NavLink to="/Lab3"></NavLink></li>
                                    </ul>
                                )}
                            </li>
                            <li>
                                <NavLink to="/Profile" className={({ isActive }) => (isActive ? "active-link" : "")}>
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
