// @flow
import { createAction, handleActions } from 'redux-actions';

export const emailState = {
  email: ''
};

export const passEmail = createAction('AUTH_PASS_EMAIL');

export default handleActions({
  [passEmail]: (state, action) => ({ ...state, email: action.payload }),
}, emailState);
