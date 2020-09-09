import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { getJackets } from 'selectors/ProductsSelector';
import JacketsItems from 'components/ProductsPage/Filters/ItemsFound/JacketsItems';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  jackets: getJackets(state),
  size: state.handleSize.sizeCategory,
  color: state.handleColor.colorCategory,
  order: state.handleOrderCategory.orderCategory,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(JacketsItems));
