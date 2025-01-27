import React from 'react';
import '../Styles/About.css';
import moldyLogo from '../assets/moldy2.PNG';
import {Link} from "react-router-dom";

const About = () => {
  return (
    <div className="about-container">
      <div className="logo-div">
        <Link to="/home">
        <img className="moldy-logo-about" src={moldyLogo} alt="Moldy Tomatoes Logo" />
        </Link>
      </div>
      <p>
        Welcome to <strong>Moldy Tomatoes</strong>, the ultimate destination for movie enthusiasts! 
        Whether you're looking for the latest blockbusters, hidden gems, or fan-favorite classics, 
        we've got you covered.
      </p>

      <h2>What We Offer</h2>
      <ul className='offer-list'>
        <li><strong>Discover Popular Movies:</strong> Stay updated on trending movies around the globe.</li>
        <li><strong>Search for Your Favorites:</strong> Quickly find movies by title or keyword.</li>
        <li><strong>Share Your Thoughts:</strong> Leave reviews and ratings, and see what others think.</li>
        <li><strong>Explore Genres:</strong> Dive into movies categorized by your favorite genres.</li>
      </ul>

      <h2>Our Story</h2>
      <p>
        Moldy Tomatoes was born out of a love for movies and a desire to create a space where film fans can come together to share their opinions. 
        Powered by cutting-edge technology and the <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">TMDB API</a>, 
        our platform is designed to bring you a seamless movie-browsing experience.
      </p>

      <h2>Technologies Used</h2>
      <p>
        This website is built using modern technologies, including React for the frontend, Node.js for backend integration, and the TMDB API for movie data.
      </p>

      <h2>Join Us</h2>
      <p>
        Dive into the world of movies, leave your reviews, and find your next favorite film! Sign up today and become part of our movie-loving community.
      </p>
    </div>
  );
};

export default About;
