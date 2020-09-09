// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const countryState = {
  country: ''
}

export const selectCountry = createAction('SELECT_COUNTRY');

export default handleActions({
  [selectCountry]: (state, action) => ({...state, country: action.payload }),
}, countryState);
