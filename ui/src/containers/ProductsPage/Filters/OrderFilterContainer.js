import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { showOrderCategories } from 'modules/ItemCategories/OrderCategoriesModule';
import { chooseOrderCategory, resetOrder } from 'modules/ItemCategories/OrderModule';
import OrderFilter from 'components/ProductsPage/Filters/OrderFilter';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  orderIsShown: state.showOrderCategories.orderIsShown,
  orderCategory: state.handleOrderCategory.orderCategory,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  chooseOrderCategory: event => dispatch(chooseOrderCategory(event)),
  showOrderCategories: () => dispatch(showOrderCategories()),
  resetOrder: () => dispatch(resetOrder()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(OrderFilter));
