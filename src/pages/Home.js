import React, { Component } from 'react';

import PostsList from '../components/PostsList'
import CategoriesList from '../components/CategoriesList'

class HomePage extends Component {

    render() {
        return (
            <div>
                <h2>Categories</h2>
                <CategoriesList />

                <hr />

                <h2>Posts</h2>
                <PostsList />
            </div>
        )
    }
}

export default HomePage