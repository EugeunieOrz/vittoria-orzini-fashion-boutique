// @flow
import { createAction, handleActions } from 'redux-actions';

export const colorsState = {
  colorIsShown: false
}

export const showColors = createAction('SHOW_PRODUCT_COLORS');

export default handleActions({
  [showColors]: (state, action) => ({...state, colorIsShown: !state.colorIsShown }),
}, colorsState);
