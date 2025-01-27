import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import moldyLogo from '../assets/moldy2.PNG';
import '../styles/NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjZhMDZhYjc0MTRmZGIyYWQ1NzkxMTI2NjEzZTFkMiIsIm5iZiI6MTczNzgwNTM1OS43MTUwMDAyLCJzdWIiOiI2Nzk0Y2UyZmI1MDBmYzdjYTMxODNhNTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VrwGdH5dd0zU0OklB-qqkvB5BJsiTmQMSxp_ckMPiUk'
        }
      };

      const URL = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}`;
      const response = await axios.get(URL, options);

      if (response.data.results.length > 0) {
        navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`), { state: { movies: response.data.results } };
      } else {
        setError('No results found for your search.');
      }
    } catch (err) {
      console.error('Error searching movies:', err);
      setError('Failed to fetch search results. Please try again.');
    }
  };

  return (
    <nav className="main-div">
      <div className="logo-div">
        <Link to="/">
        <img className="moldy-logo" src={moldyLogo} alt="Moldy Tomatoes Logo" />
        </Link>
      </div>
      <div className="nav-links">
        <ul className="list">
          <li className="link-list"><Link to="/">HOME</Link></li>
          <li className="link-list"><Link to="/movies">MOVIES</Link></li>
          <li className="link-list"><Link to="/about">ABOUT</Link></li>
        </ul>
      </div>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="signup-login-box">
        <ul className="auth-buttons">
          <li>
            <button
              onClick={() => navigate(`/login`)}
              className="button-login" role="button">
              LOGIN
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate(`/sign-up`)}
              className="button-signup" role="button">
              SIGN UP
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
