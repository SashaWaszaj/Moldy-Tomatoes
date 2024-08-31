import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const getMovies = async () => {
            try {
                const URL = "http://localhost:8080/movie";
                const response = await axios.get(URL);
                setMovies(response.data);
            } catch (error) {
                console.log("Error fetching movies:", error);
                setError("Failed to fetch movies.");
            }
        };
        getMovies();
    }, []);

    return (
        <div style={{ borderStyle:"dotted", margin:"10px 100px", borderRadius:"30px" }}>
            <div style={{ display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", margin:"5px 30px"  }}>
                <h2>Movie List</h2>
                <nav>
                    <Link to="/movie/form" style={{ color:"black", borderRadius:"10px", borderStyle:"solid", backgroundColor:"#6495ED", textDecoration:"none", padding:"5px 20px" }}>Add new movie</Link>
                </nav>
            </div >
            <div style= {{marginRight:"50px"}}>
                {error && <div style={{ color: "red" }}>{error}</div>}
                <table style={{ width: "100%", borderCollapse: "collapse", margin: "10px 30px", padding:"20px" }}>
            <thead>
                <tr>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Movie Title</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}></th>
                </tr>
            </thead>
            <tbody>
                {movies.map((movie) => (
                    <tr key={movie._id}>
                        <td style={{ border: "1px solid #ddd", padding: "8px", textAlign:"left" }}>{movie.title}</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                            <Link to={`/movie/reviews/${movie._id}`}>
                                <button style={{ cursor:"pointer", border: "1px solid", padding: "8px", backgroundColor:"#6ecb48", color:"black", borderRadius:"10px" }}>Read reviews</button>
                            </Link>
                        </td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                            <Link to={`/review/form/${movie._id}`}>
                                <button style={{ cursor:"pointer", border: "1px solid black", padding: "8px", backgroundColor:"#6ecb48", color:"white", borderRadius:"10px" }} >Write a review</button>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
            </div>
        </div>
    );
};

export default MovieList;
