import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showCategories, showPosts } from '../actions'
import { getCategories, getPosts } from '../utils/api'

import {
    Link
} from 'react-router-dom'

import Moment from 'react-moment';
import 'moment-timezone';

class HomePage extends Component {
    componentWillMount() {
        const { showCategories, showPosts } = this.props;

        getCategories()
            .then((categories) => {
                showCategories(categories)
            })

        getPosts()
            .then((posts) => {
                showPosts(posts)
            })
    }

    render() {
        const { categories, posts } = this.props

        return (
            <div>
                <h3>Categories</h3>
                <ul className="category-list">
                    {categories.map((category) => (
                        <Link to={category.name}>
                            <li key={category.name}>
                                <p>{category.name}</p>
                            </li>
                        </Link>
                    ))}
                </ul>

                <hr />

                <h3>Posts</h3>
                <button>Add a new post</button>

                <table className="post-list">
                    <thead>
                        <tr>
                            <a href="#"><th>#</th></a>
                            <th>Title</th>
                            <a href="#"><th>Date</th></a>
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
                                    <Moment format="YYYY/MM/DD HH:mm">{post.timestamp}</Moment>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps({ categories, posts }) {
    return (
        {
            categories,
            posts
        }
    )
}

function mapDispatchToProps(dispatch) {
    return {
        showCategories: (data) => { dispatch(showCategories(data)) },
        showPosts: (data) => { dispatch(showPosts(data)) },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)