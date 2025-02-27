import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';  
import RegistrationPage from './Components/RegistrationPage';
import Skills from './Components/Skills';
import { MainMenu } from './Components/MainMenu';  // Named import
import ForgotPassword from './Components/ForgotPassword'; 
import ResetPassword from './Components/ResetPassword'; 

const basename = process.env.PUBLIC_URL || '/cyberpattern.github.io';

function App() {
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/mainmenu" element={<MainMenu />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route 
            path="/vm-access" 
            element={<VMPage  
              viewOnly={false} 
              shouldReconnect={true} 
              password="capstone123"
            />}
          />
      </Routes>
    </Router>
  );
}

export default App;
