import React, { useState, useEffect, useRef } from "react";
import "../Styles/Home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const CustomSlider = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 4 >= movies.length ? 0 : prevIndex + 4
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, movies.length - 4) : prevIndex - 4
    );
  };

  useEffect(() => {
    const autoPlay = setInterval(handleNext, 3000);
    return () => clearInterval(autoPlay);
  }, [currentIndex, movies]);

  const visibleMovies = movies.slice(
    currentIndex,
    currentIndex + 4
  );

  return (
    <div className="slider-container">
      {movies.length > 0 ? (
        <>
          <button className="slider-button prev" onClick={handlePrev}>
            ◀
          </button>
          <div className="slider">
            {visibleMovies.map((movie) => (
              <div key={movie.id} className="slider-item">
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="slider-image"
                  />
                </Link>
              </div>
            ))}
          </div>
          <button className="slider-button next" onClick={handleNext}>
            ▶
          </button>
        </>
      ) : (
        <ClipLoader color="blue" loading={true} size={50} />
      )}
    </div>
  );
};


const Home = () => {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjZhMDZhYjc0MTRmZGIyYWQ1NzkxMTI2NjEzZTFkMiIsIm5iZiI6MTczNzgwNTM1OS43MTUwMDAyLCJzdWIiOiI2Nzk0Y2UyZmI1MDBmYzdjYTMxODNhNTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VrwGdH5dd0zU0OklB-qqkvB5BJsiTmQMSxp_ckMPiUk",
        },
      };

      try {
        const nowPlayingURL = "https://api.themoviedb.org/3/movie/now_playing";
        const nowPlayingResponse = await axios.get(nowPlayingURL, options);
        setNowPlayingMovies(nowPlayingResponse.data.results);

        const topRatedURL = "https://api.themoviedb.org/3/movie/top_rated";
        const topRatedResponse = await axios.get(topRatedURL, options);
        setTopRatedMovies(topRatedResponse.data.results);
      } catch (err) {
        console.error("Error fetching movies:", err);
        setError("Failed to fetch movies.");
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="parent">
      <div className="div1">
        {error ? (
          <p>{error}</p>
        ) : nowPlayingMovies.length > 0 ? (
          <div className="carousel-container">
            {nowPlayingMovies.slice(0, 5).map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="movie-poster-home"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="carousel-image"
                />
              </Link>
            ))}
          </div>
        ) : (
          <ClipLoader color="blue" loading={true} size={50} />
        )}
      </div>

      {/* Slider de Top Rated Movies */}
      <div className="home-container">
      <h2>Top Rated Movies</h2>
      {error ? <p>{error}</p> : <CustomSlider movies={topRatedMovies} />}
    </div>
    </div>
  );
};

export default Home;



