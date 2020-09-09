// @flow
import { createAction, handleActions } from 'redux-actions';

export const langListState = {
  langListIsShown: false
}

export const showLanguages = createAction('SHOW_LANGUAGES');

export default handleActions({
  [showLanguages]: (state, action) => ({...state, langListIsShown: !state.langListIsShown }),
}, langListState);
