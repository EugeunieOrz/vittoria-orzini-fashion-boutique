// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from "react-i18next";
import config from 'config/index';
import AuthNotFound from 'bundles/Auth/components/AuthNotFound';
import './RecoverPasswordEmailSent.scss';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  i18n: Object,
  email: string,
  t: Object,
}

export const RecoverPasswordEmailSentComponent = ({
  i18n, email, t,
}: Props) => (
  <div id="recoverpassword-email-sent"
       className="mt-5 d-flex flex-column flex-grow-1 align-items-center">
    { Object.entries(email).length === 0 && email.constructor === Object ?
      <AuthNotFound />
      :
      <div
        id="recoverpassword-email-sent"
        className={
          i18n.translator.language === "ar" ?
          "d-flex flex-column text-right" :
          "d-flex flex-column"
        }>
        <div
          className="mb-3"
          id={
            i18n.translator.language === "ar" ?
            "email-sent-header-ar" : "email-sent-header"
          }>
          {t('Check your email')}
        </div>
        {
          i18n.translator.language === "ar" ?
          <div id="email-sent-txt1-ar">
            {t('emailSentAr')}
          </div>
          :
          <div id="email-sent-txt1">
            {t('emailSent', {email: email})}
          </div>
        }
        <div
          id={
            i18n.translator.language === "ar" ?
            "email-sent-txt2-ar" : "email-sent-txt2"
          }>
          {t('dontSeeEmail')}
        </div>
        <Link
          to={config.route.auth.passwordRecovery}
          type="button"
          id={
            i18n.translator.language === "ar" ?
            "did-not-receive-the-email-link-ar" :
            "did-not-receive-the-email-link"
          }
          className="my-4">
          {t('didnotReceiveEmail')}
        </Link>
      </div>
    }
  </div>
);

export default withTranslation()(RecoverPasswordEmailSentComponent);
