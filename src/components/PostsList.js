import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Link
} from 'react-router-dom'
import { showPosts } from '../actions'
import { getPosts } from '../utils/api'
import AddPostModal from '../components/AddPostModal'

import Moment from 'react-moment';
import 'moment-timezone';

class PostsList extends Component {
    componentWillMount() {
        const { showPosts, category } = this.props;

        getPosts(category)
            .then((posts) => {
                showPosts(posts)
            })
    }

    render() {
        const { posts, showAdd = true, category } = this.props

        return (
            <div>
                {showAdd && <AddPostModal />}

                <table className="post-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.title}>
                                <td>
                                    {post.voteScore}
                                </td>
                                <td>
                                    <Link to={{ pathname: post.category + '/' + post.id, }}>
                                        {post.title}
                                    </Link>
                                </td>
                                <td>
                                    {post.category}
                                </td>
                                <td>
                                    <Moment format="YYYY/MM/DD HH:mm">{post.timestamp}</Moment>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps({ posts }) {
    return (
        {
            posts
        }
    )
}

function mapDispatchToProps(dispatch) {
    return {
        showPosts: (data) => { dispatch(showPosts(data)) },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostsList)