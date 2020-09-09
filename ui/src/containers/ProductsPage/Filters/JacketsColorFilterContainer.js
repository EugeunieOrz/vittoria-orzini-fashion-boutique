import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { showColors } from 'modules/ItemCategories/ColorsModule';
import { chooseColor, resetColor } from 'modules/ItemCategories/ColorCategoriesModule';
import JacketsColorFilter from 'components/ProductsPage/Filters/JacketsColorFilter';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  colorIsShown: state.showColors.colorIsShown,
  colorCategory: state.handleColor.colorCategory,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  chooseColor: color => dispatch(chooseColor(color)),
  resetColor: () => dispatch(resetColor()),
  showColors: () => dispatch(showColors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(JacketsColorFilter));
