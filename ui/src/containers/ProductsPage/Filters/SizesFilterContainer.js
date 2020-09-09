import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { showSizes } from 'modules/ItemCategories/SizesModule';
import { chooseSize, resetSize } from 'modules/ItemCategories/SizeCategoriesModule';
import SizesFilter from 'components/ProductsPage/Filters/SizesFilter';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  sizeIsShown: state.showSizes.sizeIsShown,
  sizeCategory: state.handleSize.sizeCategory,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  chooseSize: size => dispatch(chooseSize(size)),
  resetSize: () => dispatch(resetSize()),
  showSizes: () => dispatch(showSizes()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(SizesFilter));
