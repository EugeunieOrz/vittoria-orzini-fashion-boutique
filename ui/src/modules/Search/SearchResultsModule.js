// @flow
import { createAction, handleActions } from 'redux-actions';

export const searchResultsState = {
  areShown: false
}

export const closeSearchResults = createAction('CLOSE_SEARCH_RESULTS');
export const handleSearchResult = createAction('HANDLE_SEARCH_RESULT');
export const showSearchResults = createAction('SHOW_SEARCH_RESULTS');

export default handleActions({
  [closeSearchResults]: (state) => ({...state, areShown: false }),
  [showSearchResults]: (state) => ({...state, areShown: !state.areShown }),
}, searchResultsState);
