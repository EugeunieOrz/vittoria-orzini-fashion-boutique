// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type EmailState = {
  isShown: boolean
}

export const emailState: EmailState = { isShown: false };

export const toggleEmail = createAction('ADMIN_TOGGLE_EMAIL');

export default combineReducers({
  emailModal: handleAction(
    toggleEmail,
    (emailState, action) => ({
      isShown: !emailState.isShown
    }),
     emailState
  ),
});
