import React, { Component } from "react";
import { connect } from "react-redux";

class PublicFeed extends Component {
    render() {
        return <div>This is the public feed with posts.</div>;
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
)(PublicFeed);
