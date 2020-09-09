// @flow
import { call, put, take } from 'redux-saga/effects';
import { changeLanguage, selectLanguage } from 'modules/LanguageCountry/LanguageModule';
import { handleError } from 'util/Saga';
import i18n from 'util/i18n';
import $ from 'jquery';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

/**
 * Worker passes selected product to the product view page.
 */
export function* selectLanguageSaga(): Generator<*, *, *> {
  while (true) {
    const { payload } = yield take(changeLanguage().type);
    try {
      const lang = payload;
      yield put(selectLanguage(lang));
      i18n.changeLanguage(lang);
      $(".lang-dropdown-content").toggleClass("lang-list-is-shown");
    } catch (e) {
      yield call(handleError, e);
    }
  }
}

export default selectLanguageSaga;
