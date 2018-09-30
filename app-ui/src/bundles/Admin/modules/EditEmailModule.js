// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPending: boolean
}

export type EditEmailForm = {
  email: string,
  password: string,
}

export const modelPath: string = 'admin.editEmail.data';
export const requestState: RequestState = { isPending: false };
export const formState: EditEmailForm = {
  email: '',
  password: '',
}

export const editEmail = createAction('ADMIN_EDIT_EMAIL');
export const editEmailPending = createAction('ADMIN_EDIT_EMAIL_PENDING');
export const editEmailFulfilled = createAction('ADMIN_EDIT_EMAIL_FULFILLED');
export const editEmailRejected = createAction('ADMIN_EDIT_EMAIL_REJECTED');

export default combineReducers({
  request: handleActions({
    [editEmailPending]: () => ({ isPendingEditEmail: true }),
    [editEmailFulfilled]: () => ({ isPendingEditEmail: false }),
    [editEmailRejected]: () => ({ isPendingEditEmail: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
