import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../Styles/MovieDetails.css";

const MovieDetails = () => {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState("");
    const { _id } = useParams(); // Parámetro dinámico de la ruta
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`https://moldy-tomatoes.onrender.com/reviews/${_id}`);
                setReviews(response.data.reviews);
            } catch (err) {
                console.error("Error fetching reviews:", err);
                setError("Failed to load reviews.");
            }
        };

        fetchReviews();
    }, [_id]);

    // Calculate the average rating from reviews
    const calculateAverageRating = () => {
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
        return (totalRating / reviews.length).toFixed(1); // Rounded to one decimal place
    };

    useEffect(() => {
        if (_id) {
            const getMovie = async () => {
                try {
                    const options = {
                        method: "GET",
                        headers: {
                            accept: "application/json",
                            Authorization:
                                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjZhMDZhYjc0MTRmZGIyYWQ1NzkxMTI2NjEzZTFkMiIsIm5iZiI6MTczNzgwNTM1OS43MTUwMDAyLCJzdWIiOiI2Nzk0Y2UyZmI1MDBmYzdjYTMxODNhNTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VrwGdH5dd0zU0OklB-qqkvB5BJsiTmQMSxp_ckMPiUk",
                        },
                    };
                    const URL = `https://api.themoviedb.org/3/movie/${_id}`;
                    const response = await axios.get(URL, options);
                    setMovie(response.data); // Guardamos la película en el estado
                } catch (error) {
                    console.log("Error fetching movie:", error);
                    setError("Failed to fetch movie.");
                }
            };
            getMovie();
        }
    }, [_id]);

    return (
        <div className="movie-details-container">
            {movie ? (
                <div>
                    <div className="movie-container">
                        <div>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </div>
                        <div className="movie-information-bar">
                            <h3>{movie.title}</h3>
                            <p>
                                Runtime:{" "}
                                <span style={{ fontWeight: "bold" }}>
                                    {movie.runtime}min.
                                </span></p>
                            <div className="description">
                                <p>{movie.overview}</p>
                            </div>
                            <p className="homepage-section">
                                Homepage:{" "}
                                <a
                                    href={movie.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="homepage-link"
                                >
                                    {movie.homepage || "Not Available"}
                                </a>
                            </p>
                            <p>
                                Release Date:{" "}
                                <span style={{ fontWeight: "bold" }}>
                                    {movie.release_date}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="no-details-message">Sorry, no information about this movie.</p>
            )}
            <div className='review-list-container'>
            <h2 className='title-review'>Reviews</h2>
            <p>Have you seen this movie? <Link to={`/review/form/${_id}`} className="add-review-link">
                Add Review
            </Link></p>
            
            {error && <div className='error'>{error}</div>}

            {reviews.length > 0 ? (
                <>
                    <div className='average-rating'>
                        <h3>Average Rating: {calculateAverageRating()}/10</h3>
                    </div>
                    <ul className='main-list'>
                        {reviews.map((review) => (
                            <li className="list-item" key={review._id}>
                                <p><strong>{review.author}</strong> {review.rating}/10</p>
                                <p>{review.content}</p>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                <p>No reviews yet. Be the first to share your thoughts!</p>
            )}
        </div>
        </div>
    );
};

export default MovieDetails;
