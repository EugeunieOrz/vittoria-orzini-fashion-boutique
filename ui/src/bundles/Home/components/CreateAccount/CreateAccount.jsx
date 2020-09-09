// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Control, Form, Errors } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { isLatin, isRequired, titleRequired, ageLimitRequired } from 'util/Validator';
import { modelPath } from 'bundles/Home/modules/CreateAccountModule';
import FormControl from 'components/FormControl';
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
import config from 'config/index';
import type { FormProps } from 'util/Form';
import zxcvbn from 'zxcvbn';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import './CreateAccount.scss';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  lang: string,
  score: string,
  isHidden: boolean,
  form: {[string]: FormProps},
  isPending: boolean,
  i18n: Object,
  t: Object,
  createAccount: () => any,
  onToggleMask: () => any,
  onCheckPasswordStrength: () => any,
  shoppingBag: Object,
}

const strength = {
  0: "Too short",
  1: "Weak",
  2: "Good",
  3: "Strong",
  4: "Very strong"
}

export const CreateAccountComponent = ({
  score, isHidden, form, isPending, i18n, createAccount, onToggleMask, onCheckPasswordStrength, t,
  lang, shoppingBag,
}: Props) => (
  <Row className="mx-0 mx-lg-4 mt-4 flex-grow-1">
    <Col md={1} xl={2} className="d-none d-md-flex"></Col>
    <Col xs={12} md={10} xl={8}>
      <Form
        className="d-flex flex-column"
        id={
          i18n.translator.language === "ar" ?
          "createAccount-form-ar" :
          "createAccount-form"
        }
        model={modelPath}
        onSubmit={data => createAccount({
          data: data,
          shoppingBag: shoppingBag
        })}
        autoComplete="off" hideNativeErrors>
        <Control.select model=".title" id=".title" validators={{ titleRequired, }}>
          <option value={t('title')}>{t('title')}</option>
          <option value={t('Mr.')}>{t('Mr.')}</option>
          <option value={t('Mrs.')}>{t('Mrs.')}</option>
          <option value={t('Ms.')}>{t('Ms.')}</option>
        </Control.select>
        <Errors
          model=".title"
          messages={{ titleRequired: t('enterTitle') }}
          wrapper={(props) => <div className={
            i18n.translator.language ?
            "text-right createAccount-title-error-ar" : "createAccount-title-error"
          }>{props.children}</div>}
          show="focus"/>
        <Row className="mt-4">
          <Col xs={12} lg={6}>
            <FormControl
              className={
                form.firstName.touched && !form.firstName.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "createAccount-firstName-error-form-ar" :
                  "createAccount-firstName-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "createAccount-firstName-form-ar" :
                  "createAccount-firstName-form"
                )
              }
              id="firstName"
              formProps={form.firstName}
              controlProps={{
                type: 'text',
                placeholder: t('FIRST NAME'),
                maxLength: 255,
              }}
              validators={{
                isRequired,
                isAlpha,
              }}
            />
            <Errors
              model=".firstName"
              messages={{
                  isAlpha: t('checkFirstName'),
                  isRequired: t('enterFirstName')
              }}
              wrapper={(props) => <div className={
                i18n.translator.language ?
                "text-right createAccount-fname-error-ar" :
                "createAccount-fname-error"
              }>
                {props.children[0]}<br />{props.children[1]}</div>}
              show="focus"/>
          </Col>
          <Col xs={12} lg={6}>
            <FormControl
              className={
                form.lastName.touched && !form.lastName.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "createAccount-lastName-error-form-ar" :
                  "createAccount-lastName-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "createAccount-lastName-form-ar" :
                  "createAccount-lastName-form"
                )
              }
              id="lastName"
              formProps={form.lastName}
              controlProps={{
                type: 'text',
                placeholder: t('LAST NAME'),
                maxLength: 255,
              }}
              validators={{
                isRequired,
                isLatin,
              }}
            />
            <Errors
              model=".lastName"
              messages={{
                  isLatin: t('checkLastName'),
                  isRequired: t('enterLastName')
              }}
              wrapper={(props) => <div className={
                i18n.translator.language ?
                "text-right createAccount-lname-error-ar" :
                "createAccount-lname-error"
              }>
                {props.children[0]}<br />{props.children[1]}</div>}
              show="focus"/>
          </Col>
        </Row>
        <Row className="mt-0 mt-lg-3">
          <Col xs={12} lg={6} className="d-flex flex-column">
            <FormControl
              className={
                form.email.touched && !form.email.valid ?
                "createAccount-email-error-form" :
                "createAccount-email-form"
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
              disabled={true}
            />
            <Errors
              model=".email"
              messages={{
                  isRequired:t('enterEmail'),
                  isEmail:t('enterValidEmail')
              }}
              wrapper={(props) => <div className={
                i18n.translator.language ?
                "text-right createAccount-email-error-ar" :
                "createAccount-email-error"
              }>
                {props.children[0]}<br />{props.children[1]}</div>}
              show="focus"/>
            <Link
              className={
                i18n.translator.language === "ar" ?
                "ml-auto" : ""
              }
              id={
                i18n.translator.language === "ar" ?
                "createAccount-link-email-ar" :
                "createAccount-link-email"
              }
              to={config.route.home.checkout}>
              {t('notYourEmail')}
            </Link>
          </Col>
          <Col xs={12} lg={6}>
            <InputGroup className="createAccount-password-group">
              <FormControl
                className={
                  form.password.touched && !form.password.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "createAccount-password-error-form-ar" :
                    "createAccount-password-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "createAccount-password-form-ar" :
                    "createAccount-password-form"
                  )
                }
                id="password"
                formProps={form.password}
                controlProps={{
                  type: isHidden ? 'password' : 'text',
                  placeholder: t('PASSWORD'),
                  maxLength: 128,
                }}
                validators={{
                  scoreVeryStrong: (val) => zxcvbn(val).score > 1,
                }}
                onChange={(modelValue) => onCheckPasswordStrength(modelValue.target.value)}/>
              <InputGroup.Append
                onClick={() => onToggleMask()}
                type="button"
                id={
                  i18n.translator.language === "ar" ?
                  "createAccount-toggle-btn-ar" :
                  "createAccount-toggle-btn"
                }
                className="mt-2">
                <InputGroup.Text>
                  { isHidden ? t('Show') : t('Hide') }
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <span
              className={
                i18n.translator.language === "ar" ?
                "mt-2 password-strength-txt-ar" :
                "mt-2 password-strength-txt"
              }
              data-score={score}>
            {
              score === '' && form.password.touched ?
              t('enterPasswd') :
              strength[score]
            }
            </span>
            <meter max="4" className="ml-2 password-strength" data-score={score}></meter>
          </Col>
        </Row>
        <div className={
            i18n.translator.language === "ar" ?
            "my-4 text-right" : "my-4"
          }>
          <div id={
              i18n.translator.language === "ar" ?
              "ageLimit-checkbox-ar" :
              "ageLimit-checkbox"
            }>
            <Control.checkbox model=".ageLimit" id="ageLimit" validators={{ ageLimitRequired, }} />
            <label
              className={
                i18n.translator.language === "ar" ?
                "pr-2" : "pl-2"
              }
              htmlFor="ageLimit">
              {t('confirm')}
            </label>
          </div>
          <Errors
            model=".ageLimit"
            messages={{
              ageLimitRequired: t('confirm'), }}
            wrapper={(props) => <div className={
              i18n.translator.language ?
              "pr-2 text-right signup-age-error-ar" :
              "pl-2 signup-age-error"
            }>{props.children}</div>}
            show="focus"/>
        </div>
        <Button
          className="mb-4 mb-lg-0 align-self-center"
          id={
            isPending ?
            (
              i18n.translator.language === "it" ?
              "createAccount-it-pending-btn" :
              (
                i18n.translator.language === "ar" ?
                "createAccount-pending-ar-btn" :
                "createAccount-pending-btn"
              )
            ) :
            (
              i18n.translator.language === "ar" ?
              "createAccount-ar-btn" :
              "createAccount-btn"
            )
          }
          type="submit" disabled={!form.$form.valid || isPending}>
          {isPending ? <Trans>LOADING</Trans> : <Trans>CREATE ACCOUNT</Trans>}
        </Button>
      </Form>
    </Col>
    <Col md={1} xl={2} className="d-none d-md-flex"></Col>
  </Row>
);

export default withTranslation()(CreateAccountComponent);
