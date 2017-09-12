import React, { Component } from 'react';
import { connect } from 'react-redux'
import { showCategories, showPosts, addPost, showModal, hideModal } from '../actions'
import { getCategories, getPosts } from '../utils/api'
import Modal from 'react-modal'

import {
    Link
} from 'react-router-dom'

import Moment from 'react-moment';
import 'moment-timezone';

const modalStyles = {
    content: {
        width: '600',
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class HomePage extends Component {

    constructor() {
        super();

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        const { showModal } = this.props
        showModal('ADD_POST_MODAL');
    }

    closeModal() {
        const { hideModal } = this.props
        hideModal()
    }

    componentWillMount() {
        const { showCategories, showPosts, showModal, closeModal } = this.props;

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
        const { categories, posts, modal } = this.props

        return (
            <div>
                <h2>Categories</h2>
                <ul className="category-list">
                    {categories.map((category) => (
                        <Link key={category.name} to={category.name}>
                            <li>
                                <p>{category.name}</p>
                            </li>
                        </Link>
                    ))}
                </ul>

                <hr />

                <h2>Posts</h2>
                <button onClick={this.openModal}>Add a new post</button>

                <table className="post-list">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
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
                                    <Moment format="YYYY/MM/DD HH:mm">{post.timestamp}</Moment>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal
                    isOpen={modal.modalProps.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={modalStyles}
                >

                    <h2 className="no-margin-top">Add new post</h2>
                    <button onClick={this.closeModal}>close</button>

                    <div>I am a modal</div>
                </Modal>

            </div>
        )
    }
}

function mapStateToProps({ categories, posts, modal }) {
    return (
        {
            categories,
            posts,
            modal
        }
    )
}

function mapDispatchToProps(dispatch) {
    return {
        showCategories: (data) => { dispatch(showCategories(data)) },
        showPosts: (data) => { dispatch(showPosts(data)) },
        showModal: (data) => { dispatch(showModal(data)) },
        hideModal: (data) => { dispatch(hideModal(data)) },
        addPost: (data) => { dispatch(addPost(data)) },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage)