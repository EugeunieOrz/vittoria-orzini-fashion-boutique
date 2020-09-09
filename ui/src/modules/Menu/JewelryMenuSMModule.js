// @flow
import { createAction, handleActions } from 'redux-actions';

export const toggleJewelryMenuSMState = {
  isShown: false
}

export const toggleJewelryMenuSM = createAction('TOGGLE_FINE_JEWELRY_MENU_SM');

export default handleActions({
  [toggleJewelryMenuSM]: (state) => ({...state, isShown: !state.isShown }),
}, toggleJewelryMenuSMState);
