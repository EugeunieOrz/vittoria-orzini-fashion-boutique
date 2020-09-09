import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { getUserFirstName } from 'selectors/UserSelector';
import { toggleClosingAccount } from 'bundles/Account/modules/AccountDetails/ClosingAccountModule';
import AccountDashboard from 'bundles/Account/components/AccountDashboard';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  addNewAddressIsShown: state.account.toggleAddNewAddress.isShown,
  addNewCardIsShown: state.account.toggleAddNewCard.isShown,
  closingAccountAlertIsShown: state.account.toggleClosingAccount.isShown,
  editAddressIsShown: state.account.toggleEditAddress.isShown,
  editCardIsShown: state.account.toggleEditCard.isShown,
  editEmailIsShown: state.account.toggleEmail.isShown,
  editNameIsShown: state.account.toggleName.isShown,
  isShown: state.account.toggleBDate.isShown,
  isShownRemoveAddress: state.account.showRemoveAddressModal.isShown,
  isShownRemoveCard: state.account.showRemoveCardModal.isShown,
  passwordFormIsShown: state.account.togglePasswordForm.isShown,
  profileActiveKey: state.account.toggleProfileActiveKey.activeKey,
  userFirstName: getUserFirstName(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = (dispatch) => ({
  toggleClosingAccount: () => dispatch(toggleClosingAccount()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(AccountDashboard));
