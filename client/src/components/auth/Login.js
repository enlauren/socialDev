import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../store/actions/authActions";

import "./Login.css";

class Login extends Component {
    state = {
        email: "",
        password: "",
        errors: {}
    };

    componentDidUpdate(prevProps) {
        if (this.props.errors !== prevProps.errors) {
            this.setState({ errors: this.props.errors });
        }

        if (this.props.auth.isAuthenticated !== prevProps.auth.isAuthenticated) {
            this.props.history.push("/feed");
        }
    }

    onChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmitHandler = e => {
        e.preventDefault();
        const logUser = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.initLoginUser(logUser, this.props.history);
    };

    render() {
        return (
            <div className="loginWrap">
                <div className="loginForm">
                    <form onSubmit={e => this.onSubmitHandler(e)}>
                        <div className="row">
                            <h4>Account</h4>
                            <div className="input-group input-group-icon">
                                <input
                                    type="email"
                                    placeholder="Email Adress"
                                    name="email"
                                    value={this.state.email}
                                    onChange={e => this.onChangeHandler(e)}
                                />
                                <div className="input-icon">
                                    <i className="fa fa-envelope" />
                                </div>
                                {this.state.errors.email ? (
                                    <div className="loginFormEmailError">{this.state.errors.email}</div>
                                ) : null}
                                {this.state.errors.userNotFound ? (
                                    <div className="loginFormUserNotFoundError">{this.state.errors.userNotFound}</div>
                                ) : null}
                            </div>
                            <div className="input-group input-group-icon">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={e => this.onChangeHandler(e)}
                                />
                                <div className="input-icon">
                                    <i className="fa fa-key" />
                                </div>
                                {this.state.errors.password ? (
                                    <div className="loginFormPasswordError">{this.state.errors.password}</div>
                                ) : null}
                                {this.state.errors.incorectPass ? (
                                    <div className="loginFormIncorectPassError">
                                        {this.state.errors.incorectPass}{" "}
                                        <span className="spanUnderline">Forgot Password?</span>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                        <div className="row buttonSubmitLogin">
                            <button className="button arrowLogin">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    initLoginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        auth: state.auth,
        errors: state.errors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initLoginUser: (newUser, history) => dispatch(loginUser(newUser, history))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
