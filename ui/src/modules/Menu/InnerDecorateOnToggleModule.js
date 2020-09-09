// @flow
import { createAction, handleActions } from 'redux-actions';

export const changeInnerCurrentKeyState = {
  currentKey: ""
}

export const innerDecorateOnToggle = createAction('INNER_DECORATE_ON_TOGGLE');
export const changeInnerCurrentKey = createAction('CHANGE_INNER_CURRENT_KEY');

export default handleActions({
  [changeInnerCurrentKey]: (state, action) => ({...state, currentKey: action.payload }),
}, changeInnerCurrentKeyState);
