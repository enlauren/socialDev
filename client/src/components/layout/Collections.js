import React, { Component } from "react";
import { connect } from "react-redux";

class Collections extends Component {
    render() {
        return <div>This is the collections page with posts saved.</div>;
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
)(Collections);
