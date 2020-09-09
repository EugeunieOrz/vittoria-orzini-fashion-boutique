// @flow
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export const requestCheckEmailState = {
  isPending: false
}

export type CheckEmailForm = {
  email: string,
}

export const modelPath: string = 'home.checkEmail.data';
export const formState: CheckEmailForm = {
  email: '',
};

export const checkEmail = createAction('HOME_CHECK_EMAIL');
export const checkEmailPending = createAction('HOME_CHECK_EMAIL_PENDING');
export const checkEmailFulfilled = createAction('HOME_CHECK_EMAIL_FULFILLED');
export const checkEmailRejected = createAction('HOME_CHECK_EMAIL_REJECTED');

export default combineReducers({
  request: handleActions({
    [checkEmailPending]: () => ({ isPending: true }),
    [checkEmailFulfilled]: () => ({ isPending: false }),
    [checkEmailRejected]: () => ({ isPending: false }),
  }, requestCheckEmailState),
  form: formReducer(modelPath, formState),
  data: modelReducer(modelPath, formState),
});
