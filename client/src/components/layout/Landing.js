import React, { Component } from "react";
import LandingButtons from "./LandingButtons";
import "./Landing.css";

class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <div className="backBg">
                    <img src="" alt="" />
                </div>
                <div className="innerLanding">
                    <div>
                        <h1>World as classroom.</h1>
                        <p>Socialize Post Develop Create</p>
                    </div>
                    <hr />
                    <LandingButtons />
                </div>
            </div>
        );
    }
}

export default Landing;
