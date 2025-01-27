import React from "react";
import "../Styles/Signup.css";

const SignUp = () => {
    const TMDB_SIGNUP_URL = "https://www.themoviedb.org/signup";

    return (
        <div className="signup-container">
            <h2>Create a TMDB Account</h2>
            <p>
                To use this app, you'll need a TMDB account. Click the button below to create your account.
            </p>
            <a
                href={TMDB_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="signup-button"
            >
                Sign Up on TMDB
            </a>
        </div>
    );
};

export default SignUp;
