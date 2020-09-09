import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { getNewInFashionProducts } from 'selectors/ProductsSelector';
import NewInFashionItems from 'components/ProductsPage/Filters/ItemsFound/NewInFashionItems';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  newInFashionItems: getNewInFashionProducts(state),
  category: state.handleNFCategory.newInFashionCategory,
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

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(NewInFashionItems));
