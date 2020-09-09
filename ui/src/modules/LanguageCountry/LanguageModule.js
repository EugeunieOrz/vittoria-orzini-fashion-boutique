// @flow
import { createAction, handleActions } from 'redux-actions';

export const languageState = {
  lang: "en"
}

export const changeLanguage = createAction('CHANGE_LANGUAGE');
export const selectLanguage = createAction('SELECT_LANGUAGE');
export const showLanguages = createAction('SHOW_LANGUAGES');

export default handleActions({
  [selectLanguage]: (state, action) => ({...state, lang: action.payload }),
}, languageState);
