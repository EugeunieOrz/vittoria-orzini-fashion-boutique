import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import {
  proceedToWishlist,
  toggleAddItemToWishlistAlert
} from 'bundles/Account/modules/Wishlist/AddItemToWishlistAlertModule';
import {
  selectWItemName,
  selectWItemIndex,
  selectWItemCategory,
  selectWItemCollectionType,
  selectWItemDepartment
} from 'selectors/ItemSelector';
import AddItemToWishlistAlert from 'bundles/Account/components/AddItemToWishlistAlert';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  isShown: state.account.toggleAddItemToWishlistAlert.isShown,
  imgIndex: selectWItemIndex(state),
  itemName: selectWItemName(state),
  category: selectWItemCategory(state),
  collection: selectWItemCollectionType(state),
  department: selectWItemDepartment(state)
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  proceedToWishlist: () => dispatch(proceedToWishlist()),
  toggleAddItemToWishlistAlert: () => dispatch(toggleAddItemToWishlistAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(AddItemToWishlistAlert));
