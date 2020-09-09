// @flow
import React from 'react';
import { Form, Errors } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { isRequired } from 'util/Validator';
import { modelPath } from 'bundles/Home/modules/CheckEmailModule';
import FormControl from 'components/FormControl';
import isEmail from 'validator/lib/isEmail';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';

import './CheckEmail.scss';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  form: {[string]: FormProps},
  i18n: Object,
  t: Object,
  isPending: boolean,
  checkEmail: (data: Object) => any,
}

export const CheckEmailComponent = ({
  i18n, t, form, isPending, checkEmail,
}: Props) => (
  <Row>
    <Col md={2} xl={3} className="d-none d-md-flex"></Col>
    <Col xs={12} md={8} xl={6}>
      <ListGroup
        id={
          i18n.translator.language === "ar" ?
          "beforecheckout-titles-ar" : "beforecheckout-titles"
        }
        className={
          i18n.translator.language === "ar" ?
          "mt-4 text-right" : ""
        }>
        <ListGroup.Item className="px-0 px-sm-3">
          {t('emailAddressRequired')}
        </ListGroup.Item>
        <ListGroup.Item className="px-0 px-sm-3 pb-0">
          {t('checkEmailMsg1')}
        </ListGroup.Item>
        <ListGroup.Item className="px-0 px-sm-3 pt-0">
          {t('checkEmailMsg2')}
        </ListGroup.Item>
      </ListGroup>
      <Form
        className="px-0 px-sm-3 d-flex flex-column"
        model={modelPath}
        onSubmit={checkEmail}
        autoComplete="off">
        <FormControl
          className={
            form.email.touched && !form.email.valid ?
            (
              i18n.translator.language === "ar" ?
              "text-right ml-auto check-email-email-error-form-ar" :
              "check-email-email-error-form"
            )
            :
            (
              i18n.translator.language === "ar" ?
              "text-right ml-auto check-email-email-form-ar" :
              "check-email-email-form"
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
              isRequired:  t('enterEmail'),
              isEmail:  t('enterValidEmail')
          }}
          wrapper={(props) => <div className={
            i18n.translator.language === "ar" ?
            "text-right check-email-email-error-ar" :
            "check-email-email-error"
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
              "check-email-pending-it-btn" :
              (
                i18n.translator.language === "ar" ?
                 "check-email-pending-ar-btn" :
                 "check-email-btn"
              )
            )
            :
            (
              i18n.translator.language === "ar" ?
               "check-email-ar-btn" :
               "check-email-btn"
            )
          }
          type="submit"
          disabled={!form.$form.valid || isPending}>
          {isPending ? <Trans>LOADING</Trans> : <Trans>PROCEED</Trans>}
        </Button>
      </Form>
    </Col>
    <Col md={2} xl={3} className="d-none d-md-flex"></Col>
  </Row>
);

export default withTranslation()(CheckEmailComponent);
