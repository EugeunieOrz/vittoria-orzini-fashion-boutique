import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { showRTWCategories } from 'modules/ItemCategories/RTWShowCategoriesModule';
import { chooseRTWCategory, resetRTWCategory } from 'modules/ItemCategories/RTWCategoriesModule';
import { getReadyToWearCategories } from 'selectors/CategorySelector';
import ReadyToWearCategories from 'components/ProductsPage/Filters/ReadyToWearCategories';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  rtwCategoryIsShown: state.showRTWCategories.rtwCategoryIsShown,
  readyToWearCategory: state.handleRTWCategory.readyToWearCategory,
  rtwCategories: getReadyToWearCategories(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  chooseRTWCategory: category => dispatch(chooseRTWCategory(category)),
  resetRTWCategory: () => dispatch(resetRTWCategory()),
  showRTWCategories: () => dispatch(showRTWCategories()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(ReadyToWearCategories));
