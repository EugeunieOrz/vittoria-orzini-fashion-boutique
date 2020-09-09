// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export const requestCheckout2State = {
  isPending2: false
}

export type CheckoutForm2 = {
  cardNumber: string,
  month: string,
  year: string,
  code: string,
  name: string
}

export const modelPath2: string = 'account.fillCheckoutData2.data';
export const formState2: CheckoutForm2 = {
  cardNumber: '',
  month: '',
  year: '',
  code: '',
  name: ''
};

export const fillCheckoutData2 = createAction('ACCOUNT_FILL_CHECKOUT_DATA_2');
export const fillCheckoutData2Pending = createAction('ACCOUNT_FILL_CHECKOUT_DATA_2_PENDING');
export const fillCheckoutData2Fulfilled = createAction('ACCOUNT_FILL_CHECKOUT_DATA_2_FULFILLED');
export const fillCheckoutData2Rejected = createAction('ACCOUNT_FILL_CHECKOUT_DATA_2_REJECTED');

export default combineReducers({
  request: handleActions({
    [fillCheckoutData2Pending]: () => ({ isPending2: true }),
    [fillCheckoutData2Fulfilled]: () => ({ isPending2: false }),
    [fillCheckoutData2Rejected]: () => ({ isPending2: false }),
  }, requestCheckout2State),
  form2: formReducer(modelPath2, formState2),
  data: modelReducer(modelPath2, formState2),
});
