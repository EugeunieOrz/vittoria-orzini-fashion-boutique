// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';
import zxcvbn from 'zxcvbn';

export const passwordStrengthState = {
  score: ''
}

export const checkPasswordStrength = createAction('ACCOUNT_CHECK_PASSWORD_STRENGTH');

export default handleActions({
  [checkPasswordStrength]: (state, action) => ({...state, score: zxcvbn(action.payload).score + '' }),
}, passwordStrengthState);
