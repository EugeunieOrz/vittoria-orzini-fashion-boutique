// @flow
import { createAction, handleActions } from 'redux-actions';

export const addItemToBagAlertState = {
  isShown: false
}

export const proceedToShoppingBagFromAlert = createAction('PROCEED_TO_SHOPPING_BAG_FROM_ALERT');
export const toggleAddItemToBagAlert = createAction('TOGGLE_ADD_ITEM_TO_BAG_ALERT');

export default handleActions({
  [toggleAddItemToBagAlert]: (state, action) => ({...state, isShown: !state.isShown }),
}, addItemToBagAlertState);
