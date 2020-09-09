// @flow
import { createAction, handleActions } from 'redux-actions';

export const toggleHomeCollectionMenuState = {
  homeCollectionMenuOpened: false
}

export const toggleHomeCollectionMenu = createAction('TOGGLE_HOME_COLLECTION_MENU');

export const openHomeCollectionMenu = createAction('OPEN_HOME_COLLECTION_MENU');
export const closeHomeCollectionMenu = createAction('CLOSE_HOME_COLLECTION_MENU');

export default handleActions({
  [openHomeCollectionMenu]: (state) => ({...state, homeCollectionMenuOpened: true }),
  [closeHomeCollectionMenu]: (state) => ({...state, homeCollectionMenuOpened: false }),
}, toggleHomeCollectionMenuState);
