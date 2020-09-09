import { connect } from 'react-redux';
import { history } from 'modules/LocationModule';
import lifecycle from 'components/Lifecycle';
import {
  proceedToShoppingBagFromAlert,
  toggleAddItemToBagAlert
} from 'modules/Shopping/AddItemToBagAlertModule';
import {
  selectItemCategory,
  selectItemCollectionType,
  selectItemDepartment,
  selectItemName,
  selectItemIndex
} from 'selectors/ItemSelector';
import { getUserID } from 'selectors/UserSelector';
import AddItemToBagAlert from 'components/Shopping/AddItemToBagAlert';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  isShown: state.addItemToBag.isShown,
  category: selectItemCategory(state),
  collection: selectItemCollectionType(state),
  department: selectItemDepartment(state),
  imgIndex: selectItemIndex(state),
  itemName: selectItemName(state),
  userID: getUserID(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  route: route => history.push(route),
  proceedToShoppingBag: userID => dispatch(proceedToShoppingBagFromAlert(userID)),
  toggleAddItemToBagAlert: () => dispatch(toggleAddItemToBagAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(AddItemToBagAlert));
