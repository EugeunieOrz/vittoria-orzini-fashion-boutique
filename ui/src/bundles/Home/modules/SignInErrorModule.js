// @flow
import { createAction, handleActions } from 'redux-actions';

export const signInErrorState = {
  signInErrorIsShown: false
}

export const toggleSignInError = createAction('HOME_TOGGLE_SIGN_IN_ERROR');

export default handleActions({
  [toggleSignInError]: (state, action) => ({...state, signInErrorIsShown: !state.signInErrorIsShown }),
}, signInErrorState);
