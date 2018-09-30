// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPendingEditName: boolean
}

export type EditNameForm = {
  title: string,
  firstName: string,
  lastName: string,
}

export const modelPathEditName: string = 'admin.editName.data';
export const requestState: RequestState = { isPendingEditName: false };
export const formState: EditNameForm = {
  title: '',
  firstName: '',
  lastName: '',
}

export const editName = createAction('ADMIN_EDIT_NAME');
export const editNamePending = createAction('ADMIN_EDIT_NAME_PENDING');
export const editNameFulfilled = createAction('ADMIN_EDIT_NAME_FULFILLED');
export const editNameRejected = createAction('ADMIN_EDIT_NAME_REJECTED');

export default combineReducers({
  request: handleActions({
    [editNamePending]: () => ({ isPendingEditName: true }),
    [editNameFulfilled]: () => ({ isPendingEditName: false }),
    [editNameRejected]: () => ({ isPendingEditName: false }),
  }, requestState),
  form: formReducer(modelPathEditName, formState),
  data: modelReducer(modelPathEditName, formState),
});
