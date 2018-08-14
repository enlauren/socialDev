import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./NavBar.css";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar flexRow">
                {this.props.isAuthenticated ? (
                    <div className="containerLeft flexRow">
                        <div className="navItem">
                            <Link className="navLink" to="/">
                                <i className="fab fa-connectdevelop" />
                                <span>Feed</span>
                            </Link>
                        </div>

                        <div className="navItem">
                            <Link className="navLink" to="/friends">
                                <i className="fas fa-user-friends" />
                                <span>Friends</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="containerLeft flexRow">
                        <div className="navItem">
                            <Link className="navLink" to="/">
                                <i className="fab fa-connectdevelop" />
                                <span>Connect</span>
                            </Link>
                        </div>

                        <div className="navItem">
                            <Link className="navLink" to="/featured">
                                <i className="fas fa-user-friends" />
                                <span>Feed</span>
                            </Link>
                        </div>
                    </div>
                )}
                {this.props.isAuthenticated ? (
                    <div className="containerRight flexRow">
                        <div className="navItem">
                            <Link className="navLink" to="/profile">
                                <img className="avatar" src={this.props.avatar} alt="profile" />
                                <span>Profile</span>
                            </Link>
                        </div>
                        <div className="navItem">
                            <Link className="navLink logout" to="/logout">
                                <i className="fas fa-sign-out-alt" />
                                <span>Logout</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="containerRight flexRow">
                        <div className="navItem">
                            <Link className="navLink" to="/register">
                                <i className="fas fa-user-plus" />
                                <span>Sign Up</span>
                            </Link>
                        </div>
                        <div className="navItem">
                            <Link className="navLink" to="/login">
                                <i className="fas fa-sign-in-alt" />
                                <span>Login</span>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        avatar: state.auth.user.avatar
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Navbar);
