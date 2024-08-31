import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MovieForm = () => {
    const [formValues, setFormValues] = useState({
        title: "",
        name: "",
        rating: 0,
        review: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
            const newMovie = { title: formValues.title, review: [newReview] };
            await axios.post("http://localhost:8080/movie/create", newMovie);
            navigate("/");
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("Failed to submit form.");
        }

        setFormValues({ title: "", name: "", rating: 0, review: "" });
    };

    return (
        <>
            <div style={{ borderStyle:"dotted", margin:"10px 100px", borderRadius:"30px", padding:"20px" }}>
                <h2 style={{ textAlign:"initial", margin:"5px 30px"}}>Submit a Movie and a Review</h2>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <form onSubmit={onSubmitHandler}>
                    <div style={{ textAlign:"initial", margin:"5px 30px"}}>
                        <label htmlFor="title" style={{ textAlign:"initial", margin:"5px 30px"}}>Movie title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formValues.title}
                            onChange={handleChange}
                        />
                    </div>
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
                            max={5}
                            name="rating"
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
                    <button type="submit" style={{ textAlign:"left", margin:"5px 30px", cursor:"pointer", border: "1px solid black", padding: "8px", backgroundColor:"#6ecb48", color:"white", borderRadius:"10px" }}>
                        Submit</button>
                    <Link to="/"><button style={{ textAlign:"left", margin:"5px 30px", cursor:"pointer", border: "1px solid", padding: "8px", backgroundColor:"#d53c2a", color:"white", borderRadius:"10px" }}>
                        Cancel</button></Link>
                </form>
            </div>
        </>
    );
};

export default MovieForm;

