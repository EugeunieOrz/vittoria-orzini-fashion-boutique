// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export const requestState = {
  isPendingSignInW: false
}

export type SignInWForm = {
  email: string,
  password: string,
  rememberMe: boolean,
}

export const modelPath: string = 'signInW.data';
export const formState: SignInWForm = {
  email: '',
  password: '',
  rememberMe: false,
};

export const signInW = createAction('SIGN_IN_TO_WISHLIST');
export const signInWPending = createAction('SIGN_IN_TO_WISHLIST_PENDING');
export const signInWFulfilled = createAction('SIGN_IN_TO_WISHLIST_FULFILLED');
export const signInWRejected = createAction('SIGN_IN_TO_WISHLIST_REJECTED');

export default combineReducers({
  request: handleActions({
    [signInWPending]: () => ({ isPending: true }),
    [signInWFulfilled]: () => ({ isPending: false }),
    [signInWRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
