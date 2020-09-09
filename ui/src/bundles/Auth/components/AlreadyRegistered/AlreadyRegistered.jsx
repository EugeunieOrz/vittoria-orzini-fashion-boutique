// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from "react-i18next";
import config from 'config/index';

import './AlreadyRegistered.scss';

type Props = {
  i18n: Object,
  t: Object,
}

export const AlreadyRegisteredComponent = ({
  i18n, t,
}: Props) => (
  <div className="mt-5 d-flex flex-column flex-grow-1 align-items-center" id="already-registered">
    <div id={
        i18n.translator.language === "ar" ?
        "already-registered-title-ar" : "already-registered-title"
      }>
      {t('alreadyRegistered')}
    </div>
    <div id={
        i18n.translator.language === "ar" ?
        "already-registered-txt-ar" : "already-registered-txt"
      }
      className="mt-3 mb-5">
      {t('alreadyUsedEmail')}
    </div>
    <Link
      to={config.route.index}
      id={
        i18n.translator.language === "ar" ?
        "already-registered-home-link-ar" : "already-registered-home-link"
      }
      className="px-5 py-2">{t('Back to HOME')}</Link>
  </div>
);

export default withTranslation()(AlreadyRegisteredComponent);
