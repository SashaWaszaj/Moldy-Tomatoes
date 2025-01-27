import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../Styles/ReviewForm.css";

const ReviewForm = () => {
    const { movie_id } = useParams();
    const [movieTitle, setMovieTitle] = useState("");
    const [review, setReview] = useState({
        author: "",
        content: "",
        rating: 1,
    });
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview((prevReview) => ({
            ...prevReview,
            [name]: value,
        }));
    };

    useEffect(() => {
        const fetchMovieDetails = async () => {
          const API_URL = `https://api.themoviedb.org/3/movie/${movie_id}`;
          const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZjZhMDZhYjc0MTRmZGIyYWQ1NzkxMTI2NjEzZTFkMiIsIm5iZiI6MTczNzgwNTM1OS43MTUwMDAyLCJzdWIiOiI2Nzk0Y2UyZmI1MDBmYzdjYTMxODNhNTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VrwGdH5dd0zU0OklB-qqkvB5BJsiTmQMSxp_ckMPiUk'
            }
          };
    
          try {
            const response = await axios.get(API_URL, options);
            setMovieTitle(response.data.title); 
          } catch (err) {
            console.error("Error fetching movie details:", err);
            setMovieTitle("Unknown Movie");
          }
        };
    
        fetchMovieDetails();
      }, [movie_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const API_URL = "https://moldy-tomatoes.onrender.com/review/create";

        try {
            const response = await axios.post(API_URL, {
                movie_id, 
                author: review.author,
                content: review.content,
                rating: review.rating,
            });            
            console.log(response);
            setSuccessMessage("Review added successfully!");
            setReview({
                author: "",
                content: "",
                rating: 1,
            });
            navigate(`/movie/${movie_id}`)
        } catch (err) {
            console.error("Error adding review:", err);
            setError("Failed to add review. Please try again.");
        }
    };

    return (
        <div className="add-review-container">
            <h2>Add Review for {movieTitle}</h2>

            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="input-div">
                    <label htmlFor="author">Your Name:</label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={review.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="content">Review:</label>
                    <textarea
                        id="content"
                        name="content"
                        value={review.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-div">
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        name="rating"
                        value={review.rating}
                        onChange={handleChange}
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rate) => (
                            <option key={rate} value={rate}>
                                {rate}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <button className="submit-review-button"type="submit">Submit Review</button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
