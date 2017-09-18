import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Link
} from 'react-router-dom'
import { showPosts, changeSorting, changeOrder } from '../actions'
import { getPosts, changeScore } from '../utils/api'
import AddPostModal from '../components/AddPostModal'

import { Icon } from 'react-fa'

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

    handleVoteUp = (e) => {
        changeScore(e.target.dataset.id, 'upVote');
    }
    
    handleVoteDown = (e) => {
        changeScore(e.target.dataset.id, 'downVote');
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.map((post) => (
                            <tr key={post.title}>
                                <td>
                                    <div className="vote-score">{post.voteScore}</div>
                                    &nbsp;<Icon data-id={post.id} onClick={this.handleVoteDown} className="vote-icon down" name="caret-down" />  
                                    &nbsp;<Icon data-id={post.id} onClick={this.handleVoteUp} className="vote-icon up" name="caret-up" />
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
                                <td>
                                    <button>Edit</button> &nbsp;
                                    <button>Delete</button>
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