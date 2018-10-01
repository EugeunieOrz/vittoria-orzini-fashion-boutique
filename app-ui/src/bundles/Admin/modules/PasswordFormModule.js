// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type PasswordFormState = {
  isShown: boolean
}

export const pfState: PasswordFormState = { isShown: false };

export const togglePasswordForm = createAction('ADMIN_TOGGLE_PASSWORD_FORM');

export default combineReducers({
  passwordModal: handleAction(
    togglePasswordForm,
    (pfState, action) => ({
      isShown: !pfState.isShown
    }),
     pfState
  ),
});
