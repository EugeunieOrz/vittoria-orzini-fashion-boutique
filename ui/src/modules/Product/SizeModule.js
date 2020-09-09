// @flow
import { createAction, handleActions } from 'redux-actions';

export const sizeState = {
  size: ''
}

export const selectSize = createAction('SELECT_SIZE');
export const clearSize = createAction('CLEAR_SIZE');

export default handleActions({
  [clearSize]: state => ({...state, size: '' }),
  [selectSize]: (state, action) => ({...state, size: action.payload }),
}, sizeState);
