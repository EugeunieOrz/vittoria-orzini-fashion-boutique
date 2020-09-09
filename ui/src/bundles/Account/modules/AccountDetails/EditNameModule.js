// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPendingEditName: boolean
}

export type EditNameForm = {
  title: string,
  firstName: string,
  lastName: string,
}

export const modelPathEditName: string = 'account.editName.data';
export const requestState: RequestState = { isPendingEditName: false };
export const formState: EditNameForm = {
  title: '',
  firstName: '',
  lastName: '',
}

export const editName = createAction('ACCOUNT_EDIT_NAME');
export const editNamePending = createAction('ACCOUNT_EDIT_NAME_PENDING');
export const editNameFulfilled = createAction('ACCOUNT_EDIT_NAME_FULFILLED');
export const editNameRejected = createAction('ACCOUNT_EDIT_NAME_REJECTED');

export default combineReducers({
  request: handleActions({
    [editNamePending]: () => ({ isPendingEditName: true }),
    [editNameFulfilled]: () => ({ isPendingEditName: false }),
    [editNameRejected]: () => ({ isPendingEditName: false }),
  }, requestState),
  form: formReducer(modelPathEditName, formState),
  data: modelReducer(modelPathEditName, formState),
});
