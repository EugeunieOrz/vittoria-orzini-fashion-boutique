// @flow
import { createAction, handleActions } from 'redux-actions';

export const toggleShippingState = {
  isShown: false
}

export const chooseShippingCountry = createAction('CHOOSE_SHIPPING_COUNTRY');
export const toggleShippingCountry = createAction('TOGGLE_SHIPPING_COUNTRY');
export const toggleShippingCountryList = createAction('TOGGLE_SHIPPING_COUNTRY_LIST');

export default handleActions({
  [toggleShippingCountry]: (state, action) => ({...state, isShown: !state.isShown }),
}, toggleShippingState);
