import React from "react";
import { Link } from "react-router-dom";
import "./LandingButtons.css";

const LandingButtons = props => {
    return (
        <div className="buttonWrapper">
            <div>
                <Link to="/register" className="btn">
                    <button className="button arrow">Sign Up</button>
                </Link>
            </div>
            <div>
                <Link to="/login" className="btn">
                    <button className="button email">Login</button>
                </Link>
            </div>
        </div>
    );
};
export default LandingButtons;
