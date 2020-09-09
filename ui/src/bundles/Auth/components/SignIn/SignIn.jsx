// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Control, Errors } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { isRequired } from 'util/Validator';
import { modelPath } from 'bundles/Auth/modules/SignInModule';
import FormControl from 'components/FormControl';
import isEmail from 'validator/lib/isEmail';
import config from 'config/index';
import type { FormProps } from 'util/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import './SignIn.scss';

type Props = {
  form: {[string]: FormProps},
  isPending: boolean,
  i18n: Object,
  onSignIn: (data: Object, shoppingBag: Object) => any,
  t: Object,
  route: (string) => any,
  shoppingBag: Object,
}

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

export const SignInComponent = ({
  form, isPending, i18n, onSignIn, t,
  route, shoppingBag,
}: Props) => (
  <Row className="mx-0 mx-lg-4 mt-4 flex-grow-1">
    <Col xs={12} lg={6} className="d-flex flex-column align-items-center">
      <div
        id={
          i18n.translator.language === "ar" ?
          "signin-header-ar" : "signin-header"
        }
        className="mb-5">
        {t('LOGIN')}
      </div>
        <Form
          className="d-flex flex-column"
          model={modelPath}
          onSubmit={data => onSignIn({
            data: data,
            shoppingBag: shoppingBag
          })}
          autoComplete="off">
          <FormControl
            className={
              form.email.touched && !form.email.valid ?
              (
                i18n.translator.language === "ar" ?
                "register-email-error-form-ar" :
                "register-email-error-form"
              )
              :
              (
                i18n.translator.language === "ar" ?
                "register-email-ar" :
                "register-email"
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
              "text-right register-email-error-ar" :
              "register-email-error"
            }>
            {props.children[0]}<br />{props.children[1]}</div>}
            show="focus"
          />
          <FormControl
            className={
              form.password.touched && !form.password.valid ?
              (
                i18n.translator.language === "ar" ?
                "register-password-error-form-ar" :
                "register-password-error-form"
              )
              :
              (
                i18n.translator.language === "ar" ?
                "register-password-ar" :
                "register-password"
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
              "text-right register-password-error-ar" :
              "register-password-error"
            }>
              {props.children[0]}<br />{props.children[1]}
            </div>}
            show="focus"
          />
          <div
            className={
              i18n.translator.language === "ar" ?
              "text-right" : ""
            }
            id={
              i18n.translator.language === "ar" ?
              "register-password-error-ar" :
              "register-password-error"
            }>
          </div>
          <div
            id={
              i18n.translator.language === "ar" ?
              "rememberMe-checkbox-ar" :
              "rememberMe-checkbox"
            }
            className={
              i18n.translator.language === "ar" ?
              "my-4 ml-auto" : "my-4"
            }>
            <Control.checkbox model=".rememberMe" id="rememberMe" />
            <label
              className={
                i18n.translator.language === "ar" ?
                "pr-2" : "pl-2"
              }
              htmlFor="rememberMe">
              <Trans>Stay signed in</Trans>
            </label>
          </div>
          <Button
            className="align-self-center"
            id={
              isPending ?
              (
                i18n.translator.language === "it" ?
                "sign-in-pending-it-btn" :
                (
                  i18n.translator.language === "ar" ?
                  "sign-in-pending-ar-btn" :
                  "sign-in-pending-btn"
                )
              )
              :
              (
                i18n.translator.language === "ar" ?
                "sign-in-btn-ar" : "sign-in-btn"
              )
            }
            type="submit"
            disabled={!form.$form.valid || isPending}>
            {isPending ? <Trans>LOADING</Trans> : <Trans>LOGIN</Trans>}
          </Button>
       </Form>
       <Link
         to={config.route.auth.passwordRecovery}
         id={
           i18n.translator.language === "ar" ?
           "password-recovery-link-ar" :
           "password-recovery-link"
         }
         className="mt-4"
         type="button">
         {t('forgotPasswd')}
       </Link>
    </Col>
    <Col xs={12} lg={6}
      id={
        i18n.translator.language === "ar" ?
        "register-msg-ar" : "register-msg"
      }
      className="mt-5 mt-lg-0 px-0 px-sm-5 px-lg-0 d-flex flex-column align-items-center">
      <div
        id={
          i18n.translator.language === "ar" ?
          "register-header-ar" : "register-header"
        }
        className="mb-2 mb-lg-5">
        {t('REGISTER')}
      </div>
      <ListGroup
        id={
          i18n.translator.language === "ar" ? "register-txt-ar" : "register-txt"
        }
        className={
          i18n.translator.language === "ar" ?
          "px-0 px-md-5 px-lg-0 mx-0 mx-md-5 mx-lg-0 text-right" :
          "px-0 px-md-5 px-lg-0 mx-0 mx-md-5 mx-lg-0"
        }>
        <ListGroup.Item
          className="mb-2"
          id={
            i18n.translator.language === "ar" ?
            "register-txt-header-ar" : "register-txt-header"
          }>
          {t('registerTitle1')}
        </ListGroup.Item>
        <ListGroup.Item className="pb-0">
          {t('registerTitle2')}
        </ListGroup.Item>
        <ListGroup.Item className="pb-0">
          {t('registerTitle3')}
        </ListGroup.Item>
        <ListGroup.Item className="pb-0">
          {t('registerTitle4')}
        </ListGroup.Item>
        <ListGroup.Item>
          {t('registerTitle5')}
        </ListGroup.Item>
      </ListGroup>
      <Button
        id={
          i18n.translator.language === "ar" ?
          "create-account-link-ar" : "create-account-link"
        }
        className="mt-3 mb-4"
        onClick={() => route(config.route.auth.signUp)}>
        {t('CREATE ACCOUNT')}
      </Button>
    </Col>
  </Row>
);

export default withTranslation()(SignInComponent);
