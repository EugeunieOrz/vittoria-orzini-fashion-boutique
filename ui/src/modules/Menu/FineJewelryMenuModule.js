// @flow
import { createAction, handleActions } from 'redux-actions';

export const toggleFineJewelryMenuState = {
  fineJewelryMenuOpened: false
}

export const toggleFineJewelryMenu = createAction('TOGGLE_FINE_JEWELRY_MENU');

export const openFineJewelryMenu = createAction('OPEN_FINE_JEWELRY_MENU');
export const closeFineJewelryMenu = createAction('CLOSE_FINE_JEWELRY_MENU');

export default handleActions({
  [openFineJewelryMenu]: (state) => ({...state, fineJewelryMenuOpened: true }),
  [closeFineJewelryMenu]: (state) => ({...state, fineJewelryMenuOpened: false }),
}, toggleFineJewelryMenuState);
