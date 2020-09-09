// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const creditCardState = {
  index: '0',
};

export const chooseCreditCard = createAction('ACCOUNT_CHOOSE_CREDIT_CARD');

export default handleActions({
  [chooseCreditCard]: (state, action) => ({ ...state, index: action.payload }),
}, creditCardState);
