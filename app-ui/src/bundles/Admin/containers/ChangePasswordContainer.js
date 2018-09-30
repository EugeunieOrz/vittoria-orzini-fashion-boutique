import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { getUserID } from 'selectors/UserSelector';
import { modelPath, changePassword } from 'bundles/Admin/modules/ChangePasswordModule';
import { toggleMask } from 'bundles/Admin/modules/MaskModule';
import { toggleMask2 } from 'bundles/Admin/modules/MaskModule2';
import { checkPasswordStrength } from 'bundles/Admin/modules/PasswordModule';
import ChangePassword from 'bundles/Admin/components/ChangePassword';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state    The application state.
 * @param {Object} ownProps The props passed to the component.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = (state) => ({
  userID: getUserID(state),
  score: state.admin.checkPasswordStrength.passwordStrength.score,
  isHidden: state.admin.toggleMask.mask.isHidden,
  isHidden2: state.admin.toggleMask2.mask2.isHidden2,
  form: state.admin.changePassword.form,
  ...state.admin.changePassword.request,
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
  onToggleMask: isHidden => dispatch(toggleMask(isHidden)),
  onToggleMask2: isHidden2 => dispatch(toggleMask2(isHidden2)),
  onUpdate: (userID, data) => dispatch(changePassword({userID, data})),
  componentWillUnmount: () => dispatch(actions.reset(modelPath)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(ChangePassword));
