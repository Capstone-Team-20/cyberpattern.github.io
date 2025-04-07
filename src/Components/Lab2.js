import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../Styles/Lab2.css'; // Import the CSS file for styling

const Lab2 = () => {
    const [currentSection, setCurrentSection] = useState(() => {
        // Load saved progress from localStorage
        const savedSection = localStorage.getItem('lab2Progress');
        return savedSection ? parseInt(savedSection, 10) : 0;
    });
    const [isSaved, setIsSaved] = useState(false); // Track if progress is saved
    const navigate = useNavigate(); // Initialize useNavigate

    const sections = [
        {
            title: "Introduction",
            content: "In this lab, you will learn about packet sniffing and spoofing, their impact on network security, and how to mitigate them.",
        },
        {
            title: "Step 1: Set Up the Network Environment",
            content: "Learn how to configure the network environment for packet sniffing and spoofing simulations.",
        },
        {
            title: "Step 2: Perform Packet Sniffing",
            content: "Use tools like Wireshark to capture and analyze network traffic.",
        },
        {
            title: "Step 3: Perform Packet Spoofing",
            content: "Simulate packet spoofing attacks and observe their effects on the network.",
        },
        {
            title: "Step 4: Analyze and Mitigate",
            content: "Analyze the captured traffic and implement mitigation techniques to prevent packet sniffing and spoofing.",
        },
    ];

    const handleNext = () => {
        if (currentSection < sections.length - 1) {
            setCurrentSection(currentSection + 1);
            setIsSaved(false); // Mark progress as unsaved when navigating
        }
    };

    const handlePrevious = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
            setIsSaved(false); // Mark progress as unsaved when navigating
        }
    };

    const handleSave = () => {
        // Save progress to localStorage
        localStorage.setItem('lab2Progress', currentSection);
        setIsSaved(true); // Mark progress as saved
        alert(`Progress saved! You are on section: ${sections[currentSection].title}`);
    };

    const handleQuit = () => {
        if (!isSaved) {
            const confirmQuit = window.confirm(
                "Are you sure you want to quit? Your progress will be lost if you haven't saved."
            );
            if (!confirmQuit) {
                return; // Do nothing if the user cancels
            }
        }
        navigate('/mainmenu'); // Redirect to the Main Menu
    };

    return (
        <div className="lab-container">
            {/* Left Section */}
            <div className="lab-left">
                <h2>Lab 2: Packet Sniffing and Spoofing</h2>
                <p>This section can be used for interactive content, tools, or instructions.</p>
            </div>

            {/* Right Section */}
            <div className="lab-right">
                {/* Navigation Arrows */}
                <button
                    className="arrow-button prev-arrow"
                    onClick={handlePrevious}
                    disabled={currentSection === 0}
                >
                    &#x25C0; {/* Unicode for a thick left arrow */}
                </button>
                <button
                    className="arrow-button next-arrow"
                    onClick={handleNext}
                    disabled={currentSection === sections.length - 1}
                >
                    &#x25B6; {/* Unicode for a thick right arrow */}
                </button>

                {/* Write-Up Section */}
                <h2>{sections[currentSection].title}</h2>
                <p>{sections[currentSection].content}</p>

                {/* Save and Quit Buttons */}
                <div className="save-quit-buttons">
                    <button className="save-button" onClick={handleSave}>
                        Save
                    </button>
                    <button className="quit-button" onClick={handleQuit}>
                        Quit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Lab2;