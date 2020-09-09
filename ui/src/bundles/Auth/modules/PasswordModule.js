// @flow
import { createAction, handleActions } from 'redux-actions';
import zxcvbn from 'zxcvbn';

export const passwordStrengthState = {
  score: ''
}

export const checkPasswordStrength = createAction('ADMIN_CHECK_PASSWORD_STRENGTH');

export default handleActions({
  [checkPasswordStrength]: (state, action) => ({ ...state, score: zxcvbn(action.payload).score + '' }),
}, passwordStrengthState);
