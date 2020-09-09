// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from "react-i18next";
import config from 'config/index';

import './SignOut.scss';

type Props = {
  i18n: Object,
  t: Object,
}

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export const SignOutComponent = ({
  i18n, t,
}: Props) => (
  <div className="mt-5 d-flex flex-column flex-grow-1 align-items-center">
    <div
      className=""
      id={
        i18n.translator.language === "ar" ?
        "sign-out-header-ar" : "sign-out-header"
      }>
      {t('You have been signed out')}
    </div>
    <div
      className="mt-3"
      id={
        i18n.translator.language === "ar" ?
        "sign-out-txt-ar" : "sign-out-txt"
      }>
      {t('See You Soon')}
    </div>
    <div
      className="my-4"
      id={
        i18n.translator.language === "ar" ?
        "signout-linktohome-ar" : "signout-linktohome"
      }>
      <Link to={config.route.index}>{t('HOME')}</Link></div>
  </div>
);

export default withTranslation()(SignOutComponent);
