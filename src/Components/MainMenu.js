import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Styles/MainMenu.css';
import { FaHome, FaUser, FaFlask } from 'react-icons/fa';
import logo from '../Assets/Logo.png';

export const MainMenu = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <div className="page-wrapper">
            {/* Logo in the Top Left */}
            <div className="logo-container">
                <img src={logo} alt="Logo" />
            </div>

            {/* Logout Button */}
            <div className="logout-container">
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Navigation Bar */}
            <header>
                <div className="container">
                    <nav>
                        <ul>
                            {/* Home */}
                            <li>
                                <NavLink to="/mainmenu" end className={({ isActive }) => (isActive ? "active-link" : "")}>
                                    <FaHome className="nav-icon" /> Home
                                </NavLink>
                            </li>

                            {/* Labs Dropdown */}
                            <li className="dropdown">
                                <span className="dropdown-toggle">
                                    <FaFlask className="nav-icon" /> Labs
                                </span>
                                <ul className="dropdown-menu">
                                    {/* Lab Activities (Submenu) */}
                                    <li className="dropdown nested-dropdown">
                                        <span className="dropdown-toggle">
                                            Lab Activities &#9656;
                                        </span>
                                        <ul className="dropdown-menu sub-menu">
                                            <li>
                                                <NavLink to="/Lab1">ICMP Redirect Attack</NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/Lab2">Packet Sniffing & Spoofing</NavLink>
                                            </li>
                                        </ul>
                                    </li>

                                    {/* Direct Link to Sandbox */}
                                    <li>
                                        <a
                                            href="http://72.209.113.80:6081/vnc.html"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            Sandbox
                                        </a>
                                    </li>
                                </ul>
                            </li>

                            {/* Profile */}
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
