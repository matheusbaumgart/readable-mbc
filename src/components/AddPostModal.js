import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showModal, hideModal, showCategories } from '../actions'
import Modal from 'react-modal'
import { Field, reduxForm } from 'redux-form'
import { addPost } from '../utils/api'
import { getCategories } from '../utils/api'

const modalStyles = {
    content: {
        width: '600px',
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: '#f1f1f1'
    }
}

class AddPostModal extends Component {

    constructor() {
        super();

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentWillMount() {
        const { showCategories } = this.props;

        getCategories()
            .then((categories) => {
                showCategories(categories)
            })
    }

    openModal() {
        this.props.showModal('ADD_POST_MODAL');
    }

    closeModal() {
        this.props.hideModal()
    }

    sendFormData = (post) => {
        addPost(post)
            .then(() => {
                console.log('====================================');
                console.log('Post added sucessfully');
                console.log('====================================');
            })
    }

    render() {
        const { modal, handleSubmit, pristine, submitting, categories } = this.props

        return (
            <div>
                <button onClick={this.openModal}>Add a new post</button>

                <Modal
                    isOpen={modal.modalProps.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={modalStyles}
                    contentLabel="Add post"
                >

                    <h2 className="no-margin-top">Add new post</h2>

                    <form onSubmit={handleSubmit(this.sendFormData)}>
                        <div className="input-group">
                            <label>Title</label>
                            <div>
                                <Field
                                    name="title"
                                    component="input"
                                    type="text"
                                    placeholder="Post Title"
                                />
                            </div>
                        </div>
                        <div className="input-group">
                            <label>Content</label>
                            <div>
                                <Field
                                    name="body"
                                    component="textarea"
                                    placeholder="Add your content here"
                                />
                            </div>
                        </div>
                        <div className="input-group ">
                            <label>Author</label>
                            <div>
                                <Field
                                    name="author"
                                    component="input"
                                    type="text"
                                    placeholder="Author"
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Category</label>
                            <div>
                                <Field
                                    name="category"
                                    component="select"
                                    placeholder="category"
                                >
                                    <option value=""></option>

                                    {categories.map((category) => (
                                        <option value={category.name} key={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </Field>
                            </div>
                        </div>

                        <br />

                        <div className="align-right">
                            <button className="button-border margin-right" onClick={this.closeModal}>
                                Cancel
                            </button>
                            <button type="submit" disabled={pristine || submitting}>
                                Create Post
                            </button>
                        </div>
                    </form>

                </Modal>
            </div>
        );
    }
}


function mapStateToProps({ modal, post, categories }) {
    return (
        {
            modal,
            post,
            categories
        }
    )
}

function mapDispatchToProps(dispatch) {
    return {
        showModal: (data) => { dispatch(showModal(data)) },
        hideModal: (data) => { dispatch(hideModal(data)) },
        showCategories: (data) => { dispatch(showCategories(data)) }
    }
}

AddPostModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddPostModal);

export default reduxForm({
    form: 'savePostForm' // a unique name for this form
})(AddPostModal);