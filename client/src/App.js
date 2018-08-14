import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";

import { authCheckState } from "./store/actions/authActions";
import { connect } from "react-redux";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Landing from "./components/layout/Landing";
import PrivateFeed from "./components/layout/PrivateFeed";
import Collections from "./components/layout/Collections";
import Friends from "./components/layout/Friends";
import Profile from "./components/layout/Profile";
import PublicFeed from "./components/layout/PublicFeed";
import Logout from "./components/layout/Logout";

class App extends Component {
    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            const token = localStorage.getItem("jwtToken");
            if (token) {
                this.props.onTryAutoSignUp(token);
            }
        }
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        {this.props.auth.isAuthenticated ? (
                            <Switch>
                                <Route exact path="/" component={PrivateFeed} />
                                <Route path="/collections" component={Collections} />
                                <Route exact path="/friends" component={Friends} />
                                <Route path="/profile" component={Profile} />
                                <Route exact path="/logout" component={Logout} />
                            </Switch>
                        ) : (
                            <Switch>
                                <Route exact path="/" component={Landing} />
                                <Route exact path="/featured" component={PublicFeed} />
                                <Route exact path="/register" component={Register} />
                                <Route exact path="/login" component={Login} />
                            </Switch>
                        )}
                    </div>
                    <Footer />
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignUp: token => dispatch(authCheckState(token))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
