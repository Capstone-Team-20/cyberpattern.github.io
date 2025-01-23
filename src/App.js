import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';  
import RegistrationPage from './Components/RegistrationPage';
import Skills from './Components/Skills';
import { MainMenu } from './Components/MainMenu';  // Named import

function App() {
  return (
    <Router basename="/cyberpattern.github.io">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/mainmenu" element={<MainMenu />} />
        <Route path="/skills" element={<Skills />} />
      </Routes>
    </Router>
  );
}

export default App;
