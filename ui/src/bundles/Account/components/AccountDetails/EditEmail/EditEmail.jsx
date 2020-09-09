// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import { Form, Errors } from 'react-redux-form';
import FormControl from 'components/FormControl';
import type { FormProps } from 'util/Form';
import { modelPath } from 'bundles/Account/modules/AccountDetails/EditEmailModule';
import isEmail from 'validator/lib/isEmail';
import { isRequired } from 'util/Validator';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import './EditEmail.scss';
import closeSign from '../../../../../static/icons/close.svg';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  form: {[string]: FormProps},
  i18n: Object,
  isHidden3: boolean,
  isPending: boolean,
  onEditEmail: (userID: string, data: Object) => any,
  onToggleMask3: () => any,
  t: Object,
  userID: string,
  email: string,
  toggleEmail: () => any,
};

export const EditEmailComponent = ({
  form, i18n, t, userID, isPending, onEditEmail, email, isHidden3, onToggleMask3,
  toggleEmail,
}: Props) => (
  <Container id="editemail-container" className="d-flex flex-column" fluid>
    <Row
      className="flex-grow-1 px-1 px-md-3 px-lg-0"
      id={
        i18n.translator.language === "ar" ?
        "editemail-inner-ar" : "editemail-inner"
      }>
      <Col className="d-none d-sm-flex" xs={12} sm={2} md={4}></Col>
      <Col xs={12} sm={8} md={4} className="align-items-center">
        <Row className="d-flex flex-row mt-1 mb-5" id="editemail-header">
          <div
            className="flex-grow-1 mt-2 pb-1 text-center"
            id={
              i18n.translator.language === "ar" ?
              "editemail-title-ar" :
              "editemail-title"
            }>
            {t('CHANGE YOUR EMAIL')}
          </div>
          <Image
            className="mb-2"
            id="editemail-close-btn"
            src={closeSign}
            alt=""
            width="24"
            height="24"
            onClick={() => toggleEmail()} />
        </Row>
        <div
          id={
            i18n.translator.language === "ar" ?
            "current-email-ar" : "current-email"
          }
          className="text-center">
          {t('currentEmail', {email: email})}
        </div>
        <Form
          className="row d-flex flex-column mt-4 mb-5 align-items-center"
          model={modelPath}
          onSubmit={data => onEditEmail(userID, data)}
          autoComplete="off"
          hideNativeErrors
        >
              <FormControl
                className={
                  form.email.touched && !form.email.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "editemail-email-error-form-ar" :
                    "editemail-email-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "editemail-email-form-ar" :
                    "editemail-email-form"
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
                  "editemail-email-error-ar" :
                  "editemail-email-error"
                }>
                  {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
              />
              <InputGroup className="editemail-password-group">
                <FormControl
                  className={
                    form.password.touched && !form.password.valid ?
                    (
                      i18n.translator.language === "ar" ?
                      "editemail-password-error-form-ar" :
                      "editemail-password-error-form"
                    )
                    :
                    (
                      i18n.translator.language === "ar" ?
                      "editemail-password-form-ar" :
                      "editemail-password-form"
                    )
                  }
                  id="password"
                  formProps={form.password}
                  controlProps={{
                    type: isHidden3 ? 'password' : 'text',
                    placeholder: t('PASSWORD'),
                    maxLength: 128,
                  }}
                  validators={{
                    isRequired,
                  }}
                />
                <InputGroup.Append
                  onClick={() => onToggleMask3()}
                  type="button"
                  id={
                    i18n.translator.language === "ar" ?
                    "editemail-toggle-btn-ar" : "editemail-toggle-btn"
                  }
                  className="mt-2">
                  <InputGroup.Text>
                    { isHidden3 ? t('Show') : t('Hide') }
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
              <Errors
                model=".password"
                messages={{
                    isRequired: t('enterPasswd')
                }}
                wrapper={(props) => <div className={
                  i18n.translator.language === "ar" ?
                  "editemail-password-error-ar" :
                  "editemail-password-error"
                }>
                  {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
              />
             <Button
               className="mt-5"
               id={
                 isPending ?
                 (
                   i18n.translator.language === "it" ?
                   "editemail-pending-it-btn" :
                   (
                     i18n.translator.language === "ar" ?
                     "editemail-pending-ar-btn" :
                     "editemail-pending-btn"
                   )
                 )
                 :
                 (
                   i18n.translator.language === "ar" ?
                   "editemail-btn-ar" : "editemail-btn"
                 )
               }
               type="submit"
               disabled={!form.$form.valid || isPending}>
              {isPending ? <Trans>LOADING</Trans> : <Trans>SAVE</Trans>}
            </Button>
        </Form>
      </Col>
      <Col className="d-none d-sm-flex" xs={12} sm={2} md={4}></Col>
    </Row>
  </Container>
);

export default withTranslation()(EditEmailComponent);
