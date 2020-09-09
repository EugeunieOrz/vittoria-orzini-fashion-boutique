// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const cardTypeState = {
  cardType: "VISA",
};

export const toggleCreditCardType = createAction('ACCOUNT_TOGGLE_CREDIT_CARD_TYPE');

export default handleActions({
  [toggleCreditCardType]: (state, action) => ({ ...state, cardType: action.payload }),
}, cardTypeState);
