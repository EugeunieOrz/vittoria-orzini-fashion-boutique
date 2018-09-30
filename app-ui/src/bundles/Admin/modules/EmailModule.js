// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type EmailState = {
  editEmailIsShown: boolean
}

export const emailState: EmailState = { editEmailIsShown: false };

export const toggleEmail = createAction('ADMIN_TOGGLE_EMAIL');

export default combineReducers({
  emailModal: handleAction(
    toggleEmail,
    (emailState, action) => ({
      editEmailIsShown: !emailState.editEmailIsShown
    }),
     emailState
  ),
});
