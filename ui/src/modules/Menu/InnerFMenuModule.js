// @flow
import { createAction, handleActions } from 'redux-actions';

export const toggleInnerFMenuState = {
  isShown: false
}

export const toggleInnerFMenu = createAction('TOGGLE_INNER_FASHION_MENU');

export default handleActions({
  [toggleInnerFMenu]: (state) => ({...state, isShown: !state.isShown }),
}, toggleInnerFMenuState);
