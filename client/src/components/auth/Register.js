import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { registerUser } from "../../store/actions/authActions";

import "./Register.css";

class Register extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        password2: "",
        agreePolicy: false,
        errors: {}
    };

    componentDidUpdate(prevProps) {
        if (this.props.errors !== prevProps.errors) {
            this.setState({ errors: this.props.errors });
        }
    }

    onChangeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onPolicyChange = () => {
        this.setState({
            agreePolicy: !this.state.agreePolicy
        });
    };

    onSubmitHandler = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            agreePolicy: this.state.agreePolicy
        };

        this.props.initRegisterUser(newUser, this.props.history);
    };

    render() {
        return (
            <div className="registerWrap">
                <div className="registerForm">
                    <form onSubmit={e => this.onSubmitHandler(e)}>
                        <div className="row">
                            <h4>Account</h4>
                            <div className="input-group input-group-icon">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full Name"
                                    value={this.state.name}
                                    onChange={e => this.onChangeHandler(e)}
                                />
                                <div className="input-icon">
                                    <i className="fa fa-user" />
                                </div>
                                {this.state.errors.name ? (
                                    <div className="regFormNameError">{this.state.errors.name}</div>
                                ) : null}
                            </div>
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
                                    <div className="regFormEmailError">{this.state.errors.email}</div>
                                ) : null}
                                {this.state.errors.userExists ? (
                                    <div className="loginFormUserNotFoundError">{this.state.errors.userExists}</div>
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
                                    <div className="regFormPasswordError">{this.state.errors.password}</div>
                                ) : null}
                            </div>
                            <div className="input-group input-group-icon">
                                <input
                                    type="password"
                                    placeholder="Repeat Password"
                                    name="password2"
                                    value={this.state.password2}
                                    onChange={e => this.onChangeHandler(e)}
                                />
                                <div className="input-icon">
                                    <i className="fa fa-key" />
                                </div>
                                {this.state.errors.password2 ? (
                                    <div className="regFormPassword2Error">{this.state.errors.password2}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="row">
                            <h4>Terms and Conditions</h4>
                            <div className="input-group">
                                <input type="checkbox" id="terms" onChange={this.onPolicyChange} />
                                <label htmlFor="terms">
                                    I accept the terms and conditions for signing up to this service, and hereby confirm
                                    I have read the privacy policy.
                                </label>
                                {this.state.errors.agreePolicy ? (
                                    <div className="regFormAgreePolicyError">{this.state.errors.agreePolicy}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="row buttonSubmitReg">
                            <button className="button arrowReg">Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    initRegisterUser: PropTypes.func.isRequired,
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
        initRegisterUser: (newUser, history) => dispatch(registerUser(newUser, history))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
