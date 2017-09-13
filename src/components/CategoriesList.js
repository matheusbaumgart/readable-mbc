import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
    Link
} from 'react-router-dom'
import { showCategories } from '../actions'
import { getCategories } from '../utils/api'

class CategoriesList extends Component {
    componentWillMount() {
        const { showCategories } = this.props;

        getCategories()
            .then((categories) => {
                showCategories(categories)
            })
    }

    render() {
        const { categories } = this.props

        return (
                <ul className="category-list">
                    {categories.map((category) => (
                        <Link key={category.name} to={category.name}>
                            <li>
                                <p>{category.name}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
        );
    }
}

function mapStateToProps({ categories }) {
    return (
        {
            categories
        }
    )
}

function mapDispatchToProps(dispatch) {
    return {
        showCategories: (data) => { dispatch(showCategories(data)) },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesList)