import React, { Component } from 'react';
import { connect } from 'react-redux'

class Comments extends Component {
    componentWillMount() {
    }

    render() {
        return (
            <h1>Comments {this.props.postID}</h1>
        );
    }
}

function mapStateToProps({ }) {
    return ({

    })
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Comments)