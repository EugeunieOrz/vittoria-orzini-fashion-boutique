// @flow
import { createAction, handleActions } from 'redux-actions';

export const miniBagState = {
  isShown: false
}

export const toggleMiniBag = createAction('TOGGLE_MINI_BAG');
export const toggleMiniBagFromMenu = createAction('TOGGLE_MINI_BAG_FROM_MENU');
export const proceedToCheckoutFromMiniBag = createAction('PROCEED_TO_CHECKOUT_FROM_MINIBAG');
export const proceedToShoppingBagFromMiniBag = createAction('PROCEED_TO_SHOPPING_BAG_FROM_MINIBAG');

export default handleActions({
  [toggleMiniBag]: (state, action) => ({...state, isShown: !state.isShown }),
}, miniBagState);
