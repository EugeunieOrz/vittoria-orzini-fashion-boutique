import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { getUserID } from 'selectors/UserSelector';
import { modelPath, changePassword } from 'bundles/Account/modules/AccountDetails/ChangePasswordModule';
import { togglePasswordForm } from 'bundles/Account/modules/AccountDetails/PasswordFormModule';
import { toggleMask } from 'bundles/Account/modules/AccountDetails/MaskModule';
import { toggleMask2 } from 'bundles/Account/modules/AccountDetails/MaskModule2';
import { checkPasswordStrength } from 'bundles/Account/modules/AccountDetails/PasswordModule';
import ChangePassword from 'bundles/Account/components/AccountDetails/ChangePassword';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state    The application state.
 * @param {Object} ownProps The props passed to the component.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  userID: getUserID(state),
  score: state.account.checkPasswordStrength.score,
  isHidden: state.account.toggleMask.isHidden,
  isHidden2: state.account.toggleMask2.isHidden2,
  form: state.account.changePassword.form,
  ...state.account.changePassword.request,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @param {Object} ownProps   The props passed to the component.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = (dispatch) => ({
  onCheckPasswordStrength: password => dispatch(checkPasswordStrength(password)),
  onToggleMask: () => dispatch(toggleMask()),
  onToggleMask2: ()  => dispatch(toggleMask2()),
  onUpdate: (userID, data) => dispatch(changePassword({userID, data})),
  componentDidMount: () => dispatch(actions.reset(modelPath)),
  togglePasswordForm: () => dispatch(togglePasswordForm()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(ChangePassword));
