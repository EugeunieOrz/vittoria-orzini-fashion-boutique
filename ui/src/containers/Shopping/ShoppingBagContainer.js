import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { history } from 'modules/LocationModule';
import {
  changeSizeInGuestShoppingBag,
  changeQtyInGuestShoppingBag,
  removeItemFromGuestShoppingBag
} from 'modules/Product/ProductViewModule';
import { changeQtyInShoppingBag } from 'bundles/Account/modules/Shopping/ChangeQtyModule';
import { changeSizeInShoppingBag } from 'bundles/Account/modules/Shopping/ChangeSizeModule';
import { removeItemFromShoppingBag } from 'bundles/Account/modules/Shopping/RemoveItemModule';
import { getProducts } from 'selectors/ProductsSelector';
import { getShoppingBag } from 'selectors/ShoppingSelector';
import { getUserAddedItems, getUserID } from 'selectors/UserSelector';
import ShoppingBag from 'components/Shopping/ShoppingBag';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  userShoppingBag: getUserAddedItems(state),
  shoppingBag: getShoppingBag(state),
  products: getProducts(state),
  userID: getUserID(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  changeSizeInShoppingBag: (data) => dispatch(changeSizeInShoppingBag(data)),
  changeQtyInShoppingBag: (data) => dispatch(changeQtyInShoppingBag(data)),
  removeItemFromShoppingBag: (data) => dispatch(removeItemFromShoppingBag(data)),
  changeSizeInGuestShoppingBag: (data) => dispatch(changeSizeInGuestShoppingBag(data)),
  changeQtyInGuestShoppingBag: (data) => dispatch(changeQtyInGuestShoppingBag(data)),
  removeItemFromGuestShoppingBag: (data) => dispatch(removeItemFromGuestShoppingBag(data)),
  route: route => history.push(route),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(ShoppingBag));
