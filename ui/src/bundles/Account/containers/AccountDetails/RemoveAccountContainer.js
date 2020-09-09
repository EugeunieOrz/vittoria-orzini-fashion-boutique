import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { getUserID } from 'selectors/UserSelector';
import {
  toggleClosingAccount,
  removeAccount
} from 'bundles/Account/modules/AccountDetails/ClosingAccountModule';
import RemoveAccount from 'bundles/Account/components/AccountDetails/RemoveAccount';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  closingAccountAlertIsShown: state.account.toggleClosingAccount.isShown,
  userID: getUserID(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = (dispatch) => ({
  toggleClosingAccount: () => dispatch(toggleClosingAccount()),
  onRemoveAccount: userID => dispatch(removeAccount(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(RemoveAccount));
