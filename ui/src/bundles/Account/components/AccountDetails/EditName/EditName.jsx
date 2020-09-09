// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import { Form, Control, Errors } from 'react-redux-form';
import FormControl from 'components/FormControl';
import type { FormProps } from 'util/Form';
import { modelPathEditName } from 'bundles/Account/modules/AccountDetails/EditNameModule';
import isAlpha from 'validator/lib/isAlpha';
import { isLatin, isRequired, titleRequired } from 'util/Validator';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import './EditName.scss';
import closeSign from '../../../../../static/icons/close.svg';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  formEditName: {[string]: FormProps},
  i18n: Object,
  t: Object,
  isPendingEditName: boolean,
  onEditName: (userID: string, data: Object) => any,
  toggleName: () => any,
  userID: string,
};

export const EditNameComponent = ({
  formEditName, i18n, t, userID, isPendingEditName, onEditName, toggleName,
}: Props) => (
  <Container
    id={
      i18n.translator.language === "ar" ?
      "editname-container-ar" : "editname-container"
    }
    className="d-flex flex-column" fluid>
    <Row
      className="flex-grow-1 px-1 px-md-3 px-lg-0"
      id={
        i18n.translator.language === "ar" ?
        "editname-inner-ar" : "editname-inner"
      }>
      <Col className="d-none d-sm-flex" xs={12} sm={2} md={4}></Col>
      <Col xs={12} sm={8} md={4} className="align-items-center">
        <Row className="d-flex flex-row mt-1 mb-5" id="editname-header">
          <div
            className="flex-grow-1 mt-2 pb-1 text-center"
            id={
              i18n.translator.language === "ar" ?
              "editname-title-ar" : "editname-title"
            }>
            {t('CHANGE YOUR NAME')}
          </div>
          <Image
            className="mb-2"
            id="editname-close-btn"
            src={closeSign}
            alt=""
            width="24"
            height="24"
            onClick={() => toggleName()} />
        </Row>
        <Form
          className="row d-flex flex-column mb-5 align-items-center"
          model={modelPathEditName}
          onSubmit={data => onEditName(userID, data)}
          autoComplete="off"
          hideNativeErrors>
          <Control.select
            className="mb-3"
            model=".title" id=".title" validators={{ titleRequired, }}>
            <option value="title">{t('title')}</option>
            <option value="Mr.">{t('Mr.')}</option>
            <option value="Mrs.">{t('Mrs.')}</option>
            <option value="Ms.">{t('Ms.')}</option>
          </Control.select>
          <Errors
            model=".title"
            messages={{ titleRequired: t('enterTitle'), }}
            wrapper={(props) => <div className={
              i18n.translator.language === "ar" ?
              "text-right editname-title-error-ar" : "editname-title-error"
            }>{props.children}</div>}
            show="focus"
          />
          <FormControl
            className={
              formEditName.firstName.touched && !formEditName.firstName.valid ?
              (
                i18n.translator.language === "ar" ?
                "editname-firstName-error-form-ar" :
                "editname-firstName-error-form"
              )
              :
              (
                i18n.translator.language === "ar" ?
                "editname-firstName-form-ar" :
                "editname-firstName-form"
              )
            }
            id="firstName"
            formProps={formEditName.firstName}
            controlProps={{
              type: 'text',
              placeholder: t('firstName'),
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
              "text-right editname-fname-error-ar" : "editname-fname-error"
            }>{props.children[0]}<br />{props.children[1]}</div>}
            show="focus"
          />
          <FormControl
            className={
              formEditName.lastName.touched && !formEditName.lastName.valid ?
              (
                i18n.translator.language === "ar" ?
                "editname-lastName-error-form-ar" :
                "editname-lastName-error-form"
              )
              :
              (
                i18n.translator.language === "ar" ?
                "editname-lastName-form-ar" :
                "editname-lastName-form"
              )
            }
            id="lastName"
            formProps={formEditName.lastName}
            controlProps={{
              type: 'text',
              placeholder: t('lastName'),
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
              "text-right editname-lname-error-ar" : "editname-lname-error"
            }>{props.children[0]}<br />{props.children[1]}</div>}
            show="focus"
          />
        <Button
          className="mt-5"
          id={
            isPendingEditName ?
            (
              i18n.translator.language === "it" ?
              "editname-pending-it-btn" :
              (
                i18n.translator.language === "ar" ?
                "editname-pending-ar-btn" :
                "editname-pending-btn"
              )
            )
            :
            (
              i18n.translator.language === "ar" ?
              "editname-btn-ar" : "editname-btn"
            )
          }
          type="submit"
          disabled={!formEditName.$form.valid || isPendingEditName}>
          {isPendingEditName ? <Trans>LOADING</Trans> : <Trans>SAVE</Trans>}
        </Button>
        </Form>
      </Col>
      <Col className="d-none d-sm-flex" xs={12} sm={2} md={4}></Col>
    </Row>
  </Container>
);

export default withTranslation()(EditNameComponent);
