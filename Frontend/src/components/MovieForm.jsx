import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MovieForm = () => {
    const [formValues, setFormValues] = useState({
        title: "",
        image: null,
        description: "",
        trailerURL: "",
        name: "",
        rating: 0,
        review: "",
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormValues({ ...formValues, image: file });

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (!formValues.title || !formValues.image || !formValues.description) {
            setError("Please fill in all required fields.");
            return;
        }

        const formData = new FormData();
        formData.append("title", formValues.title);
        formData.append("image", formValues.image);
        formData.append("description", formValues.description);
        formData.append("trailerURL", formValues.trailerURL);
        formData.append("name", formValues.name);
        formData.append("rating", formValues.rating);
        formData.append("review", formValues.review);

        try {
            await axios.post("http://localhost:8080/movie/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            navigate("/movies");
        } catch (error) {
            console.error("Error submitting form:", error);
            setError("Failed to submit form.");
        }

        setFormValues({
            title: "",
            image: null,
            description: "",
            trailerURL: "",
            name: "",
            rating: 0,
            review: "",
        });
        setPreviewImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleFocus = () => {
        setError("");
    };

    return (
        <div>
            <h2>Submit a Movie and a Review</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={onSubmitHandler}>
                <div>
                    <label htmlFor="title">Movie title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formValues.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="image">Image:</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handleImageChange}
                        onFocus={handleFocus}
                        ref={fileInputRef}
                    />
                </div>
                {previewImage && (
                    <div>
                        <img
                            src={previewImage}
                            alt="Preview"
                            style={{ maxWidth: "300px", maxHeight: "300px" }}
                        />
                    </div>
                )}
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formValues.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="trailer">Trailer Link:</label>
                    <input
                        type="text"
                        id="trailer"
                        name="trailerURL"
                        value={formValues.trailerURL}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="name">Your Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="rating">Rating:</label>
                    <input
                        type="number"
                        id="rating"
                        max={5}
                        name="rating"
                        value={formValues.rating}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="review">Your review:</label>
                    <input
                        type="text"
                        id="review"
                        name="review"
                        value={formValues.review}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Submit</button>
                <Link to="/movies">
                    <button type="button">Cancel</button>
                </Link>
            </form>
        </div>
    );
};

export default MovieForm;
