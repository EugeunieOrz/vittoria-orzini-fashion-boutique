// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const addNewCardState = {
  isShown: false
}

export const toggleAddNewCard = createAction('ACCOUNT_TOGGLE_ADD_NEW_CARD');
export const toggleAddNewCard2AndFetchGeoloc = createAction('ACCOUNT_TOGGLE_CARD_AND_FETCH_GEOLOCATION_2')

export default handleActions({
  [toggleAddNewCard]: (state, action) => ({...state, isShown: !state.isShown }),
}, addNewCardState);
