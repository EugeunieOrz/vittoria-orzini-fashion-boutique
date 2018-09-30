// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type PasswdRadioBtnState = {
  isChecked: boolean
}

export const passwdRadioBtnState: PasswdRadioBtnState = { isChecked: false };

export const togglePasswdRadioBtn = createAction('AUTH_TOGGLE_BUTTON_FOR_PASSWORD_SURVEY');

export default combineReducers({
  passwdRadioBtn: handleAction(
    togglePasswdRadioBtn,
    (passwdRadioBtnState, action) => ({
      isChecked: !passwdRadioBtnState.isChecked
    }),
     passwdRadioBtnState
  ),
});
