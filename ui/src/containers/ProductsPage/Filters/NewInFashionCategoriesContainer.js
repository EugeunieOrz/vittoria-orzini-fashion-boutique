import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { showNFCategories } from 'modules/ItemCategories/NFShowCategoriesModule';
import { chooseNFCategory, resetNFCategory } from 'modules/ItemCategories/NFCategoriesModule';
import { getNewInFashionCategories } from 'selectors/CategorySelector';
import NewInFashionCategories from 'components/ProductsPage/Filters/NewInFashionCategories';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  newInFashionCategoryIsShown: state.showNFCategories.newInFashionCategoryIsShown,
  newInFashionCategory: state.handleNFCategory.newInFashionCategory,
  newInFashionCategories: getNewInFashionCategories(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  chooseNFCategory: event => dispatch(chooseNFCategory(event)),
  resetNFCategory: () => dispatch(resetNFCategory()),
  showNFCategories: () => dispatch(showNFCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(NewInFashionCategories));
