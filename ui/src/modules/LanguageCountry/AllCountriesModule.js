// @flow
import { createAction, handleActions } from 'redux-actions';

export const allCountriesState = {
  areShown: false
}

export const closeAllCountries = createAction('CLOSE_ALL_COUNTRIES');
export const toggleAllCountries = createAction('TOGGLE_ALL_COUNTRIES');

export default handleActions({
  [closeAllCountries]: (state, action) => ({...state, areShown: false }),
  [toggleAllCountries]: (state, action) => ({...state, areShown: !state.areShown }),
}, allCountriesState);
