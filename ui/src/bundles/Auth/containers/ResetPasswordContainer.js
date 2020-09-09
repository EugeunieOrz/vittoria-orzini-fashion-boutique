import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, resetPassword, validatePasswordToken } from 'bundles/Auth/modules/ResetPasswordModule';
import { toggleMask } from 'bundles/Auth/modules/MaskModule';
import { checkPasswordStrength } from 'bundles/Auth/modules/PasswordModule';
import ResetPassword from 'bundles/Auth/components/ResetPassword';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state    The application state.
 * @param {Object} ownProps The props passed to the component.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = (state, ownProps) => ({
  score: state.auth.checkPasswordStrength.score,
  isHidden: state.auth.toggleMask.isHidden,
  token: ownProps.match.params.token,
  form: state.auth.resetPassword.form,
  ...state.auth.resetPassword.request,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @param {Object} ownProps   The props passed to the component.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
  onCheckPasswordStrength: password => dispatch(checkPasswordStrength(password)),
  onToggleMask: isHidden => dispatch(toggleMask(isHidden)),
  onReset: (token, data) => dispatch(resetPassword({ token, data })),
  componentDidMount: () => dispatch(validatePasswordToken(ownProps.match.params.token)),
  componentWillUnmount: () => dispatch(actions.reset(modelPath)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(ResetPassword));
