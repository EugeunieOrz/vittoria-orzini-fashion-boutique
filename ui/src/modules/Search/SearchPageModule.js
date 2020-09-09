// @flow
import { createAction, handleActions } from 'redux-actions';

export const searchPageState = {
  searchPageOpened: false
}

export const openSearchPage = createAction('OPEN_SEARCH_PAGE');
export const closeSearchPage = createAction('CLOSE_SEARCH_PAGE');

export default handleActions({
  [openSearchPage]: (state) => ({...state, searchPageOpened: true }),
  [closeSearchPage]: (state) => ({...state, searchPageOpened: false }),
}, searchPageState);
