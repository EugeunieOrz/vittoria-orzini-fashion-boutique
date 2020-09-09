// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { combineReducers } from 'redux';
import { createAction, handleActions } from 'redux-actions';
import { formReducer, modelReducer } from 'react-redux-form';

export const requestCheckout3State = {
  isPending3: false
}

export type CheckoutForm3 = {
  firstName: string,
  lastName: string,
  additional: string,
  address: string,
  zipCode: string,
  city: string,
  country: string,
  province: string,
  email: string,
  telephone: string,
  code: string,
  name: string,
}

export const modelPath3: string = 'account.fillCheckoutData3.data';
export const formState3: CheckoutForm3 = {
  firstName: '',
  lastName: '',
  additional: '',
  address: '',
  zipCode: '',
  city: '',
  country: '',
  province: '',
  email: '',
  telephone: '',
  code: '',
  name: ''

};

export const proceedToCheckout = createAction('ACCOUNT_PROCEED_TO_CHECKOUT');
export const fillCheckoutData3 = createAction('ACCOUNT_FILL_CHECKOUT_DATA_3');
export const fillCheckoutData3Pending = createAction('ACCOUNT_FILL_CHECKOUT_DATA_3_PENDING');
export const fillCheckoutData3Fulfilled = createAction('ACCOUNT_FILL_CHECKOUT_DATA_3_FULFILLED');
export const fillCheckoutData3Rejected = createAction('ACCOUNT_FILL_CHECKOUT_DATA_3_REJECTED');

export default combineReducers({
  request: handleActions({
    [fillCheckoutData3Pending]: () => ({ isPending3: true }),
    [fillCheckoutData3Fulfilled]: () => ({ isPending3: false }),
    [fillCheckoutData3Rejected]: () => ({ isPending3: false }),
  }, requestCheckout3State),
  form3: formReducer(modelPath3, formState3),
  data: modelReducer(modelPath3, formState3),
});
