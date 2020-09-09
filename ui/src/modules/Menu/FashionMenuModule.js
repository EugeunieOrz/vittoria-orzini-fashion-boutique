// @flow
import { createAction, handleActions } from 'redux-actions';

export const toggleFashionMenuState = {
  fashionMenuOpened: false
}

export const toggleFashionMenu = createAction('TOGGLE_FASHION_MENU');

export const openFashionMenu = createAction('OPEN_FASHION_MENU');
export const closeFashionMenu = createAction('CLOSE_FASHION_MENU');

export default handleActions({
  [openFashionMenu]: (state) => ({...state, fashionMenuOpened: true }),
  [closeFashionMenu]: (state) => ({...state, fashionMenuOpened: false }),
}, toggleFashionMenuState);
