// @flow
import React from 'react';
import { Control } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import Button from 'react-bootstrap/Button';
import AuthNotFound from 'bundles/Auth/components/AuthNotFound';
import './PasswordSurvey.scss';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  userID: string,
  i18n: Object,
  t: Object,
  onSubmit: (userID: string, reason: string) => any,
  onToggleBtn: (v: string) => any,
  passwordSurvey: string,
}

export const PasswordSurveyComponent = ({
  i18n, onSubmit, userID, onToggleBtn, passwordSurvey, t,
}: Props) => (
  <div
    className="mt-5 d-flex flex-column flex-grow-1 align-items-center"
    id="passwd-survey">
    {
        !userID ?
        <AuthNotFound />
        :
      <div className={
          i18n.translator.language === "ar" ?
          "d-flex flex-column text-right" :
          "d-flex flex-column"
        }>
        <div
          id={
            i18n.translator.language === "ar" ?
            "passwd-survey-title-ar" : "passwd-survey-title"
          }
          className="mb-4">
          {t('whyChangePasswd')}
        </div>
        <div
          id={
            i18n.translator.language === "ar" ?
            "forgotpasswd-radiobtn-ar" : "forgotpasswd-radiobtn"
          }
          className="">
          <Control
            model="passwordSurvey"
            type="radio"
            value="forgot password"
            checked={passwordSurvey === "forgot password"}
            onChange={(v) => onToggleBtn(v.target.value)}
            id="passwd-survey-forgotpasswd"
          />
          <label
            className={
              i18n.translator.language === "ar" ?
              "pr-2" : "pl-2"
            }
            htmlFor="passwd-survey-forgotpasswd">
            {t('Forgot password')}
          </label>
        </div>
        <div
          id={
            i18n.translator.language === "ar" ?
            "accountaccessed-radiobtn-ar" :
            "accountaccessed-radiobtn"
          }
          className="">
          <Control
            model="passwordSurvey"
            type="radio"
            value="account may have been accessed by someone else"
            checked={passwordSurvey === "account may have been accessed by someone else"}
            onChange={(v) => onToggleBtn(v.target.value)}
            id="passwd-survey-accountaccessed"
          />
         <label
           className={
             i18n.translator.language === "ar" ?
             "pr-2" : "pl-2"
           }
           htmlFor="passwd-survey-accountaccessed">
            {t('Account may have been accessed by someone else')}
         </label>
        </div>
        <div
          id={
            i18n.translator.language === "ar" ?
            "anotherreason-radiobtn-ar" :
            "anotherreason-radiobtn"
          }
          className="">
          <Control
            model="passwordSurvey"
            type="radio"
            value="another reason"
            checked={passwordSurvey === "another reason"}
            onChange={(v) => onToggleBtn(v.target.value)}
            id="passwd-survey-anotherreason"
          />
         <label
           className={
             i18n.translator.language === "ar" ?
             "pr-2" : "pl-2"
           }
           htmlFor="passwd-survey-anotherreason">
            {t('Another reason')}
         </label>
        </div>
        <Button
          className="mt-4 align-self-center"
          id={
            i18n.translator.language === "ar" ?
            "passwd-survey-submit-btn-ar" :
            "passwd-survey-submit-btn"
          }
          onClick={() => onSubmit({
            userID: userID, reason: passwordSurvey
          })}>
          <Trans>SUBMIT</Trans>
        </Button>
      </div>
    }
  </div>
);

export default withTranslation()(PasswordSurveyComponent);
