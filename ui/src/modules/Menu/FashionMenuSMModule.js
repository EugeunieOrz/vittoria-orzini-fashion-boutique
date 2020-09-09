// @flow
import { createAction, handleActions } from 'redux-actions';

export const toggleFashionMenuSMState = {
  isShown: false
}

export const toggleFashionMenuSM = createAction('TOGGLE_FASHION_MENU_SM');

export default handleActions({
  [toggleFashionMenuSM]: (state) => ({...state, isShown: !state.isShown }),
}, toggleFashionMenuSMState);
