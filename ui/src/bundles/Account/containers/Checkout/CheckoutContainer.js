import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { history } from 'modules/LocationModule';
import { getUser, getUserAddedItems, getUserAddresses, getCardWallet } from 'selectors/UserSelector';
import Checkout from 'bundles/Account/components/Checkout';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  addNewCardIsShown: state.account.toggleAddNewCard.isShown,
  editCardIsShown: state.account.toggleEditCard.isShown,
  addNewAddressIsShown: state.account.toggleAddNewAddress.isShown,
  editAddressIsShown: state.account.toggleEditAddress.isShown,
  addedItems: getUserAddedItems(state),
  addresses: getUserAddresses(state),
  cards: getCardWallet(state),
  user: getUser(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */

const mapDispatchToProps = dispatch => ({
  route: route => history.push(route),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(Checkout));
