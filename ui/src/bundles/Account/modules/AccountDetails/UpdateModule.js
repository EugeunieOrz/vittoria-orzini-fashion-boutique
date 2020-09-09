// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPending: boolean
}

export type SignUpForm = {
  bday: string,
  bmonth: string,
  byear: string,
}

export const modelPath: string = 'account.update.data';
export const requestState: RequestState = { isPending: false };
export const formState: DateOfBirthForm = {
  bday: '',
  bmonth: '',
  byear: '',
};

export const update = createAction('ACCOUNT_UPDATE');
export const updatePending = createAction('ACCOUNT_UPDATE_PENDING');
export const updateFulfilled = createAction('ACCOUNT_UPDATE_FULFILLED');
export const updateRejected = createAction('ACCOUNT_UPDATE_REJECTED');

export default combineReducers({
  request: handleActions({
    [updatePending]: () => ({ isPending: true }),
    [updateFulfilled]: () => ({ isPending: false }),
    [updateRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
