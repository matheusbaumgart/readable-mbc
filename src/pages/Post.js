import React, { Component } from 'react';
import { getPost } from '../utils/api'
import { connect } from 'react-redux'
import { showPost } from '../actions'

import Comments from '../components/Comments'

import Moment from 'react-moment';
import 'moment-timezone';

class PostPage extends Component {
    componentWillMount() {
        const postID = this.props.match.params.post_id;
        const { showPost } = this.props;

        getPost(postID).then((post) => {
            showPost(post)
        })
    }

    render() {
        const { post } = this.props
        const postID = this.props.match.params.post_id;

        return (
            <div>
                {postID === post.id &&
                    <div>
                        <h1 className="no-margin-bottom">{post.title}</h1>
                        <small>by {post.author} - <Moment fromNow>{post.timestamp}</Moment></small>

                        <p>{post.body}</p>
                    </div>
                }

                <Comments />
            </div>
        );
    }
}

function mapStateToProps({ post }) {
    return (
        {
            post
        }
    )
}

function mapDispatchToProps(dispatch) {
    return {
        showPost: (data) => { dispatch(showPost(data)) },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostPage)