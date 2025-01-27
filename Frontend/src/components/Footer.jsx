import React from "react";
import '../styles/Footer.css';
import moldyLogo from '../assets/moldy2.PNG';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="logo-div">
                <img className="moldy-logo" src={moldyLogo} alt="Moldy Tomatoes Logo" />
              </div>
      <div className="footer-bottom">
      <p>Powered by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB API</a></p>
        <p>© {new Date().getFullYear()} Moldy Tomatoes. All rights reserved.</p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;