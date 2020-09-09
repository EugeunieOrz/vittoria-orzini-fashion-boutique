// @flow
import { createAction, handleActions } from 'redux-actions';

export const changeInnerCurrentKey2State = {
  currentKey: ""
}

export const innerDecorateOnToggle2 = createAction('INNER_DECORATE_ON_TOGGLE_2');
export const changeInnerCurrentKey2 = createAction('CHANGE_INNER_CURRENT_KEY_2');

export default handleActions({
  [changeInnerCurrentKey2]: (state, action) => ({...state, currentKey: action.payload }),
}, changeInnerCurrentKey2State);
