// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type PasswordFormState = {
  passwordFormIsShown: boolean
}

export const pfState: PasswordFormState = { passwordFormIsShown: false };

export const togglePasswordForm = createAction('ADMIN_TOGGLE_PASSWORD_FORM');

export default combineReducers({
  passwordModal: handleAction(
    togglePasswordForm,
    (pfState, action) => ({
      passwordFormIsShown: !pfState.passwordFormIsShown
    }),
     pfState
  ),
});
