// @flow
import { createAction, handleActions } from 'redux-actions';

export const shoppingButtonState = {
  title: 'ADD TO SHOPPING BAG'
}

export const toggleShoppingBtnTitle = createAction('TOGGLE_SHOPPING_BUTTON_TITLE');
export const getBackShoppingBtnTitle = createAction('GET_BACK_SHOPPING_BUTTON_TITLE');

export default handleActions({
  [toggleShoppingBtnTitle]: (state) => ({ ...state, title: 'PLEASE CHOOSE SIZE' }),
  [getBackShoppingBtnTitle]: (state) => ({ ...state, title: 'ADD TO SHOPPING BAG' }),
}, shoppingButtonState);
