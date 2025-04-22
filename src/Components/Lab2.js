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
            content: `In this lab, you will learn about Packet Sniffing and Spoofing.
            Packet Sniffing is capturing network traffic to analyze it. Packet Spoofing is creating fake packets with forged source addresses to trick systems. This lab focuses on using Scapy and C programs to sniff and spoof ICMP and TCP packets, helping you understand network attacks like ICMP Redirect.`
        },
        {
            title: "Why does this matter?",
            content: `Packet Sniffing and Spoofing can let attackers steal data, redirect traffic, or fake responses, compromising network security. Learning these techniques helps you detect and prevent such attacks.`
        },
        {
            title: "Beginning the Lab",
            content: `Start the SEED Labs containerized environment:

dcbuild   # Build the container images
dcup      # Start the containers
dockps    # List running containers and their IDs

To access attacker and victim containers:

docksh <attacker-container-ID>
docksh <victim-container-ID>`
        },
        {
            title: "Step 1: Sniff ICMP Packets",
            content: `In the attacker container (hostB), capture ICMP packets using a premade Scapy script:

docksh <attacker-container-ID>
sudo python3 sniff_packets.py "icmp"

In the victim container (hostA), generate ICMP traffic:

docksh <victim-container-ID>
ping 8.8.8.8

Stop the script in hostB with Ctrl+C.

Result: Shows ICMP packets (e.g., Echo Requests/Replies to/from 8.8.8.8).`
        },
        {
            title: "Step 2: Sniff TCP Packets from Specific IP",
            content: `In the attacker container (hostB), capture TCP packets from 10.9.0.5 to port 23 (Telnet):

docksh <attacker-container-ID>
sudo python3 sniff_packets.py "tcp and src host 10.9.0.5 and port 23"

In the victim container (hostA), generate Telnet traffic:

docksh <victim-container-ID>
telnet 10.9.0.5 23

Stop the script in hostB with Ctrl+C.

Result: Shows TCP packets from 10.9.0.5 to port 23.`
        },
        {
            title: "Step 3: Spoof ICMP Packet",
            content: `In the attacker container (hostB), send a fake ICMP ping from 1.2.3.4 to 8.8.8.8 and verify with Wireshark:

docksh <attacker-container-ID>
sudo wireshark &

Set Wireshark filter: icmp and dst host 1.2.3.4

Run the spoofing script:

sudo python3 spoof_icmp.py

Close Wireshark with Ctrl+C.

Result: Wireshark shows Echo Reply from 8.8.8.8 to 1.2.3.4.`
        },
        {
            title: "Step 4: Implement Traceroute",
            content: `In the attacker container (hostB), map routers to 8.8.8.8 using ICMP:

docksh <attacker-container-ID>
sudo python3 traceroute_icmp.py

Stop the script with Ctrl+C.

Result: Lists router IPs (e.g., 10.9.0.1, 192.168.1.1) until 8.8.8.8.`
        },
        {
            title: "Step 5: Sniff and Spoof ICMP",
            content: `In the attacker container (hostB), fake ICMP replies for a nonexistent IP 1.2.3.4:

docksh <attacker-container-ID>
sudo python3 sniff_spoof_icmp.py

In the victim container (hostA), ping the fake IP:

docksh <victim-container-ID>
ping 1.2.3.4

Stop the script in hostB with Ctrl+C.

Result: ping shows replies as if 1.2.3.4 exists.`
        },
        {
            title: "Step 6: Sniff Telnet Data with C Program",
            content: `In the attacker container (hostB), capture Telnet data from 10.9.0.5 using a C program:

docksh <attacker-container-ID>
gcc -o sniffer sniffer.c -lpcap
sudo ./sniffer --telnet

In the victim container (hostA), start a Telnet session:

docksh <victim-container-ID>
telnet 10.9.0.5 23

Type "secret123" as a password.

Stop the program in hostB with Ctrl+C.

Result: Shows Telnet data, including "Password: secret123".`
        },
        {
            title: "Conclusion",
            content: `Congratulations for completing the Packet Sniffing and Spoofing lab!

You've learned how attackers use tools like Scapy and C programs to capture and fake network packets, such as ICMP pings and Telnet data. These skills help you understand network vulnerabilities and how to protect against attacks like ICMP Redirect.`
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
