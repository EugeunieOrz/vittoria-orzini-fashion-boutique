// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export const requestState = {
  isPending: false
}

export type SignInForm = {
  email: string,
  password: string,
  rememberMe: boolean,
}

export const modelPath: string = 'auth.signIn.data';
export const formState: SignInForm = {
  email: '',
  password: '',
  rememberMe: false,
};

export const signIn = createAction('AUTH_SIGN_IN');
export const signInPending = createAction('AUTH_SIGN_IN_PENDING');
export const signInFulfilled = createAction('AUTH_SIGN_IN_FULFILLED');
export const signInRejected = createAction('AUTH_SIGN_IN_REJECTED');

export default combineReducers({
  request: handleActions({
    [signInPending]: () => ({ isPending: true }),
    [signInFulfilled]: () => ({ isPending: false }),
    [signInRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
