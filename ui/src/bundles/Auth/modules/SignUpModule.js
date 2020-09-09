// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export const requestState = {
  isPending: false
}

export type SignUpForm = {
  title: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  newsletterFashion: boolean,
  newsletterFineJewelry: boolean,
  newsletterHomeCollection: boolean,
  ageLimit: boolean
}

export const modelPath: string = 'auth.signUp.data';
export const formState: SignUpForm = {
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  newsletterFashion: false,
  newsletterFineJewelry: false,
  newsletterHomeCollection: false,
  ageLimit: false
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
