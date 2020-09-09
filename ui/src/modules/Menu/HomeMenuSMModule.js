// @flow
import { createAction, handleActions } from 'redux-actions';

export const toggleHomeMenuSMState = {
  isShown: false
}

export const toggleHomeMenuSM = createAction('TOGGLE_HOME_COLLECTION_MENU_SM');

export default handleActions({
  [toggleHomeMenuSM]: (state) => ({...state, isShown: !state.isShown }),
}, toggleHomeMenuSMState);
