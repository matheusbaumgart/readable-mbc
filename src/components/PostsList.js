import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Link
} from 'react-router-dom'
import { showPosts, changeSorting, changeOrder } from '../actions'
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

    handleOrder = (option) => {
        const { changeOrder } = this.props;
        changeOrder(option.target.value)
    }

    render() {
        const { posts, orderBy, showAdd = true } = this.props
        var filteredPosts = posts;

        // Ordering by Lowest to Highest Score
        if (orderBy === 'date') {
            filteredPosts = posts.sort(function (a, b) { return b.timestamp - a.timestamp; })
        } else {
            filteredPosts = posts.sort(function (a, b) { return b.voteScore - a.voteScore; })            
        }

        return (
            <div>
                <div className="flex space-between">
                    <div>
                        {showAdd && <AddPostModal />}
                    </div>

                    <div>
                        <span>Order by </span>
                        <select onChange={this.handleOrder} name="orderBy" placeholder="order by">
                            <option value="vote">Vote</option>
                            <option value="date">Date</option>
                        </select>
                    </div>
                </div>

                <table className="post-list">
                    <thead>
                        <tr>
                            <th>Vote</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.map((post) => (
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

function mapStateToProps({ posts, sortBy, orderBy }) {
    return (
        {
            posts,
            sortBy,
            orderBy
        }
    )
}

function mapDispatchToProps(dispatch) {
    return {
        showPosts: (posts) => { dispatch(showPosts(posts)) },
        changeSorting: (sortBy) => { dispatch(changeSorting(sortBy)) },
        changeOrder: (orderBy) => { dispatch(changeOrder(orderBy)) },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostsList)