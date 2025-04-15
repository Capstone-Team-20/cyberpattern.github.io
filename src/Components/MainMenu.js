import React, { useState, useEffect, useRef, useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../Styles/MainMenu.css';
import { FaHome, FaUser, FaFlask, FaArrowRight, FaBook, FaVideo, FaBug, FaGithub } from 'react-icons/fa';
import logo from '../Assets/Logo.png';

export const MainMenu = () => {
  const navigate = useNavigate();

  const lab1Progress = Number(localStorage.getItem('lab1Progress') || 0);
  const lab2Progress = Number(localStorage.getItem('lab2Progress') || 0);
  const [currentLab, setCurrentLab] = useState(1);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [bugMessage, setBugMessage] = useState('');
  const chatRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });

  const [visibleActivities, setVisibleActivities] = useState([]);

  const allActivities = useMemo(() => [
    '✅ Completed Lab 1',
    '🕒 Continued Lab 2',
    '📥 Downloaded Packet Sniffer Kit',
    '🧪 Finished Lab 1 - Section 1',
    '🔄 Updated First Name in Profile',
    '🛠️ Added Skill: Penetration Testing',
    '💻 Selected Kali Linux as a VM',
    '📧 Changed Email Address',
    '🧪 Started Lab 2 - Step 3',
    '📊 Adjusted Skill Level to Intermediate',
    '🎯 Completed Lab 2',
    '⚙️ Updated all skill preferences'
  ], []);
  

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

  useEffect(() => {
    setVisibleActivities(allActivities.slice(0, 5));
    let pointer = 5;
  
    const interval = setInterval(() => {
      setVisibleActivities(prev => {
        const nextIndex = pointer % allActivities.length;
        const nextVisible = [...prev.slice(1), allActivities[nextIndex]];
        pointer++;
        return nextVisible;
      });
    }, 3000);
  
    return () => clearInterval(interval);
  }, [allActivities]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLab((prev) => (prev % labs.length) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [labs.length]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleBugSubmit = () => {
    alert("🐞 Thanks for your feedback:\n\n" + bugMessage);
    setBugMessage('');
    setIsChatOpen(false);
  };

  const startDrag = (e) => {
    const box = chatRef.current;
    pos.current.offsetX = e.clientX - box.getBoundingClientRect().left;
    pos.current.offsetY = e.clientY - box.getBoundingClientRect().top;
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
  };

  const drag = (e) => {
    const box = chatRef.current;
    const x = e.clientX - pos.current.offsetX;
    const y = e.clientY - pos.current.offsetY;
    box.style.left = `${x}px`;
    box.style.top = `${y}px`;
  };

  const stopDrag = () => {
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
  };

  const lab = labs.find((l) => l.id === currentLab);

  return (
    <div className="page-wrapper2">
      <div className="logo-container"><img src={logo} alt="Logo" /></div>
      <div className="logout-container">
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      <header className="nav-bar">
        <div className="container">
          <nav>
            <ul>
              <li><NavLink to="/mainmenu" end className={({ isActive }) => (isActive ? 'active-link' : '')}><FaHome className="nav-icon" /> Home</NavLink></li>
              <li className="dropdown">
                <span className="dropdown-toggle"><FaFlask className="nav-icon" /> Labs</span>
                <ul className="dropdown-menu">
                  <li className="dropdown nested-dropdown">
                    <span className="dropdown-toggle">Lab Activities &#9656;</span>
                    <ul className="dropdown-menu sub-menu">
                      <li><NavLink to="/Lab1">ICMP Redirect Attack</NavLink></li>
                      <li><NavLink to="/Lab2">Packet Sniffing & Spoofing</NavLink></li>
                    </ul>
                  </li>
                  <li><a href="http://72.209.113.80:6081/vnc.html" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 'bold' }}>Sandbox</a></li>
                </ul>
              </li>
              <li><NavLink to="/Profile" className={({ isActive }) => (isActive ? 'active-link' : '')}><FaUser className="nav-icon" /> Profile</NavLink></li>
            </ul>
          </nav>
        </div>
      </header>

      <section className="overview-fullwidth">
        <div className="overview-wrapper">
          <h3 className="overview-heading">Why Cyber Pattern Labs?</h3>
          <p>As the demand for skilled cybersecurity professionals grows, it is increasingly important for students to gain hands-on experience in ethical hacking and security practices to stand out to future employers. However, many current virtual labs and cybersecurity platforms are either too expensive or require advanced technical skills, which limits access for undergraduate students.</p>
          <h3 className="overview-heading">Our Objective</h3>
          <p>This project aims to address this gap by creating a cost-free, beginner-friendly penetration testing environment specifically designed for students. The platform allows users to simulate cyberattacks and defense techniques in a safe, controlled environment, enabling students to build practical, real-world experience.</p>
          <h3 className="overview-heading">Our Solution</h3>
          <p>By developing this platform, students will be better equipped to demonstrate their skills and readiness for entry-level cybersecurity roles, making them more attractive candidates to potential employers. The project focuses on providing a comprehensive introduction to essential cybersecurity concepts, including vulnerability exploitation and security best practices, intending to prepare students to excel in the cybersecurity industry.</p>
        </div>
      </section>

      <section className="dashboard-widgets">
        <div className="widget lab-widget">
          <div className="lab-progress-header">
            <h2>Lab Progress:</h2>
            <FaArrowRight className="next-lab-btn" onClick={() => setCurrentLab((prev) => (prev % labs.length) + 1)} />
          </div>
          <div className="lab-label">{lab.title}</div>
          <div className="lab-progress-bar">
            <div className="lab-progress-fill" style={{ width: `${(lab.progress / 7) * 100}%` }} />
            <span className="lab-progress-text">{lab.progress >= 7 ? '✅ Completed!' : `${Math.round((lab.progress / 7) * 100)}%`}</span>
          </div>
          <button className="lab-continue-button" onClick={() => navigate(lab.route)}>Continue {lab.title.split(':')[0]}</button>
        </div>

        <div className="widget recent-activity">
          <h2>Recent Activity:</h2>
          <ul>
            {visibleActivities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>

        <div className="widget system-status">
          <h2>Sandbox Status:</h2>
          <p className="status-indicator"><span className="pulse-dot-online"></span> Kali : Online</p>
          <button onClick={() => window.open('http://72.209.113.80:6081/vnc.html', '_blank')}>Launch Kali Sandbox</button>
          <br /><br />
          <p className="status-indicator"><span className="pulse-dot-offline"></span> Ubuntu : Offline</p>
          <button onClick={() => window.open('http://72.209.113.80:6081/vnc.html', '_blank')}>Launch Ubuntu Sandbox</button>
        </div>

        <div className="widget quick-links">
          <h2>Resources:</h2>
          <ul>
            <li><a className="unstyled-link" href="https://seedsecuritylabs.org/labs.html" target="_blank" rel="noopener noreferrer"><FaBook /> Lab Guide PDF</a></li>
            <li><button className="unstyled-link" onClick={() => alert("🎥 The video walkthrough feature is coming soon!") }><FaVideo /> Video: ICMP Walkthrough</button></li>
            <li><a className="unstyled-link" href="https://github.com/Capstone-Team-20/cyberpattern.github.io" target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub Repository</a></li>
            <li><button className="unstyled-link" onClick={() => setIsChatOpen(true)}><FaBug /> Provide Feedback</button></li>
          </ul>
        </div>
      </section>

      {isChatOpen && (
        <div className="chatbox-overlay">
          <div className="chatbox-popup" ref={chatRef} style={{ position: 'fixed', top: '20%', right: '40px' }}>
            <div className="chatbox-header" onMouseDown={startDrag}>
              <h4>🐞 Provide Feedback</h4>
            </div>
            <textarea rows="4" placeholder="Enter your feedback..." value={bugMessage} onChange={(e) => setBugMessage(e.target.value)} />
            <div className="chatbox-buttons">
              <button onClick={handleBugSubmit}>Submit</button>
              <button onClick={() => setIsChatOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <footer>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Cyber Pattern Labs</p>
        </div>
      </footer>
    </div>
  );
};

