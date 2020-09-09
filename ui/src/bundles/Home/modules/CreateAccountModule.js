// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export const requestState = {
  isPending: false
}

export type CreateAccountForm = {
  title: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  ageLimit: boolean
}

export const modelPath: string = 'home.createAccount.data';
export const formState: CreateAccountForm = {
  title: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  ageLimit: false
};

export const createAccount = createAction('HOME_CREATE_ACCOUNT');
export const createAccountPending = createAction('HOME_CREATE_ACCOUNT_PENDING');
export const createAccountFulfilled = createAction('HOME_CREATE_ACCOUNT_FULFILLED');
export const createAccountRejected = createAction('HOME_CREATE_ACCOUNT_REJECTED');

export default combineReducers({
  request: handleActions({
    [createAccountPending]: () => ({ isPending: true }),
    [createAccountFulfilled]: () => ({ isPending: false }),
    [createAccountRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
