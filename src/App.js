import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar';
import Footer from './Components/Footer/Footer';
import MainPage from './Components/MainPage';
import UserDetails from "./Components/UserDetails";
import animationData from './loading-animation.json';
function App() {
  return (
    <>     
      

 
    
      <Router>
      <Navbar />
        <Routes>
    
        <Route path="/" element={<MainPage />} />
          <Route path="/user/:id" element={<UserDetails />} />
      
        </Routes>
        <Footer style={{ zIndex: 10 }} />
    </Router>
      </>

  );
}

export default App;
