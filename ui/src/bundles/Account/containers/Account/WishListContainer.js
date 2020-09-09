import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { history } from 'modules/LocationModule';
import { addWItemToBag } from 'bundles/Account/modules/Wishlist/AddWItemToBagModule';
import { setLastItemAlert } from 'bundles/Account/modules/Wishlist/LastItemAlertFormModule';
import { removeItemFromWishlist } from 'bundles/Account/modules/Wishlist/RemoveItemFromWishlistModule';
import {
  getUserID,
  getUserNotifications,
  getUserWishlist
} from 'selectors/UserSelector';
import WishList from 'bundles/Account/components/Account/WishList';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  userID: getUserID(state),
  wishlist: getUserWishlist(state),
  notifications: getUserNotifications(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  addWItemToBag: data => dispatch(addWItemToBag(data)),
  removeItemFromWishlist: product => dispatch(removeItemFromWishlist(product)),
  setLastItemAlert: (item) => dispatch(setLastItemAlert(item)),
  route: route => history.push(route),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(WishList));
