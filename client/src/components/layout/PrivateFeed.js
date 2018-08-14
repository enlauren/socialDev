import React, { Component } from "react";
import { connect } from "react-redux";

class PrivateFeed extends Component {
    render() {
        return <div>This is the private feed with posts from friends.</div>;
    }
}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateFeed);
