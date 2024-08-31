import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ReviewForm = () => {
    const [formValues, setFormValues] = useState({
        name: "",
        rating: 0,
        review: ""
    });
    const [movieTitle, setMovieTitle] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { _id } = useParams(); 

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/movie/${_id}`);
                setMovieTitle(response.data.title);
            } catch (error) {
                console.error("Error fetching movie title:", error);
                setError("Failed to fetch movie title.");
            }
        };

        if (_id) {
            fetchMovie();
        }
    }, [_id]);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        const newReview = {
            name: formValues.name,
            rating: formValues.rating,
            oneReview: formValues.review
        };
        try {
            const newObject = { review: [newReview] };
            await axios.put(`http://localhost:8080/movie/add/review/${_id}`, newObject);
            navigate(`/movie/reviews/${_id}`);
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("Failed to submit form.");
        }

        setFormValues({ name: "", rating: 0, review: "" });
    };

    return (
        <>
            <div style={{ borderStyle:"dotted", margin:"10px 100px", borderRadius:"30px", padding:"20px" }}>
                <h2 style={{ textAlign:"initial", margin:"5px 30px"}}>Add a review for {movieTitle || "Loading..."}</h2>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <form onSubmit={onSubmitHandler}>
                    <div style={{ textAlign:"initial", margin:"5px 30px"}}>
                        <label htmlFor="name" style={{ textAlign:"initial", margin:"5px 30px"}}>Your Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ textAlign:"initial", margin:"5px 30px"}}>
                        <label htmlFor="rating" style={{ textAlign:"initial", margin:"5px 47px"}}>Rating:</label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            max={5}
                            value={formValues.rating}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{ textAlign:"initial", margin:"5px 30px"}}>
                        <label htmlFor="review" style={{ textAlign:"initial", margin:"5px 30px"}}>Your review:</label>
                        <input
                            type="text"
                            id="review"
                            name="review"
                            value={formValues.review}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" style={{ textAlign:"left", margin:"5px 30px", cursor:"pointer", border: "1px solid black", padding: "8px", backgroundColor:"#6ecb48", color:"white", borderRadius:"10px" }}>Submit</button>
                    <Link to={`/movie/reviews/${_id}`}><button style={{ textAlign:"left", margin:"5px 30px", cursor:"pointer", border: "1px solid", padding: "8px", backgroundColor:"#d53c2a", color:"white", borderRadius:"10px" }}> Cancel </button></Link>
                </form>
            </div>
        </>
    );
};

export default ReviewForm;
