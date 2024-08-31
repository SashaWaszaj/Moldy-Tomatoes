import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";

const ReviewList = (props) => {
    const [movie, setMovie] = useState({ review: [] });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { _id } = useParams(); 

    useEffect(() => {
        if (_id) {
            const getMovie = async () => {
                try {
                    const URL = `http://localhost:8080/movie/${_id}`;
                    const response = await axios.get(URL);
                    setMovie(response.data); 
                } catch (error) {
                    console.log("Error fetching movie:", error);
                    setError("Failed to fetch movie.");
                }
            };
            getMovie();
        }
    }, [_id]);

    const deleteMovie = async () => {
        try {
            const URL = `http://localhost:8080/movie/delete/${_id}`;
            await axios.delete(URL);
            props.deleteMovieFromList(_id);
            navigate("/");
        } catch (error) {
            console.log("Error deleting movie:", error);
            setError("Failed to delete movie.");
        }
    };

    return (
        <>
        <div style={{ borderStyle:"dotted", margin:"10px 100px", borderRadius:"30px", padding:"20px" }}>
            <h2 style={{ textAlign:"initial", margin:"5px 30px"}}>Reviews for {movie?.title || "Loading..."}</h2>
            {error && <div style={{ color: "red" }}>{error}</div>}
            {movie.review && movie.review.length > 0 ? 
            (<table style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Reviewer</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Rating</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Review</th>
                    </tr>
                </thead>
                <tbody>
                    {movie.review.map((review) => (
                        <tr key={review._id}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{review.name}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{review.rating}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{review.oneReview}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            ) : (
                <div>No reviews available</div>
            )}
            <div style={{ display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", margin:"5px 0px"}}>
                <button onClick={deleteMovie} style={{ cursor:"pointer", border: "1px solid", padding: "8px", backgroundColor:"#d53c2a", color:"white", borderRadius:"10px" }}>Delete Movie</button>
                <nav>
                    <Link to="/">Back to movies</Link>
                </nav>
                
            </div>
        </div>
        </>
    );
};

export default ReviewList;

