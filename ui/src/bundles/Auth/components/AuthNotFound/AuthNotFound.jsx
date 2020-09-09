// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation, Trans } from "react-i18next";
import config from 'config/index';

import './AuthNotFound.scss';

type Props = {
  i18n: Object,
  t: Object,
}

export const AuthNotFound = ({
  i18n, t,
}: Props) => (
  <div
    id="authnotfound-email-notfound"
    className="d-flex flex-column align-items-center">
    <p
      id={
        i18n.translator.language === "ar" ?
        "authnotfound-code-ar" : "authnotfound-code"
      }>
      404
    </p>
    <p
      id={
        i18n.translator.language === "ar" ?
        "authnotfound-page-not-found-ar" : "authnotfound-page-not-found"
      }>
      <Trans>The Page you are looking for could not be found.</Trans>
    </p>
    <Link
      to={config.route.home.index}
      type="button"
      id={
        i18n.translator.language === "ar" ?
        "authnotfound-back-to-home-link-ar" :
        (
          i18n.translator.language === "it" ?
          "authnotfound-back-to-home-link-it" :
          "authnotfound-back-to-home-link"
        )
      }
      className="mt-4 text-center">
      <Trans>Back to HOME</Trans>
    </Link>
  </div>
);

export default withTranslation()(AuthNotFound);
