import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Lab1.css';
import VMPage from './VMPage';

const Sandbox = () => {
    const [currentSection, setCurrentSection] = useState(() => {
        const savedSection = localStorage.getItem('lab1Progress');
        return savedSection ? parseInt(savedSection, 10) : 0;
    });
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate();

    const sections = [
        {
            title: "Kali Linux VM",
            content: `This VM is running Kali Linux, a Debian-based distribution specifically designed for penetration testing and security auditing. It contains a wide range of tools for various information security tasks, including penetration testing, security research, computer forensics, and reverse engineering.`
        },
        {
            title: "To Login to the VM",
            content: `The default username is "kali" and the password is "kali". You can use the terminal to run commands and perform various tasks.`
        },
        {
            title: "Typical Uses for Kali Linux",
            content: `Kali Linux is widely used for penetration testing, security research, and ethical hacking. It includes tools for network scanning, vulnerability assessment, web application testing, and more.`
        },
        {
            title: "Important Note",
            content: `Always ensure you have permission to test the security of any system. Unauthorized access or testing can lead to legal consequences.`
        },
        {
            title: "Conclusion",
            content: `Kali Linux is a powerful tool for security professionals. Familiarize yourself with its features and tools to effectively conduct penetration tests and security assessments.`
        }
    ];

    const handleNext = () => {
        if (currentSection < sections.length - 1) {
            setCurrentSection(currentSection + 1);
            setIsSaved(false);
        }
    };

    const handlePrevious = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
            setIsSaved(false);
        }
    };

    // const handleSave = () => {
    //     localStorage.setItem('lab1Progress', currentSection);
    //     setIsSaved(true);
    //     alert(`Progress saved! You are on section: ${sections[currentSection].title}`);
    // };

    const handleQuit = () => {
        if (!isSaved) {
            const confirmQuit = window.confirm(
                "Are you sure you want to quit?"
            );
            if (!confirmQuit) return;
        }
        navigate('/mainmenu');
        setIsSaved(false);
    };

    return (
        <div className="lab-container">
            <div className="lab-left">
                <h2>Kali Virtual Machine - Sandbox</h2>
                <VMPage
                    viewOnly={false}
                    shouldReconnect={true}
                    password={"capstonekali123"}
                    vm={2} // Assuming you want to use the first VM
                />
                {/* <iframe
                src={`http://72.209.113.80:6081/vnc.html?autoconnect=true&reconnect=${false}&view_only=${false}&password=${"capstonekali123"}`}
                title="Virtual Machine"
                style={{
                    flexGrow: 1,
                    width: '100%',
                    border: 'none',
                }}
             ></iframe> */}
            </div>

            <div className="lab-right">
                <button className="arrow-button prev-arrow" onClick={handlePrevious} disabled={currentSection === 0}>
                    &#x25C0;
                </button>
                <button className="arrow-button next-arrow" onClick={handleNext} disabled={currentSection === sections.length - 1}>
                    &#x25B6;
                </button>

                <h2>{sections[currentSection].title}</h2>
                <pre style={{ whiteSpace: 'pre-wrap', color: '#ccc', fontSize: '18px' }}>{sections[currentSection].content}</pre>

                <div className="save-quit-buttons">
                    <button className="quit-button" onClick={handleQuit}>Quit</button>
                </div>
            </div>
        </div>
    );
};

export default Sandbox;
