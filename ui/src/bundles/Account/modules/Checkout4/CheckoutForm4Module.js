// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export const requestCheckout4State = {
  isPending4: false
}

export type CheckoutForm2 = {
  code: string,
  name: string
}

export const modelPath4: string = 'account.fillCheckoutData4.data';
export const formState4: CheckoutForm4 = {
  code: '',
  name: ''
};

export const fillCheckoutData4 = createAction('ACCOUNT_FILL_CHECKOUT_DATA_4');
export const fillCheckoutData4Pending = createAction('ACCOUNT_FILL_CHECKOUT_DATA_4_PENDING');
export const fillCheckoutData4Fulfilled = createAction('ACCOUNT_FILL_CHECKOUT_DATA_4_FULFILLED');
export const fillCheckoutData4Rejected = createAction('ACCOUNT_FILL_CHECKOUT_DATA_4_REJECTED');

export default combineReducers({
  request: handleActions({
    [fillCheckoutData4Pending]: () => ({ isPending4: true }),
    [fillCheckoutData4Fulfilled]: () => ({ isPending4: false }),
    [fillCheckoutData4Rejected]: () => ({ isPending4: false }),
  }, requestCheckout4State),
  form4: formReducer(modelPath4, formState4),
  data: modelReducer(modelPath4, formState4),
});
