// @flow
import React from 'react';
import { Form, Control } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { modelPath } from 'modules/Newsletter/NewsletterUnsubscribeModule';
import type { FormProps } from 'util/Form';
import CoreContainer from 'containers/CoreContainer';

import './NewsletterUnsubscribe.scss';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  form: {[string]: FormProps},
  i18n: Object,
  t: Object,
  isPending: boolean,
  unsubscribe: (data: Object) => any,
  unsubscribed: boolean,
  newsletterID: string,
  newsletterUpdatedIsShown: boolean,
}

export const NewsletterUnsubscribeComponent = ({
  unsubscribed,
  form, i18n, t, isPending, unsubscribe, newsletterID, newsletterUpdatedIsShown,
}: Props) => (
  <CoreContainer>
    <Row
      className="mt-3 w-100 no-gutters d-flex flex-grow-1"
      id="unsubscribe-newsletter-container"
      dir={i18n.translator.language === "ar" ? "rtl" : "ltr"}>
      <Col className="d-none d-lg-flex" lg={1}></Col>
      {
        newsletterUpdatedIsShown ?
        <Col xs={12} lg={10} className="pt-5 d-flex flex-column align-items-center">
          <div
            className="text-center"
            id={
              i18n.translator.language === "ar" ?
              "unsubscribe-newsletter-txt-ar" : "unsubscribe-newsletter-txt"
            }>
            {
              unsubscribed != null ?
              t('newsletterUnsubscribed')
              :
              t('newsletterUpdated')
            }
          </div>
        </Col>
        :
        <Col xs={12} lg={10} className="pt-5 d-flex flex-column align-items-center">
          <div
            className="text-center"
            id={
              i18n.translator.language === "ar" ?
              "unsubscribe-newsletter-txt-ar" : "unsubscribe-newsletter-txt"
            }>
            {t('unsubscribeFromNewsletter')}
          </div>
          <Form
            className="my-5 d-flex flex-column mx-auto w-75"
            model={modelPath}
            onSubmit={data => unsubscribe({newsletterID, data})}>
            <Row>
              <Col className="d-none d-sm-flex" sm={1} md={2} lg={3}></Col>
              <Col xs={12} sm={10} md={8} lg={6} className="d-flex flex-column align-items-start">
                <div className={
                    i18n.translator.language === "ar" ?
                    "text-right newsl-checkbox-ar" : "newsl-checkbox"
                  }>
                  <Control.checkbox model=".newsletterFashion" id="fnewsl" />
                  <label
                    className={i18n.translator.language === "ar" ? "pr-2" : "pl-2"}
                    htmlFor="fnewsl">{
                      t('FASHION')}
                    </label>
                </div>
                <div className={
                    i18n.translator.language === "ar" ?
                    "text-right newsl-checkbox-ar" : "newsl-checkbox"
                  }>
                  <Control.checkbox model=".newsletterFineJewelry" id="fjnewsl" />
                  <label
                    className={i18n.translator.language === "ar" ? "pr-2" : "pl-2"}
                    htmlFor="fjnewsl">
                    {t('FINE JEWELRY')}
                  </label>
                </div>
                <div className={
                    i18n.translator.language === "ar" ?
                    "text-right newsl-checkbox-ar" : "newsl-checkbox"
                  }>
                  <Control.checkbox model=".newsletterHomeCollection" id="hcnewsl" />
                  <label
                    className={i18n.translator.language === "ar" ? "pr-2" : "pl-2"}
                    htmlFor="hcnewsl">
                    {t('HOME COLLECTION')}
                  </label>
                </div>
              </Col>
              <Col className="d-none d-sm-flex" sm={1} md={2} lg={3}></Col>
            </Row>
            <Button
              className={
                i18n.translator.language === "ar" ?
                "mt-5 align-self-center px-4 unsubscribe-newsletter-btn-ar" :
                "mt-5 align-self-center px-4 unsubscribe-newsletter-btn"
              }
              type="submit"
              disabled={!form.$form.valid || isPending}>
              {isPending ? <Trans>LOADING</Trans> : <Trans>UPDATE</Trans>}
            </Button>
          </Form>
        </Col>
      }
      <Col className="d-none d-lg-flex" lg={1}></Col>
    </Row>
  </CoreContainer>
);

export default withTranslation()(NewsletterUnsubscribeComponent);
