import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {changeCurrCategory} from '../actions';

class CategoriesList extends Component {
  render() {
    const {categories, currCategory, _changeCurrCategory} = this.props;

    return (
      <div>
        <h2>Categories</h2>
        <div>
          <Link to="/"
            className={"category-link " +
                       (currCategory === "" ? "curr-category" : "")}
            onClick={() => _changeCurrCategory('')}>
            ALL
          </Link>
          {categories.map((category) => (
            <Link to={"/" + category.path}
              key={category.path}
              className={"category-link " +
                         (currCategory === category.path ? "curr-category" : "")}
              onClick={() => _changeCurrCategory(category.path)}>
              {category.name}
            </Link>)
          )}
        </div>
      </div>
    )
  }
}

function mapStateToProps({ categories, currCategory }) {
  return {
    categories: categories,
    currCategory: currCategory,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    _changeCurrCategory: (data) => dispatch(changeCurrCategory(data)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesList);