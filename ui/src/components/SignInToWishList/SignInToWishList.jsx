// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import { Form, Control, Errors } from 'react-redux-form';
import { isRequired } from 'util/Validator';
import { modelPath } from 'modules/Wishlist/SignInWModule';
import FormControl from 'components/FormControl';
import isEmail from 'validator/lib/isEmail';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import './SignInToWishList.scss';

import closeSign from '../../static/icons/close.svg';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  i18n: Object,
  t: Object,
  shoppingBag: Object,
  signInWIsShown: boolean,
  toggleSignInW: () => any,
  toggleSignInWToFalse: () => any,
  form: {[string]: FormProps},
  isPendingSignInW: boolean,
  onSignInW: (data: Object, shoppingBag: Object) => any,
  proceedToSignUpPage: () => any,
  proceedToRecoverPasswordPage: () => any,
}

export const SignInToWishListComponent = ({
  i18n, t, shoppingBag, signInWIsShown, toggleSignInW,
  toggleSignInWToFalse, form, isPendingSignInW, onSignInW,
  proceedToSignUpPage, proceedToRecoverPasswordPage,
}: Props) => (
  <Container
    id={
      i18n.translator.language === "ar" ?
      "signinw-container-ar" : "signinw-container"
    }
    fluid>
    <Row className="px-1 px-md-3 px-lg-0" id="signinw-inner">
      <Col className="d-none d-sm-flex" xs={12} sm={4} md={5} lg={6} xl={8}></Col>
      <Col xs={12} sm={8} md={7} lg={6} xl={4}>
        <div className="d-flex flex-row mt-1 mb-5" id="signinw-header">
          <div
            className="flex-grow-1 mt-2 pb-1 text-center"
            id={
              i18n.translator.language === "ar" ?
              "signinw-title-ar" : "signinw-title"
            }>
            {t('signinWlistTitle')}
          </div>
          <Image
            className="mb-2"
            id="signinw-close-btn"
            src={closeSign}
            alt=""
            width="24"
            height="24"
            onClick={() => toggleSignInWToFalse()} />
        </div>
        <Form
          className={
            i18n.translator.language === "ar" ?
            "row d-flex flex-column mb-5 text-right" :
            "row d-flex flex-column mb-5"
          }
          model={modelPath}
          onSubmit={data => onSignInW({
            data: data,
            shoppingBag: shoppingBag
          })}
          autoComplete="off">
          <FormControl
            className={
              i18n.translator.language === "ar" ?
              (
                form.email.touched && !form.email.valid ?
                "signin-wishlist-email-error-form-ar" :
                "signin-wishlist-email-form-ar"
              )
              :
              (
                form.email.touched && !form.email.valid ?
                "signin-wishlist-email-error-form" :
                "signin-wishlist-email-form"
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
              "signin-wishlist-email-error-ar" :
              "signin-wishlist-email-error"
            }>
            {props.children[0]}<br />{props.children[1]}</div>}
            show="focus"
          />
          <FormControl
            className={
              i18n.translator.language === "ar" ?
              (
                form.email.touched && !form.password.valid ?
                "signin-wishlist-password-error-form-ar" :
                "signin-wishlist-password-form-ar"
              )
              :
              (
                form.email.touched && !form.password.valid ?
                "signin-wishlist-password-error-form" :
                "signin-wishlist-password-form"
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
              "signin-wishlist-password-error-ar" :
              "signin-wishlist-password-error"
            }>
            {props.children[0]}<br />{props.children[1]}</div>}
            show="focus"
          />
          <div id={
            i18n.translator.language === "ar" ?
            "signin-wlist-error-ar" : "signin-wlist-error"
          }>
          </div>
          <div
            id={
              i18n.translator.language === "ar" ?
              "signinw-rememberme-checkbox-ar" :
              "signinw-rememberme-checkbox"
            }
            className="mt-2">
            <Control.checkbox model=".rememberMe" id="signinw-rememberMe" />
            <label
              className={
                i18n.translator.language === "ar" ?
                "pr-2" : "pl-2"
              }
              htmlFor="signinw-rememberMe">
              <Trans>Stay signed in</Trans>
            </label>
          </div>
          <Button
            className="align-self-center mt-3"
            id={
              isPendingSignInW ?
              (
                i18n.translator.language === "it" ?
                "signin-wishlist-pending-it-btn" :
                (
                  i18n.translator.language === "ar" ?
                  "signin-wishlist-pending-btn-ar" :
                  "signin-wishlist-pending-btn"
                )
              )
              :
              (
                i18n.translator.language === "ar" ?
                "signin-wishlist-btn-ar" :
                "signin-wishlist-btn"
              )
            }
            type="submit"
            disabled={!form.$form.valid || isPendingSignInW}>
            {isPendingSignInW ? <Trans>LOADING</Trans> : <Trans>LOGIN</Trans>}
          </Button>
        </Form>
        <Row>
          <Col xs={12} md={6} className="d-flex flex-column">
            <Button
               className="align-self-center"
               id={
                 i18n.translator.language === "ar" ?
                 "signinw-passwd-recovery-btn-ar" :
                 "signinw-passwd-recovery-btn"
               }
               onClick={() => proceedToRecoverPasswordPage()}>
              {t('forgotPasswd')}
            </Button>
          </Col>
          <Col xs={12} md={6} className="d-flex flex-column">
            <Button
               className="align-self-center"
               id={
                 i18n.translator.language === "ar" ?
                 "signinw-signup-btn-ar" :
                 "signinw-signup-btn"
               }
               onClick={() => proceedToSignUpPage()}>
              <Trans>Sign Up</Trans>
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default withTranslation()(SignInToWishListComponent);
