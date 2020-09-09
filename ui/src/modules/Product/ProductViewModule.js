// @flow
import { createAction, handleActions } from 'redux-actions';

export const imageStyleState = {
  backgroundPosition: '0% 0%'
};

export const handleImageStyle = createAction('HANDLE_IMAGE_STYLE');
export const handleMouseMove = createAction('HANDLE_MOUSE_MOVE');
export const switchToProductView = createAction('SWITCH_TO_PRODUCT_VIEW');

export const addProductToShoppingBag = createAction('ADD_PRODUCT_TO_SHOPPING_BAG');
export const addProductToGuestShoppingBag = createAction('ADD_PRODUCT_TO_GUEST_SHOPPING_BAG');

export const changeQtyInGuestShoppingBag = createAction('CHANGE_QUANTITY_IN_GUEST_SHOPPING_BAG');
export const changeSizeInGuestShoppingBag = createAction('CHANGE_SIZE_IN_GUEST_SHOPPING_BAG');
export const removeItemFromGuestShoppingBag = createAction('REMOVE_ITEM_FROM_GUEST_SHOPPING_BAG');

export default handleActions({
  [handleImageStyle]: (state, action) => ({...state, backgroundPosition: action.payload }),
}, imageStyleState);
