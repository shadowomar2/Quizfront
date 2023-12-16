import React from 'react';
 
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
  
        <div className="copywrite">
          <p>
           X©X {new Date().getFullYear()} All rights not Unreserved | Eng.Omar Hamsho
          </p>
        </div>
 
    </footer>
  );
}

export default Footer;