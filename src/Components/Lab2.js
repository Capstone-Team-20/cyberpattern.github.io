import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Styles/Lab2.css';
import VMPage from './VMPage';

const Lab2 = () => {
    const [currentSection, setCurrentSection] = useState(() => {
        const savedSection = localStorage.getItem('lab2Progress');
        return savedSection ? parseInt(savedSection, 10) : 0;
    });
    const [isSaved, setIsSaved] = useState(false);
    const navigate = useNavigate();

    const sections = [
        {
            title: "Introduction",
            content: `An ICMP (Internet Control Message Protocol) is used in networking to send error messages and operational information. For example, the command ping to check if a website is online, functions on ICMP.

So you may be asking, how does an Attack on ICMP work? An ICMP Redirect attack is one of the most common attacks performed on the web and networks. In this scenario, an attacker pretends to be a router and sends fake ICMP redirect messages to a target device. The device inherently believes the fake message and starts to reroute traffic from the real destination to the attacker's machine. This allows the attacker to intercept, modify, and steal data before forwarding it to the real destination. An attacker can also just drop the traffic after processing it, causing a denial of service.`
        },
        {
            title: "Why does this Matter?",
            content: `ICMP redirect attacks can be used to steal sensitive information if an attacker has access to your Local Area Network (LAN). ICMP Redirect Attacks have been used to steal passwords, financial and banking information, and a plethora of other types of information in the internet's history. ICMP redirect Attacks can also be used as a gateway to siphon information to a malicious server for large scale data theft as well as set the stage for Man-in-the-middle Attacks. This lab aims to show you how ICMP Redirect Attacks work so that in your own work or career, you will be able to identify patterns and signatures associated with this specific attack and other web-based attacks.`
        },
        {
            title: "Step 1: Start the Lab Environment",
            content: `Start the SEED Labs containerized environment:

dcbuild   # Build the container images
dcup      # Start the containers
dockps    # List running containers and their IDs

To access attacker and victim containers:

docksh <attacker-container-ID>
docksh <victim-container-ID>`
        },
        {
            title: "Step 2: Check Victim's Routing Table",
            content: `Inside the victim container, check the routing table:

ip route

Expected output:

default via 10.9.0.1 dev eth0
10.9.0.0/24 dev eth0 proto kernel scope link src 10.9.0.5
192.168.60.0/24 via 192.168.60.11 dev eth0`
        },
        {
            title: "Step 3: Launch the ICMP Redirect Attack",
            content: `From the attacker container, run:

python3 icmp_redirect.py

This spoofs an ICMP redirect to make the victim route via a malicious router.`
        },
        {
            title: "Step 4: Verify the Attack",
            content: `Check routing cache on the victim:

ip route show cache

Expected output:

192.168.60.5 via 10.9.0.111 dev eth0
cache <redirected> expires 296sec

Use traceroute to confirm:

mtr -n 192.168.60.5`
        },
        {
            title: "Step 5: Clean Up",
            content: `Flush cache and stop containers:

ip route flush cache
dcdown`
        },
        {
            title: "Conclusion",
            content: `Congratulations for completing the ICMP Redirect Attack lab!

You’ve learned how attackers can exploit ICMP messages to manipulate traffic routing, and how to identify and mitigate such attacks. While these attacks mainly affect LANs, understanding them helps build awareness for broader cybersecurity knowledge.`
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

    const handleSave = () => {
        localStorage.setItem('lab2Progress', currentSection);
        setIsSaved(true);
        alert(`Progress saved! You are on section: ${sections[currentSection].title}`);
    };

    const handleQuit = () => {
        if (!isSaved) {
            const confirmQuit = window.confirm(
                "Are you sure you want to quit? Your progress will be lost if you haven't saved."
            );
            if (!confirmQuit) return;
        }
        navigate('/mainmenu');
        setIsSaved(false);
    };

    return (
        <div className="lab-container">
            <div className="lab-left">
                <h2>Lab 2: Packet Sniffing and Spoofing</h2>
                <VMPage
                    viewOnly={false}
                    shouldReconnect={true}
                    password={process.env.REACT_APP_VM_PASSWORD}
                />
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
                    <button className="save-button" onClick={handleSave}>Save</button>
                    <button className="quit-button" onClick={handleQuit}>Quit</button>
                </div>
            </div>
        </div>
    );
};

export default Lab2;
