import React, { Component } from "react";
import { connect } from "react-redux";

class Friends extends Component {
    render() {
        return <div>This is the page with user`s friends.</div>;
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
)(Friends);
