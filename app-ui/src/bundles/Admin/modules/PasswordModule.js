// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';
import zxcvbn from 'zxcvbn';

export type PasswordStrengthState = {
  score: string
}

export const passwordStrengthState: PasswordStrengthState = { score: '' };

export const checkPasswordStrength = createAction('AUTH_CHECK_PASSWORD_STRENGTH');

export default combineReducers({
  passwordStrength: handleAction(
    checkPasswordStrength,
    (passwordStrengthState, action) => ({
      score: zxcvbn(action.payload).score + ''
    }),
     passwordStrengthState
  ),
});
