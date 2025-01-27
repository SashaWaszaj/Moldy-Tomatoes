import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "../Styles/MovieList.css";

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const moviesPerPage = 36;

  // Fetch genres from TMDB API
  useEffect(() => {
    const getGenres = async () => {
      try {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjZhMDZhYjc0MTRmZGIyYWQ1NzkxMTI2NjEzZTFkMiIsIm5iZiI6MTczNzgwNTM1OS43MTUwMDAyLCJzdWIiOiI2Nzk0Y2UyZmI1MDBmYzdjYTMxODNhNTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VrwGdH5dd0zU0OklB-qqkvB5BJsiTmQMSxp_ckMPiUk'
            }
          };
        const URL = "https://api.themoviedb.org/3/genre/movie/list";
        const response = await axios.get(URL, options);
        setGenres(response.data.genres);
      } catch (err) {
        console.error("Error fetching genres:", err);
        setError("Failed to fetch genres.");
      }
    };

    getGenres();
  }, []);

  // Fetch movies based on search query or genre
  useEffect(() => {
    const getMovies = async () => {
      try {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjZhMDZhYjc0MTRmZGIyYWQ1NzkxMTI2NjEzZTFkMiIsIm5iZiI6MTczNzgwNTM1OS43MTUwMDAyLCJzdWIiOiI2Nzk0Y2UyZmI1MDBmYzdjYTMxODNhNTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VrwGdH5dd0zU0OklB-qqkvB5BJsiTmQMSxp_ckMPiUk'
            }
          };

        let URL;
        if (query) {
          URL = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`;
        } else if (selectedGenre) {
          URL = `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}`;
        } else {
          URL = "https://api.themoviedb.org/3/movie/popular";
        }

        const response = await axios.get(URL, options);
        setMovies(response.data.results);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to fetch movies.");
      }
    };

    getMovies();
  }, [query, selectedGenre]);

  // Calculate movies to display on the current page
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  // Calculate total pages
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="title-container">
        <h2>
          {query
            ? `Search Results for "${query}"`
            : selectedGenre
            ? "Movies by Genre"
            : "Popular Movies"}
        </h2>
        {error && <p className="error-message">{error}</p>}

        <div className="results-summary">
          {movies.length > 0 && (
            <p>
              Showing {indexOfFirstMovie + 1}–{Math.min(indexOfLastMovie, movies.length)} of{" "}
              {movies.length} results
            </p>
          )}
        </div>
      </div>

      <div className="main-container">
        <div className="side-menu">
          <h3>Genres</h3>
          <ul>
            {genres.map((genre) => (
              <li key={genre.id}>
                <button onClick={() => setSelectedGenre(genre.id)}>{genre.name}</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="movie-list-container">
          <div className="movie-list">
            {currentMovies.length > 0 ? (
              currentMovies.map((movie) => (
                <div key={movie.id} className="movie-item">
                  <div>
                    <Link to={`/movie/${movie.id}`} className="movie-title">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={`${movie.title} Poster`}
                        className="movie-poster"
                      />
                    </Link>
                  </div>
                  <div>
                    <Link to={`/movie/${movie.id}`} className="movie-title">
                      {movie.title}
                    </Link>
                    <div className="movie-rating">
                      <p>
                        TMDB Rating:{" "}
                        <span style={{ color: "rgb(175, 45, 45)" }}>{movie.vote_average}/10</span>
                      </p>
                    </div>
                    <Link to={`/movie/${movie.id}/reviews`}>
                      <button className="reviews-button">Read Reviews</button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-results">No movies available.</p>
            )}
          </div>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`page-button ${currentPage === index + 1 ? "active" : ""}`}
                aria-current={currentPage === index + 1 ? "page" : undefined}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
