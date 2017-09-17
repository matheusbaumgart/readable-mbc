import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Link
} from 'react-router-dom'
import { showPosts, changeSorting } from '../actions'
import { getPosts } from '../utils/api'
import AddPostModal from '../components/AddPostModal'
import { Field, reduxForm } from 'redux-form'

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

    handleSort(col) {
        const { changeSorting, sortBy } = this.props;

        if (col === 'voteScore') {
            if (sortBy === 'voteScoreHighest') {
                changeSorting('voteScoreLowest')
            }
            else {
                changeSorting('voteScoreHighest')
            }
        }
        if (col === 'date') {
            if (sortBy === 'mostRecent') {
                changeSorting('leastRecent')
            }
            else {
                changeSorting('mostRecent')
            }
        }
    }

    render() {
        const { posts, sortBy, showAdd = true, category } = this.props
        var filteredPosts = posts;

        // Ordering by Highest to Lowest Score
        if (sortBy === 'voteScoreHighest') {
            filteredPosts = posts.sort(function (a, b) { return b.voteScore - a.voteScore; })
        }

        // Ordering by Lowest to Highest Score
        if (sortBy === 'voteScoreLowest') {
            filteredPosts = posts.sort(function (a, b) { return a.voteScore - b.voteScore; })
        }

        // Ordering by Lowest to Highest Score
        if (sortBy === 'mostRecent') {
            filteredPosts = posts.sort(function (a, b) { return b.timestamp - a.timestamp; })
        }

        // Ordering by Lowest to Highest Score
        if (sortBy === 'leastRecent') {
            filteredPosts = posts.sort(function (a, b) { return a.timestamp - b.timestamp; })
        }

        return (
            <div>
                <div className="flex space-between">
                    <div>
                        {showAdd && <AddPostModal />}
                    </div>

                    <div>
                        <form>
                            <span>Order by </span>
                            <Field
                                name="orderBySelect"
                                component="select"
                                placeholder="order by"
                            >
                                <option value="react">Vote</option>
                                <option value="redux">Date</option>
                            </Field>
                        </form>
                    </div>
                </div>

                <table className="post-list">
                    <thead>
                        <tr>
                            <th className="th-filterable" onClick={() => this.handleSort('voteScore')}>Vote</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th className="th-filterable" onClick={() => this.handleSort('date')}>Date</th>
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

function mapStateToProps({ posts, sortBy }) {
    return (
        {
            posts,
            sortBy
        }
    )
}

function mapDispatchToProps(dispatch) {
    return {
        showPosts: (posts) => { dispatch(showPosts(posts)) },
        changeSorting: (sortBy) => { dispatch(changeSorting(sortBy)) },
    }
}

PostsList = connect(
    mapStateToProps,
    mapDispatchToProps
)(PostsList)

export default reduxForm({
    form: 'changeOrderBy' // a unique name for this form
})(PostsList);