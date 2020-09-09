import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { togglePasswordForm } from 'bundles/Account/modules/AccountDetails/PasswordFormModule';
import { toggleBDate } from 'bundles/Account/modules/AccountDetails/BDateModule';
import { toggleEmail } from 'bundles/Account/modules/AccountDetails/EmailModule';
import { toggleName } from 'bundles/Account/modules/AccountDetails/NameModule';
import {
  getUserName, getUserEmail, getUserBDate,
} from 'selectors/UserSelector';
import PersonalDetails from 'bundles/Account/components/AccountDetails/PersonalDetails';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  bdate: getUserBDate(state),
  userEmail: getUserEmail(state),
  userName: getUserName(state),
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  onToggleBDate: () => dispatch(toggleBDate()),
  onTogglePasswordForm: () => dispatch(togglePasswordForm()),
  onToggleEmail: () => dispatch(toggleEmail()),
  onToggleName: () => dispatch(toggleName()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(PersonalDetails));
