// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import './LanguageSelector.scss';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  i18n: Object,
  t: Object,
  changeLanguage: (lang: string) => any,
  langListIsShown: boolean,
}

export const LanguageSelectorComponent = ({
  i18n, t, changeLanguage, langListIsShown,
}: Props) => (
  <div className={
      langListIsShown ?
      (
        i18n.translator.language === "ar" ?
        "lang-dropdown-content-ar lang-list-is-shown" :
        "lang-dropdown-content lang-list-is-shown"
      )
      :
      (
        i18n.translator.language === "ar" ?
        "lang-dropdown-content-ar" :
        "lang-dropdown-content"
      )
    }>
    <p
      className={
        i18n.translator.language === "ar" ?
        "lang-title-ar" :
        "lang-title"
      }><Trans>LANGUAGE</Trans></p>
    <p
      className={
        i18n.translator.language === "ar" ?
        "lang-ar" : "lang"
      }
      onClick={() => changeLanguage('en')}>
      <Trans>EN</Trans>
    </p>
    <p
      className={
        i18n.translator.language === "ar" ?
        "lang-ar" : "lang"
      }
      onClick={() => changeLanguage('it')}>
      <Trans>IT</Trans>
    </p>
    <p
      className={
        i18n.translator.language === "ar" ?
        "lang-ar" : "lang"
      }
      onClick={() => changeLanguage('ar')}>
      <Trans>AR</Trans>
    </p>
  </div>
);

export default withTranslation()(LanguageSelectorComponent);
