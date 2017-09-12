import React, { Component } from 'react';

class CategoryPage extends Component {
    render() {
        const categoryName = this.props.match.params.category;

        return (
            <div>
                <span>Showing all posts about</span>
                <h2 className="no-margin-top">{categoryName}</h2>
            </div>
        );
    }
}

export default CategoryPage;