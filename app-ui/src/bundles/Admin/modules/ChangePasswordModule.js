// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export type RequestState = {
  isPending: boolean
}

export type ChangePasswordForm = {
  oldPassword: string,
  password: string,
}

export const modelPath: string = 'admin.changePassword.data';
export const requestState: RequestState = { isPending: false };
export const formState: ChangePasswordForm = {
  oldPassword: '',
  password: '',
};

export const changePassword = createAction('ADMIN_CHANGE_PASSWORD');
export const changePasswordPending = createAction('ADMIN_CHANGE_PASSWORD_PENDING');
export const changePasswordFulfilled = createAction('ADMIN_CHANGE_PASSWORD_FULFILLED');
export const changePasswordRejected = createAction('ADMIN_CHANGE_PASSWORD_REJECTED');

export default combineReducers({
  request: handleActions({
    [changePasswordPending]: () => ({ isPending: true }),
    [changePasswordFulfilled]: () => ({ isPending: false }),
    [changePasswordRejected]: () => ({ isPending: false }),
  }, requestState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
