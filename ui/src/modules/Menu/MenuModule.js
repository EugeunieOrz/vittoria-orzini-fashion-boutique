// @flow
import { createAction, handleActions } from 'redux-actions';

export const menuState = {
  menuIsShown: false
}

export const openClientServicePage = createAction('OPEN_CLIENT_SERVICE_PAGE_FROM_MENU');
export const openStoreLocatorPage = createAction('OPEN_STORE_LOCATOR_PAGE_FROM_MENU');
export const toggleMenu = createAction('TOGGLE_MENU');
export const closeMenu = createAction('CLOSE_MENU');

export default handleActions({
  [toggleMenu]: (state) => ({...state, menuIsShown: !state.menuIsShown }),
  [closeMenu]: (state) => ({...state, menuIsShown: false }),
}, menuState);
