// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { Form } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { modelPath } from 'bundles/Auth/modules/ResetPasswordModule';
import FormControl from 'components/FormControl';
import type { FormProps } from 'util/Form';
import zxcvbn from 'zxcvbn';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import './ResetPassword.scss';

type Props = {
  score: string,
  isHidden: boolean,
  token: string,
  form: {[string]: FormProps},
  isPending: boolean,
  i18n: Object,
  onReset: (token: string, data: Object) => any,
  onToggleMask: () => any,
  onCheckPasswordStrength: () => any,
  t: Object,
}

const strength = {
  0: "Too short",
  1: "Weak",
  2: "Good",
  3: "Strong",
  4: "Very strong"
}

export const ResetPasswordComponent = ({
  score, isHidden, token, form, isPending, i18n, t, onReset, onToggleMask, onCheckPasswordStrength,
}: Props) => (
  <div
    id="reset-password-row"
    className="mt-5 d-flex flex-column flex-grow-1 align-items-center">
    <div className="d-flex flex-column">
      <div
        className={
          i18n.translator.language === "ar" ?
          "text-right" : ""
        }
        id={
          i18n.translator.language === "ar" ?
          "reset-password-header-ar" : "reset-password-header"
        }>
        {t('Reset password')}
      </div>
      <div
        id={
          i18n.translator.language === "ar" ?
          "reset-password-msg-ar" : "reset-password-msg"
        }
        className={
          i18n.translator.language === "ar" ?
          "text-right my-4" : "my-4"
        }>
        {t('strongPasswds')}
      </div>
      <Form model={modelPath} onSubmit={data => onReset(token, data)} autoComplete="off">
        <InputGroup className="reset-password-group">
          <FormControl
            className={
              i18n.translator.language === "ar" ?
              "reset-password-form-ar" : "reset-password-form"
            }
            id="password"
            formProps={form.password}
            controlProps={{
              type: isHidden ? 'password' : 'text',
              placeholder: t('PASSWORD'),
            }}
            validators={{
              scoreVeryStrong: (val) => zxcvbn(val).score > 1,
            }}
            onChange={(modelValue) => onCheckPasswordStrength(modelValue.target.value)}
          />
          <InputGroup.Append
            onClick={() => onToggleMask()}
            type="button"
            id={
              i18n.translator.language === "ar" ?
              "reset-password-toggle-btn-ar" :
              "reset-password-toggle-btn"
            }
            className="mt-2">
            <InputGroup.Text>
              { isHidden ? t('Show') : t('Hide') }
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
        <div className={
            i18n.translator.language === "ar" ?
            "d-flex flex-column text-right password-strength-meter" :
            "d-flex flex-column align-items-center password-strength-meter"
          }>
          <span
            className={
              i18n.translator.language === "ar" ?
              "mb-2 password-strength-txt-ar" :
              "password-strength-txt"
            }
            data-score={score}>
          {
            score === '' && form.password.touched ?
            t('enterPasswd') :
            <Trans>{strength[score]}</Trans>
          }
          </span>
          <meter
            max="4"
            className={
              i18n.translator.language === "ar" ?
              "ml-auto password-strength" :
              "ml-3 password-strength"
            }
            data-score={score}></meter>
        </div>
        <Row className="pt-4 d-flex justify-content-center">
          <Button id={
              isPending ?
              (
                i18n.translator.language === "it" ?
                "reset-password-pending-it-btn" :
                (
                  i18n.translator.language === "ar" ?
                  "reset-password-pending-ar-btn" :
                  "reset-password-pending-btn"
                )
              )
              :
              (
                i18n.translator.language === "ar" ?
                "reset-password-ar-btn" :
                "reset-password-btn"
              )
            }
            type="submit"
            disabled={!form.$form.valid || isPending}>
            {isPending ? <Trans>LOADING</Trans> : t('resetPasswd')}
         </Button>
        </Row>
      </Form>
    </div>
  </div>
);

export default withTranslation()(ResetPasswordComponent);
