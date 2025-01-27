import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const API_KEY = "your_tmdb_api_key";

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Step 1: Get Request Token
            const tokenResponse = await axios.get(
                `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
            );
            const requestToken = tokenResponse.data.request_token;

            // Step 2: Validate Token with Username and Password
            await axios.post(
                `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`,
                {
                    username,
                    password,
                    request_token: requestToken,
                }
            );

            // Step 3: Create Session ID
            const sessionResponse = await axios.post(
                `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
                { request_token: requestToken }
            );

            const sessionId = sessionResponse.data.session_id;

            // Store session ID and navigate to the home page
            localStorage.setItem("sessionId", sessionId);
            navigate("/home");
        } catch (err) {
            setError("Invalid username or password. Please try again.");
            console.error("Login error:", err);
        }
    };

    return (
        <div className="login-container">
            <h2>Login to Moldy Tomatoes</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Link className="signup-link" to="/sign-up">Don't have an account yet? Sign up here!</Link>
                <button type="submit" className="login-button">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
