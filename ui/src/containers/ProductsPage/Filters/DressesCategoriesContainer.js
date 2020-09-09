import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { showCategories } from 'modules/ItemCategories/CategoriesModule';
import { chooseCategory, resetCategory } from 'modules/ItemCategories/FashionCategoriesModule';
import { getDressesCategories } from 'selectors/CategorySelector';
import DressesCategories from 'components/ProductsPage/Filters/DressesCategories';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  categoryIsShown: state.showCategories.categoryIsShown,
  fashionCategory: state.handleCategory.fashionCategory,
  dresses: getDressesCategories(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  chooseCategory: category => dispatch(chooseCategory(category)),
  resetCategory: () => dispatch(resetCategory()),
  showCategories: () => dispatch(showCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(DressesCategories));
