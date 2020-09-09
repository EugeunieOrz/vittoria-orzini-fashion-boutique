// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation, Trans } from "react-i18next";
import config from 'config/index';

import './ChangedPassword.scss';

type Props = {
  i18n: Object,
  t: Object,
}

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export const ChangedPasswordComponent = ({
  i18n, t,
}: Props) => (
  <div className="mt-5 d-flex flex-column flex-grow-1 align-items-center" id="changedpasswd">
    {
      i18n.translator.language === "ar" ?
      <div></div>
      :
      <div id="changedpasswd-title">
        {t('congrats')}
      </div>
    }
    <div
      id={
        i18n.translator.language === "ar" ?
        "changedpasswd-txt-ar" : "changedpasswd-txt"
      }
      className="mt-3 mb-5">
      {t('changedPasswd')}
    </div>
    <Link
      to={config.route.index}
      id={
        i18n.translator.language === "ar" ?
        "changedpasswd-home-link-ar" : "changedpasswd-home-link"
      }
      className="px-5 py-2">
      <Trans>Continue to V.O. Fashion Boutique</Trans>
    </Link>
  </div>
);

export default withTranslation()(ChangedPasswordComponent);
