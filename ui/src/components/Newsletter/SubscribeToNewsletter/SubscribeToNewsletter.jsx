// @flow
import React from 'react';
import { Form, Control, Errors } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { modelPath } from 'modules/Newsletter/NewsletterModule';
import { isRequired } from 'util/Validator';
import isEmail from 'validator/lib/isEmail';
import FormControl from 'components/FormControl';
import type { FormProps } from 'util/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './SubscribeToNewsletter.scss';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  form: {[string]: FormProps},
  i18n: Object,
  t: Object,
  isPending: boolean,
  newsletterOn: string,
  subscribeToNewsletter: (data: Object) => any,
  toggleSubscribeToNewsletter: () => any,
}

export const SubscribeToNewsletterComponent = ({
  form, i18n, t, isPending, subscribeToNewsletter, newsletterOn,
  toggleSubscribeToNewsletter,
}: Props) => (
  <Container
    id="subscribe-newsl-container"
    dir={i18n.translator.language === "ar" ? "rtl" : "ltr"}
    fluid>
    <Row className="w-100">
      <Col xs={6} lg={11}></Col>
      <Col xs={6} lg={1} className="d-flex justify-content-end pt-4 pr-2">
        <div id="close-newsl-btn" onClick={() => toggleSubscribeToNewsletter()}></div>
      </Col>
    </Row>
    {
      newsletterOn === "true" ?
      <Row className="h-50 align-content-center justify-content-center text-center mx-3 mx-sm-5 px-md-5 mt-lg-5">
        <p id={
            i18n.translator.language === "ar" ?
            "subscribe-newsl-msg-ar" : "subscribe-newsl-msg"
          }>
          {t('newsletterOn')}
        </p>
      </Row>
      :
      <Row className="mt-5 w-100 no-gutters">
        <Col className="d-none d-lg-flex" lg={1}></Col>
        <Col xs={12} lg={10} className="mt-5 pt-5 d-flex">
          <Form
            className="mb-5 d-flex flex-column mx-auto"
            model={modelPath}
            onSubmit={subscribeToNewsletter}>
            <p
              className="text-center mb-4"
              id={
                i18n.translator.language === "ar" ?
                "subscribe-newsl-header-ar" : "subscribe-newsl-header"
              }>
              {t('newsletter')}
            </p>
            <p
              className="text-center mb-5"
              id={
                i18n.translator.language === "ar" ?
                "subscribe-newsl-header-msg-ar" : "subscribe-newsl-header-msg"
              }>
              {t('newsletterMsg')}
            </p>
            <div className={
                i18n.translator.language === "ar" ?
                "text-right newsl-checkbox-ar" : "newsl-checkbox"
              }>
              <Control.checkbox model=".newsletterFashion" id="fnewsl" />
              <label
                className={i18n.translator.language === "ar" ? "pr-2" : "pl-2"}
                htmlFor="fnewsl">
                {t('FASHION')}
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
            <FormControl
              className={
                form.email.touched && !form.email.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "mt-4 newsl-email-error-form-ar" :
                  "mt-4 newsl-email-error-form"
                ) :
                (
                  i18n.translator.language === "ar" ?
                  "mt-4 newsl-email-form-ar" :
                  "mt-4 newsl-email-form"
                )
              }
              id="email"
              formProps={form.email}
              controlProps={{
                type: 'email',
                placeholder: t('EMAIL'),
                maxLength: 255,
              }}
              validators={{
                isRequired,
                isEmail,
              }}
            />
            <Errors
              model=".email"
              messages={{
                  isRequired:t('enterEmail'),
                  isEmail:t('enterValidEmail')
              }}
              wrapper={(props) => <div className={
                i18n.translator.language === "ar" ?
                "newsl-email-error-ar" : "newsl-email-error"
              }>
                {props.children[0]}<br />{props.children[1]}</div>}
              show="focus"
            />
              <Button
                className={
                  i18n.translator.language === "ar" ?
                  "mt-4 align-self-center px-4 subscribe-newsletter-btn-ar" :
                  "mt-4 align-self-center px-4 subscribe-newsletter-btn"
                }
                type="submit"
                disabled={
                  isPending ||
                  !form.$form.valid ||
                  (
                    form.newsletterFashion.value === false &&
                    form.newsletterFineJewelry.value === false &&
                    form.newsletterHomeCollection.value === false
                  )
                }>{isPending ? <Trans>LOADING</Trans> : <div>{t('subscribeBtn')}</div>}
              </Button>
          </Form>
        </Col>
        <Col className="d-none d-lg-flex" lg={1}></Col>
      </Row>
    }
  </Container>
);

export default withTranslation()(SubscribeToNewsletterComponent);
