import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import lifecycle from 'components/Lifecycle';
import { modelPath, signUp } from 'bundles/Auth/modules/SignUpModule';
import { toggleMask } from 'bundles/Auth/modules/MaskModule';
import { checkPasswordStrength } from 'bundles/Auth/modules/PasswordModule';
import { toggleSignInWToFalse } from 'modules/Wishlist/SignInWPageModule';
import { getShoppingBag } from 'selectors/ShoppingSelector';
import SignUp from 'bundles/Auth/components/SignUp';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */

const mapStateToProps = state => ({
  score: state.auth.checkPasswordStrength.score,
  isHidden: state.auth.toggleMask.isHidden,
  shoppingBag: getShoppingBag(state),
  form: state.auth.signUp.form,
  ...state.auth.signUp.request,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  onCheckPasswordStrength: password => dispatch(checkPasswordStrength(password)),
  onToggleMask: isHidden => dispatch(toggleMask(isHidden)),
  onSignUp: data => dispatch(signUp(data)),
  componentDidMount: () => dispatch(toggleSignInWToFalse()),
  componentWillUnmount: () => dispatch(actions.reset(modelPath)),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(SignUp));
