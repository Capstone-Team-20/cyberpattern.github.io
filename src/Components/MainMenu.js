import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Styles/MainMenu.css';
import { FaHome, FaUser, FaFlask, FaArrowRight } from 'react-icons/fa';
import logo from '../Assets/Logo.png';

export const MainMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const lab1Progress = Number(localStorage.getItem('lab1Progress') || 0);
  const lab2Progress = Number(localStorage.getItem('lab2Progress') || 0);
  const [currentLab, setCurrentLab] = useState(1);

  const labs = [
    {
      id: 1,
      title: 'Lab 1: ICMP Redirect Attack',
      progress: lab1Progress,
      route: '/Lab1',
    },
    {
      id: 2,
      title: 'Lab 2: Packet Sniffing',
      progress: lab2Progress,
      route: '/Lab2',
    },
  ];

  const handleNextLab = () => {
    setCurrentLab((prev) => (prev % labs.length) + 1);
  };

  const lab = labs.find((l) => l.id === currentLab);

  return (
    <div className="page-wrapper">
      <div className="logo-container">
        <img src={logo} alt="Logo" />
      </div>

      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <header className="nav-bar">
        <div className="container">
          <nav>
            <ul>
              <li>
                <NavLink to="/mainmenu" end className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  <FaHome className="nav-icon" /> Home
                </NavLink>
              </li>
              <li className="dropdown">
                <span className="dropdown-toggle">
                  <FaFlask className="nav-icon" /> Labs
                </span>
                <ul className="dropdown-menu">
                  <li className="dropdown nested-dropdown">
                    <span className="dropdown-toggle">Lab Activities &#9656;</span>
                    <ul className="dropdown-menu sub-menu">
                      <li>
                        <NavLink to="/Lab1">ICMP Redirect Attack</NavLink>
                      </li>
                      <li>
                        <NavLink to="/Lab2">Packet Sniffing & Spoofing</NavLink>
                      </li>
                    </ul>
                  </li>
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
              <li>
                <NavLink to="/Profile" className={({ isActive }) => (isActive ? 'active-link' : '')}>
                  <FaUser className="nav-icon" /> Profile
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="overview-fullwidth">
  <div className="overview-wrapper">
    <h3 className="overview-heading">Why Cyber Pattern Labs?</h3>
    <p>
      As the demand for skilled cybersecurity professionals grows, it is increasingly important for students to gain
      hands-on experience in ethical hacking and security practices to stand out to future employers. However, many
      current virtual labs and cybersecurity platforms are either too expensive or require advanced technical skills,
      which limits access for undergraduate students.
    </p>
    <p>
      This project aims to address this gap by creating a cost-free, beginner-friendly penetration testing environment
      specifically designed for students. The platform allows users to simulate cyberattacks and defense techniques in
      a safe, controlled environment, enabling students to build practical, real-world experience.
    </p>
    <p>
      By developing this platform, students will be better equipped to demonstrate their skills and readiness for
      entry-level cybersecurity roles, making them more attractive candidates to potential employers. The project
      focuses on providing a comprehensive introduction to essential cybersecurity concepts, including vulnerability
      exploitation and security best practices, intending to prepare students to excel in the cybersecurity industry.
    </p>
  </div>
</section>




      <section className="dashboard-widgets">
        <div className="widget lab-widget">
          <div className="lab-progress-header">
            <h2>Lab Progress</h2>
            <FaArrowRight className="next-lab-btn" onClick={handleNextLab} />
          </div>
          <div className="lab-label">{lab.title}</div>
          <div className="lab-progress-bar">
            <div className="lab-progress-fill" style={{ width: `${(lab.progress / 7) * 100}%` }} />
            <span className="lab-progress-text">
              {lab.progress >= 7 ? '✅ Completed!' : `${Math.round((lab.progress / 7) * 100)}%`}
            </span>
          </div>
          <button className="lab-continue-button" onClick={() => navigate(lab.route)}>
            Continue {lab.title.split(':')[0]}
          </button>
        </div>

        <div className="widget recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>✅ Completed Lab 1 – 04/12/25</li>
            <li>🕒 Continued Lab 2 – 04/13/25</li>
            <li>📥 Downloaded Packet Sniffer Kit</li>
          </ul>
        </div>

        <div className="widget system-status">
          <h2>Sandbox Status</h2>
          <p>🟢 Online</p>
          <button onClick={() => window.open('http://72.209.113.80:6081/vnc.html', '_blank')}>
            Launch Kali Sandbox
          </button>
        </div>

        <div className="widget quick-links">
          <h2>Resources</h2>
          <ul>
            <li>
              <a href="#">📘 Lab Guide PDF</a>
            </li>
            <li>
              <a href="#">🎥 Video: ICMP Walkthrough</a>
            </li>
            <li>
              <a href="#">💬 Join Discord</a>
            </li>
            <li>
              <a href="#">❗ Report a Bug</a>
            </li>
          </ul>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Cyber Pattern Labs</p>
        </div>
      </footer>
    </div>
  );
};
