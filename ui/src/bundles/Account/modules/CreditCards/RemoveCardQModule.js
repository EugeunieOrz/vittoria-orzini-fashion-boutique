// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const removeCardModalState = {
  isShown: false,
  index: 0
}

export const removeCard = createAction('ACCOUNT_CONFIRM_REMOVING_OF_CARD');
export const showRemoveCardModal = createAction('ACCOUNT_SHOW_REMOVE_CARD_QUESTION');

export default handleActions({
  [showRemoveCardModal]: (state, action) =>
  ({ ...state, isShown: !state.isShown, index: action.payload }),
}, removeCardModalState);
