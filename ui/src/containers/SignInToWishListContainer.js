import { connect } from 'react-redux';
import lifecycle from 'components/Lifecycle';
import { actions } from 'react-redux-form';
import { getShoppingBag } from 'selectors/ShoppingSelector';
import { modelPath, signInW } from 'modules/Wishlist/SignInWModule';
import {
  proceedToRecoverPasswordPage,
  proceedToSignUpPage,
  toggleSignInW,
  toggleSignInWToFalse
} from 'modules/Wishlist/SignInWPageModule';
import SignInToWishList from 'components/SignInToWishList';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  shoppingBag: getShoppingBag(state),
  signInWIsShown: state.toggleSignInW.signInWIsShown,
  form: state.signInW.form,
  ...state.signInW.request,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  componentWillUnmount: () => dispatch(actions.reset(modelPath)),
  onSignInW: data => dispatch(signInW(data)),
  proceedToRecoverPasswordPage: () => dispatch(proceedToRecoverPasswordPage()),
  proceedToSignUpPage: () => dispatch(proceedToSignUpPage()),
  toggleSignInW: () => dispatch(toggleSignInW()),
  toggleSignInWToFalse: () => dispatch(toggleSignInWToFalse()),
});

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(SignInToWishList));
