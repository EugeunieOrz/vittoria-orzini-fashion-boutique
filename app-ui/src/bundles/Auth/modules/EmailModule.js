// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type EmailState = {
  email: string
}

export const emailState: EmailState = { email: '' };

export const passEmailToTheNextPage = createAction('AUTH_PASS_EMAIL_TO_THE_NEXT_PAGE');

export default combineReducers({
  emailContent: handleAction(
    passEmailToTheNextPage,
    (emailState, action) => ({
      email: action.payload
    }),
     emailState
  ),
});
