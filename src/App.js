import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import RegistrationPage from './Components/RegistrationPage';
import Skills from './Components/Skills';
import UpdateSkills from './User/UpdateSkills'; // Import UpdateSkills component
import { MainMenu } from './Components/MainMenu';  // Named import
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import { Profile } from './User/Profile'; // Adjusted import
import VMPage from './Components/VMPage';
import Lab1 from './Components/Lab1'; // Import Lab1 component
import Lab2 from './Components/Lab2'; // Import Lab2 component
import FAQ from "./Components/FAQ"; // Import FAQ component
import AboutUs from "./Components/AboutUs"; // Import About Us component


const basename = process.env.PUBLIC_URL || '/cyberpattern.github.io';
const vmPassword = process.env.REACT_APP_VM_PASSWORD || '';

// Check for GitHub Pages redirect
const urlParams = new URLSearchParams(window.location.search);
const redirect = urlParams.get('redirect');
if (redirect) {
  window.history.replaceState(null, "", redirect);
}

function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/mainmenu" element={<MainMenu />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/update-skills" element={<UpdateSkills />} /> {/* Add UpdateSkills route */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faq" element={<FAQ />} /> {/* Add FAQ route */}
        <Route path="/about" element={<AboutUs />} /> {/* Add About Us route */}
        <Route
          path="/vm-access"
          element={<VMPage
            viewOnly={false}
            shouldReconnect={true}
            password={vmPassword}
          />}
        />
        <Route path="/lab1" element={<Lab1 />} /> {/* Add Lab1 route */}
        <Route path="/lab2" element={<Lab2 />} /> {/* Add Lab1 route */}
      </Routes>
    </Router>
  );
}

export default App;
