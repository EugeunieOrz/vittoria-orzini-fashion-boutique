// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const editCardFormState = {
  isShown: false,
  index: 0
}

export const toggleEditCard = createAction('ACCOUNT_TOGGLE_EDIT_CARD_FORM');

export default handleActions({
  [toggleEditCard]: (state, action) =>
  ({ ...state, isShown: !state.isShown, index: action.payload }),
}, editCardFormState);
