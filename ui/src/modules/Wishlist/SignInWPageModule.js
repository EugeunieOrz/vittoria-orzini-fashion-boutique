// @flow
import { createAction, handleActions } from 'redux-actions';

export const signInWPageState = {
  signInWIsShown: false
}

export const openMyWishlist = createAction('OPEN_MY_WISHLIST');
export const openSignInW = createAction('OPEN_SIGN_IN_TO_WISHLIST_MODAL');
export const proceedToRecoverPasswordPage = createAction('PROCEED_TO_RECOVER_PASSWORD_PAGE');
export const proceedToSignUpPage = createAction('PROCEED_TO_SIGN_UP_PAGE');
export const toggleSignInW = createAction('TOGGLE_SIGN_IN_W');
export const toggleSignInWToFalse = createAction('TOGGLE_SIGN_IN_W_TO_FALSE');

export default handleActions({
  [toggleSignInW]: (state, action) => ({...state, signInWIsShown: !state.signInWIsShown }),
  [toggleSignInWToFalse]: (state, action) => ({...state, signInWIsShown: false }),
}, signInWPageState);
