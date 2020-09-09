// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import { Form, Control } from 'react-redux-form';
import type { FormProps } from 'util/Form';
import Button from 'react-bootstrap/Button';
import { modelPath } from 'bundles/Account/modules/AccountDetails/NewsletterModule';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  form: {[string]: FormProps},
  i18n: Object,
  t: Object,
  isPending: boolean,
  onUpdateNewsletter: (userID: string, data: Object) => any,
  userID: string
};

export const EditNewsletterComponent = ({
  form, i18n, t, isPending, onUpdateNewsletter, userID,
}: Props) => (
  <Form model={modelPath} onSubmit={data => onUpdateNewsletter(userID, data)} autoComplete="off" hideNativeErrors>
    <div
      id={
        i18n.translator.language === "ar" ?
        "newsletter-txt-ar" : "newsletter-txt"
      }
      className="mt-3">
      {t('stayUpdated')}
    </div>
    <div
      id={
        i18n.translator.language === "ar" ?
        "edit-newsl-container-ar" : "edit-newsl-container"
      }
      className={
        i18n.translator.language === "ar" ?
        "mt-4 text-right" : "mt-4"
      }>
      <div className="newsl-checkbox">
        <Control.checkbox model=".newsletterFashion" id="fnewsl" />
        <label
          className={
            i18n.translator.language === "ar" ?
            "pr-2" : "pl-2"
          }
          htmlFor="fnewsl">{t('FASHION')}</label>
      </div>
      <div className="newsl-checkbox">
        <Control.checkbox model=".newsletterFineJewelry" id="fjnewsl" />
        <label
          className={
            i18n.translator.language === "ar" ?
            "pr-2" : "pl-2"
          }
          htmlFor="fjnewsl">{t('FINE JEWELRY')}</label>
      </div>
      <div className="newsl-checkbox">
        <Control.checkbox model=".newsletterHomeCollection" id="hcnewsl" />
        <label
          className={
            i18n.translator.language === "ar" ?
            "pr-2" : "pl-2"
          }
          htmlFor="hcnewsl">{t('HOME COLLECTION')}</label>
      </div>
    </div>
    <div className="d-flex flex-column" id="edit-newsl-btn-wrapper">
      <Button
        className="mt-4 align-self-center px-4"
        id={
          isPending ?
          (
            i18n.translator.language === "ar" ?
            "edit-newsletter-pending-btn-ar" : "edit-newsletter-pending-btn"
          )
          :
          (
            i18n.translator.language === "ar" ?
            "edit-newsletter-btn-ar" : "edit-newsletter-btn"
          )
        }
        type="submit"
        disabled={isPending}>
        {isPending ? <Trans>LOADING</Trans> : <Trans>SAVE</Trans>}
      </Button>
    </div>
  </Form>
);

export default withTranslation()(EditNewsletterComponent);
