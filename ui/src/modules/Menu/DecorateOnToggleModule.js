// @flow
import { createAction, handleActions } from 'redux-actions';

export const changeCurrentKeyState = {
  currentKey: ""
}

export const decorateOnToggle = createAction('DECORATE_ON_TOGGLE');
export const changeCurrentKey = createAction('CHANGE_CURRENT_KEY');

export default handleActions({
  [changeCurrentKey]: (state, action) => ({...state, currentKey: action.payload }),
}, changeCurrentKeyState);
