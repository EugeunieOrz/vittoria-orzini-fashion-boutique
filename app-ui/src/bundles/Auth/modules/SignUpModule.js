// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPending: boolean
}

export type SignUpForm = {
  title: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  updates: boolean,
  newsletterFashion: boolean,
  newsletterVintage: boolean,
  newsletterHomeCollection: boolean,
}

export const modelPath: string = 'auth.signUp.data';
export const requestState: RequestState = { isPending: false };
export const formState: SignUpForm = {
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  updates: false,
  newsletterFashion: false,
  newsletterVintage: false,
  newsletterHomeCollection: false,
};

export const signUp = createAction('AUTH_SIGN_UP');
export const signUpPending = createAction('AUTH_SIGN_UP_PENDING');
export const signUpFulfilled = createAction('AUTH_SIGN_UP_FULFILLED');
export const signUpRejected = createAction('AUTH_SIGN_UP_REJECTED');

export default combineReducers({
  request: handleActions({
    [signUpPending]: () => ({ isPending: true }),
    [signUpFulfilled]: () => ({ isPending: false }),
    [signUpRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
