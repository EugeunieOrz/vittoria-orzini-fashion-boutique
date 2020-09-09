// @flow
import React from 'react';
import { Form } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { isRequired } from 'util/Validator';
import { modelPath } from 'bundles/Account/modules/AccountDetails/ChangePasswordModule';
import FormControl from 'components/FormControl';
import type { FormProps } from 'util/Form';
import zxcvbn from 'zxcvbn';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import './ChangePassword.scss';
import closeSign from '../../../../../static/icons/close.svg';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  userID: string,
  score: string,
  isHidden: boolean,
  isHidden2: boolean,
  form: {[string]: FormProps},
  isPending: boolean,
  i18n: Object,
  onUpdate: (userID: string, data: Object) => any,
  onToggleMask: () => any,
  onToggleMask2: () => any,
  onCheckPasswordStrength: () => any,
  t: Object,
  togglePasswordForm: () => any,
}

const strength = {
  0: "Too short",
  1: "Weak",
  2: "Good",
  3: "Strong",
  4: "Very strong"
}

export const ChangePasswordComponent = ({
  score, isHidden, isHidden2, userID, form, isPending, i18n, onUpdate, onToggleMask,
  onToggleMask2, onCheckPasswordStrength, t, togglePasswordForm,
}: Props) => (
  <Container id="changepasswd-container" className="d-flex flex-column" fluid>
    <Row
      className="flex-grow-1 px-1 px-md-3 px-lg-0"
      id={
        i18n.translator.language === "ar" ?
        "changepasswd-inner-ar" : "changepasswd-inner"
      }>
      <Col className="d-none d-sm-flex" xs={12} sm={2} md={4}></Col>
      <Col xs={12} sm={8} md={4} className="align-items-center">
        <Row className="d-flex flex-row mt-1 mb-5" id="changepasswd-header">
          <div
            className="flex-grow-1 mt-2 pb-1 text-center"
            id={
              i18n.translator.language === "ar" ?
              "changepasswd-title-ar" : "changepasswd-title"
            }>
            {t('CHANGE YOUR PASSWORD')}
          </div>
          <Image
            className="mb-2"
            id="changepasswd-close-btn"
            src={closeSign}
            alt=""
            width="24"
            height="24"
            onClick={() => togglePasswordForm()} />
        </Row>
        <Form
          className="row d-flex flex-column mt-4 mb-5 align-items-center"
          model={modelPath}
          onSubmit={data => onUpdate(userID, data)}
          autoComplete="off">
          <InputGroup className="changepasswd-oldpassword-group">
            <FormControl
              className={
                form.oldPassword.touched && !form.oldPassword.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "changepasswd-oldpassword-error-form-ar" :
                  "changepasswd-oldpassword-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "changepasswd-oldpassword-form-ar" :
                  "changepasswd-oldpassword-form"
                )
              }
              id="oldPassword"
              formProps={form.oldPassword}
              controlProps={{
                type: isHidden ? 'password' : 'text',
                placeholder: t('PASSWORD'),
              }}
              validators={{
                isRequired
              }}
            />
            <InputGroup.Append
              onClick={() => onToggleMask()}
              type="button"
              className={
                i18n.translator.language === "ar" ?
                "mt-2 changepasswd-toggle-btn-ar" :
                "mt-2 changepasswd-toggle-btn"
              }>
              <InputGroup.Text>
                { isHidden ? t('Show') : t('Hide') }
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <InputGroup className="changepasswd-newpassword-group">
            <FormControl
              className={
                form.password.touched && !form.password.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "changepasswd-password-error-form-ar" :
                  "changepasswd-password-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "changepasswd-password-form-ar" :
                  "changepasswd-password-form"
                )
              }
              id="password"
              formProps={form.password}
              controlProps={{
                type: isHidden2 ? 'password' : 'text',
                placeholder: t('newPasswd'),
              }}
              validators={{
                scoreVeryStrong: (val) => zxcvbn(val).score > 1,
              }}
              onChange={(modelValue) => onCheckPasswordStrength(modelValue.target.value)}
            />
            <InputGroup.Append
              onClick={() => onToggleMask2()}
              type="button"
              className={
                i18n.translator.language === "ar" ?
                "mt-2 changepasswd-toggle-btn-ar" :
                "mt-2 changepasswd-toggle-btn"
              }>
              <InputGroup.Text>
                { isHidden2 ? t('Show') : t('Hide') }
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
          <div className="d-flex align-items-center ml-5 password-strength-meter">
            <span className={
                score === '' && form.password.touched ?
                (
                  i18n.translator.language === "ar" ?
                  "text-right password-error-txt-ar" :
                  "password-error-txt"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "text-right password-strength-txt-ar" :
                  "password-strength-txt"
                )
              } data-score={score}>
              {!form.$form.pristine &&
                (
                  score === '' && form.password.touched ?
                  t('enterPasswd') :
                  strength[score]
                )
              }
            </span>
            {!form.$form.pristine &&
              <meter
                max="4"
                className="ml-3 password-strength"
                data-score={score}></meter>
            }
          </div>
          <Button
            className="mt-5"
            id={
              isPending ?
              (
                i18n.translator.language === "it" ?
                "changepasswd-pending-it-btn" :
                (
                  i18n.translator.language === "ar" ?
                  "changepasswd-pending-ar-btn" :
                  "changepasswd-pending-btn"
                )
              )
              :
              (
                i18n.translator.language === "ar" ?
                "changepasswd-ar-btn" :
                "changepasswd-btn"
              )
            }
            type="submit"
            disabled={!form.$form.valid || isPending}>
            {isPending ? <Trans>LOADING</Trans> : <Trans>Update</Trans>}
          </Button>
        </Form>
      </Col>
      <Col className="d-none d-sm-flex" xs={12} sm={2} md={4}></Col>
    </Row>
  </Container>
);

export default withTranslation()(ChangePasswordComponent);
