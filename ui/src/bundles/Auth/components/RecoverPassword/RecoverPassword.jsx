// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Errors } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { isRequired } from 'util/Validator';
import { modelPath } from 'bundles/Auth/modules/RecoverPasswordModule';
import FormControl from 'components/FormControl';
import isEmail from 'validator/lib/isEmail';
import config from 'config/index';
import type { FormProps } from 'util/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './RecoverPassword.scss';

type Props = {
  form: {[string]: FormProps},
  isPending: boolean,
  i18n: Object,
  onSend: (data: Object) => any,
  t: Object,
}

export const RecoverPasswordComponent = ({
  form, isPending, i18n, onSend, t,
}: Props) => (
  <div
    id="recover-password-row"
    className="mt-5 d-flex flex-column flex-grow-1 align-items-center">
    <div className="d-flex flex-column">
      <div
        className={
          i18n.translator.language === "ar" ?
          "text-right" : ""
        }
        id={
          i18n.translator.language === "ar" ?
          "recover-password-header-ar" :
          "recover-password-header"
        }>
        {t('Recover password')}
      </div>
      <div
        id={
          i18n.translator.language === "ar" ?
          "recover-password-msg-ar" :
          "recover-password-msg"
        }
        className={
          i18n.translator.language === "ar" ?
          "text-right my-4" : "my-4"
        }>
        {t('enterEmail2')}
      </div>
      <Form model={modelPath} onSubmit={onSend} autoComplete="off">
        <FormControl
          className={
            form.email.touched && !form.email.valid ?
            (
              i18n.translator.language === "ar" ?
              "recover-passwd-email-error-form-ar" :
              "recover-passwd-email-error-form"
            )
            :
            (
              i18n.translator.language === "ar" ?
              "recover-passwd-email-form-ar" :
              "recover-passwd-email-form"
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
                      isRequired: t('enterEmail'),
                      isEmail: t('enterValidEmail')
                  }}
          wrapper={(props) => <div className={
            i18n.translator.language === "ar" ?
            "text-right recover-passwd-email-error-ar" :
            "recover-passwd-email-error"
          }>
                {props.children[0]}<br />{props.children[1]}</div>}
          show="focus"
          />
        <Row className="pt-4 d-flex align-items-center">
          <Col xs={12} lg={6} className="d-flex flex-column align-items-center">
            <Button id={
                isPending ?
                (
                  i18n.translator.language === "it" ?
                  "recover-passwd-pending-it-btn" :
                  (
                    i18n.translator.language === "ar" ?
                    "recover-passwd-pending-ar-btn" :
                    "recover-passwd-pending-btn"
                  )
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "recover-passwd-ar-btn" :
                  "recover-passwd-btn"
                )
              }
              type="submit"
              disabled={!form.$form.valid || isPending}>
              {isPending ? <Trans>LOADING</Trans> : <Trans>SUBMIT</Trans>}
           </Button>
          </Col>
          <Col xs={12} lg={6} className="text-center mt-4 mt-lg-0">
            <Link
              id={
                i18n.translator.language === "ar" ?
                "sign-in-link-ar" : "sign-in-link"
              }
              to={config.route.auth.signIn}
              type="button">
              <Trans>Back to Sign-In</Trans>
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
);

export default withTranslation()(RecoverPasswordComponent);
