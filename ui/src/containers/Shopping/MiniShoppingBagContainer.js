import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { toggleMiniBag } from 'modules/Shopping/MiniBagModule';
import { removeItemFromGuestBag } from 'modules/Shopping/RemoveItemGuestModule';
import { removeItemFromShoppingBag } from 'bundles/Account/modules/Shopping/RemoveItemModule';
import {
  proceedToCheckoutFromMiniBag,
  proceedToShoppingBagFromMiniBag
} from 'modules/Shopping/MiniBagModule';
import { getShoppingBag } from 'selectors/ShoppingSelector';
import { getUserAddedItems, getUserID } from 'selectors/UserSelector';
import MiniShoppingBag from 'components/Shopping/MiniShoppingBag';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  shoppingBag: getShoppingBag(state),
  addedItems: getUserAddedItems(state),
  userID: getUserID(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  proceedToCheckout: userID => dispatch(proceedToCheckoutFromMiniBag(userID)),
  proceedToShoppingBag: userID => dispatch(proceedToShoppingBagFromMiniBag(userID)),
  removeItemFromGuestBag: data => dispatch(removeItemFromGuestBag(data)),
  removeItemFromShoppingBag: data => dispatch(removeItemFromShoppingBag(data)),
  toggleMiniBag: () => dispatch(toggleMiniBag()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(MiniShoppingBag));
