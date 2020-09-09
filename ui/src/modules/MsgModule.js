// @flow
import { createAction, handleActions } from 'redux-actions';

export const msgState = {
  isShown: false,
  msg: ''
}

export const openMsg = createAction('OPEN_MESSAGE');
export const showMsg = createAction('SHOW_MESSAGE');
export const toggleMsg = createAction('TOGGLE_MESSAGE');

export default handleActions({
  [showMsg]: (state, action) => ({...state, msg: action.payload }),
  [toggleMsg]: (state, action) => ({...state, isShown: !state.isShown }),
}, msgState);
