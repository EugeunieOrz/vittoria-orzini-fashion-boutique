// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Errors } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { isRequired } from 'util/Validator';
import { modelPath } from 'bundles/Home/modules/CompleteSignInFormModule';
import FormControl from 'components/FormControl';
import config from 'config/index';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import './CompleteSignIn.scss';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  email: String,
  form: {[string]: FormProps},
  i18n: Object,
  t: Object,
  isPending: boolean,
  completeSignInForm: (data: Object) => any,
  shoppingBag: Object,
}

export const CompleteSignInComponent = ({
  email, i18n, t, form, isPending, completeSignInForm, shoppingBag,
}: Props) => (
  <Row>
    <Col md={2} xl={3} className="d-none d-md-flex"></Col>
    <Col xs={12} md={8} xl={6}>
      <ListGroup
        id={
          i18n.translator.language === "ar" ?
          "completesignin-titles-ar" : "completesignin-titles"
        }
        className={
          i18n.translator.language === "ar" ?
          "mt-4 text-right" : "mt-4"
        }>
        <ListGroup.Item className="px-0 px-sm-3">
          {t('welcomeBack')}
        </ListGroup.Item>
        <ListGroup.Item className="px-0 px-sm-3 pb-0">
          {t('completeSignInMsg1')}
        </ListGroup.Item>
        <ListGroup.Item className="px-0 px-sm-3 pt-0">
          {t('completeSignInMsg2', {email: email})}
        </ListGroup.Item>
        <ListGroup.Item className="px-0 px-sm-3 pt-0">
          <Link
            className={
              i18n.translator.language === "ar" ?
              "mr-1" : "ml-1"
            }
            id="complete-signin-link-email"
            to={config.route.home.checkout}>
            {t('notYourEmail')}
          </Link>
        </ListGroup.Item>
      </ListGroup>
      <Form
        className="px-0 px-sm-3 d-flex flex-column"
        model={modelPath}
        onSubmit={data => completeSignInForm({
          data: data,
          email: email,
          shoppingBag: shoppingBag
        })}
        autoComplete="off">
        <FormControl
          className={
            form.password.touched && !form.password.valid ?
            (
              i18n.translator.language === "ar" ?
              "text-right ml-auto completesignin-password-error-form-ar" :
              "completesignin-password-error-form"
            )
            :
            (
              i18n.translator.language === "ar" ?
              "text-right ml-auto completesignin-password-form-ar" :
              "completesignin-password-form"
            )
          }
          id="password"
          formProps={form.password}
          controlProps={{
            type: 'password',
            placeholder: t('PASSWORD'),
          }}
          validators={{
            isRequired,
          }}
        />
        <Errors
          model=".password"
          messages={{
              isRequired: t('enterPasswd')
          }}
          wrapper={(props) => <div className={
            i18n.translator.language === "ar" ?
            "text-right completesignin-password-error-ar" :
            "completesignin-password-error"
          }>
          {props.children[0]}<br />{props.children[1]}</div>}
          show="focus"
        />
        <Button
          className="mt-4 align-self-center"
          id={
            isPending ?
            (
              i18n.translator.language === "it" ?
              "completesignin-pending-it-btn" :
              (
                i18n.translator.language === "ar" ?
                "completesignin-pending-ar-btn" :
                "completesignin-btn"
              )
            )
            :
            (
              i18n.translator.language === "ar" ?
              "completesignin-ar-btn" :
              "completesignin-btn"
            )
          }
          type="submit"
          disabled={!form.$form.valid || isPending}>
          {isPending ? <Trans>LOADING</Trans> : <Trans>LOGIN</Trans>}
        </Button>
        <p
          className="mt-4 align-self-center"
          id={
            i18n.translator.language === "ar" ?
            "completesignin-password-recovery-link-ar" :
            "completesignin-password-recovery-link"
          }>
          <Link to={config.route.auth.passwordRecovery}>
            {t('forgotPasswd')}
          </Link>
        </p>
      </Form>
    </Col>
    <Col md={2} xl={3} className="d-none d-md-flex"></Col>
  </Row>
);

export default withTranslation()(CompleteSignInComponent);
