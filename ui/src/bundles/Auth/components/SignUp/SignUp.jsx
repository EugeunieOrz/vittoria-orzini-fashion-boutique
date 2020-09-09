// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { Errors, Form, Control } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { isLatin, isRequired, titleRequired, ageLimitRequired } from 'util/Validator';
import { modelPath } from 'bundles/Auth/modules/SignUpModule';
import FormControl from 'components/FormControl';
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
import type { FormProps } from 'util/Form';
import zxcvbn from 'zxcvbn';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import './SignUp.scss';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  score: string,
  isHidden: boolean,
  form: {[string]: FormProps},
  isPending: boolean,
  i18n: Object,
  t: Object,
  onSignUp: (data: Object, shoppingBag: Object) => any,
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

export const SignUpComponent = ({
  score, isHidden, form, isPending, i18n, onSignUp, onToggleMask, onCheckPasswordStrength, t,
  shoppingBag,
}: Props) => (
  <Row className="mx-0 mx-lg-4 mt-4 flex-grow-1">
    <Col md={1} xl={2} className="d-none d-md-flex"></Col>
    <Col xs={12} md={10} xl={8}>
      <div
        id={
          i18n.translator.language === "ar" ?
          "sign-up-header-ar" : "sign-up-header"
        }
        className={
          i18n.translator.language === "ar" ?
          "mb-5 text-right" : "mb-5"
        }>
        {t('newCustomer')}
      </div>
      <Form
        className="d-flex flex-column"
        id={
          i18n.translator.language === "ar" ?
          "sign-up-form-ar" : "sign-up-form"
        }
        model={modelPath}
        onSubmit={data => onSignUp({
          data: data,
          shoppingBag: shoppingBag
        })}
        autoComplete="off" hideNativeErrors>
        <Control.select model=".title" id=".title" validators={{ titleRequired, }}>
          <option value="title">{t('title')}</option>
          <option value="Mr.">{t('Mr.')}</option>
          <option value="Mrs.">{t('Mrs.')}</option>
          <option value="Ms.">{t('Ms.')}</option>
        </Control.select>
        <Errors
          model=".title"
          messages={{ titleRequired: t('enterTitle') }}
          wrapper={(props) => <div className={
            i18n.translator.language === "ar" ?
            "text-right signup-title-error-ar" : "signup-title-error"
          }>{props.children}</div>}
          show="focus"/>
        <Row className="mt-4">
          <Col xs={12} lg={6}>
            <FormControl
              className={
                form.firstName.touched && !form.firstName.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "signup-firstName-error-form-ar" : "signup-firstName-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "signup-firstName-form-ar" : "signup-firstName-form"
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
                i18n.translator.language === "ar" ?
                "text-right signup-fname-error-ar" : "signup-fname-error"
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
                  "signup-lastName-error-form-ar" :
                  "signup-lastName-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "signup-lastName-form-ar" :
                  "signup-lastName-form"
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
                i18n.translator.language === "ar" ?
                "text-right signup-lname-error-ar" : "signup-lname-error"
              }>
                {props.children[0]}<br />{props.children[1]}</div>}
              show="focus"/>
          </Col>
        </Row>
        <Row className="mt-0 mt-lg-3">
          <Col xs={12} lg={6}>
            <FormControl
              className={
                form.email.touched && !form.email.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "signup-email-error-form-ar" : "signup-email-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "signup-email-form-ar" : "signup-email-form"
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
                "text-right signup-email-error-ar" : "signup-email-error"
              }>
                {props.children[0]}<br />{props.children[1]}</div>}
              show="focus"/>
          </Col>
          <Col xs={12} lg={6} className="d-flex flex-column">
            <InputGroup className="signup-password-group">
              <FormControl
                className={
                  form.password.touched && !form.password.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "signup-password-error-form-ar" : "signup-password-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "signup-password-form-ar" : "signup-password-form"
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
                  "sign-up-toggle-btn-ar" : "sign-up-toggle-btn"
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
                "my-2 text-right password-strength-txt-ar" :
                "mt-2 password-strength-txt"
              }
              data-score={score}>
            {
              score === '' && form.password.touched ?
              t('enterPasswd') :
              strength[score]
            }
            </span>
            <meter
              max="4"
              className={
                i18n.translator.language === "ar" ?
                "ml-auto password-strength" : "ml-2 password-strength"
              }
              data-score={score}></meter>
          </Col>
        </Row>
        <div
          id={
            i18n.translator.language === "ar" ?
            "sign-up-newsl-ar" : "sign-up-newsl"
          }
          className={
            i18n.translator.language === "ar" ?
            "mt-4 text-right" : "mt-4"
          }>
          {t('NEWSLETTER PREFERENCES')}
        </div>
        <div
          id={
            i18n.translator.language === "ar" ?
            "newslFashion-checkbox-ar" : "newslFashion-checkbox"
          }
          className={
            i18n.translator.language === "ar" ?
            "mt-4 mb-1 text-right" : "mt-4 mb-1"
          }>
          <Control.checkbox model=".newsletterFashion" id="newslFashion" />
          <label
            className={
              i18n.translator.language === "ar" ?
              "pr-2" : "pl-2"
            }
            htmlFor="newslFashion">
            <Trans>FASHION</Trans>
          </label>
        </div>
        <div
          id={
            i18n.translator.language === "ar" ?
            "newslFJ-checkbox-ar" : "newslFJ-checkbox"
          }
          className={
            i18n.translator.language === "ar" ?
            "mb-1 text-right" : "mb-1"
          }>
          <Control.checkbox model=".newsletterFineJewelry" id="newslFJ" />
          <label
            className={
              i18n.translator.language === "ar" ?
              "pr-2" : "pl-2"
            }
            htmlFor="newslFJ">
            <Trans>FINE JEWELRY</Trans>
          </label>
        </div>
        <div
          id={
            i18n.translator.language === "ar" ?
            "newslHC-checkbox-ar" : "newslHC-checkbox"
          }
          className={
            i18n.translator.language === "ar" ?
            "mb-1 text-right" : "mb-1"
          }>
          <Control.checkbox model=".newsletterHomeCollection" id="newslHC" />
          <label
            className={
              i18n.translator.language === "ar" ?
              "pr-2" : "pl-2"
            }
            htmlFor="newslHC">
            <Trans>HOME COLLECTION</Trans>
          </label>
        </div>
        <div className="my-4">
          <div
            id={
              i18n.translator.language === "ar" ?
              "ageLimit-checkbox-ar" : "ageLimit-checkbox"
            }
            className={
              i18n.translator.language === "ar" ?
              "text-right" : ""
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
              i18n.translator.language === "ar" ?
              "pr-2 text-right signup-age-error-ar" : "pl-2 signup-age-error"
            }>{props.children}</div>}
            show="focus"/>
        </div>
        <Button
          className="mb-4 mb-lg-0 align-self-center"
          id={
            isPending ?
            (
              i18n.translator.language === "ar" ?
              "sign-up-pending-btn-ar" : "sign-up-pending-btn"
            )
            :
            (
              i18n.translator.language === "ar" ?
              "sign-up-btn-ar" : "sign-up-btn"
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

export default withTranslation()(SignUpComponent);
