import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { selectPurchasedItems, selectOrderID } from 'selectors/ShoppingSelector';
import OrderConfirmation from 'bundles/Account/components/OrderConfirmation';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  orderID: selectOrderID(state),
  purchasedItems: selectPurchasedItems(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(OrderConfirmation));
