// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type MenuState = {
  isHidden: boolean
}

export const menuState: MenuState = { isHidden: true };

export const toggleMenu = createAction('HOME_TOGGLE_MENU');

export default combineReducers({
  menu: handleAction(
    toggleMenu,
    (menuState, action) => ({
      isHidden: !menuState.isHidden
    }),
     menuState
  ),
});
