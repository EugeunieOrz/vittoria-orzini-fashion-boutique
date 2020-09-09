// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { Errors, Form, Control } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { isLatin, isRequired } from 'util/Validator';
import { modelPath } from 'bundles/Account/modules/Addresses/AddNewAddressFormModule';
import FormControl from 'components/FormControl';
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
import type { FormProps } from 'util/Form';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import '../../AddressCard.scss';
import closeSign from '../../../../../static/icons/close.svg';

type Props = {
  form: {[string]: FormProps},
  isPending: boolean,
  i18n: Object,
  onAddNewAddress: (userID: string, countryByIP: string, data: Object) => any,
  t: Object,
  toggleAddNewAddress: () => any,
  userID: string,
}

export const AddNewAddressComponent = ({
  form, isPending, i18n, onAddNewAddress, t, userID,
  toggleAddNewAddress,
}: Props) => (
  <Container
    className={
      i18n.translator.language === "ar" ?
      "address-container-ar" :
      "address-container"
    }
    fluid>
    <Row className="px-1 px-md-3 px-lg-0">
      <Col className="d-none d-sm-flex" xs={12} sm={4} md={5}></Col>
      <Col xs={12} sm={8} md={7}>
        <Row className="d-flex flex-row my-1">
          <div
            className={
              i18n.translator.language === "ar" ?
              "flex-grow-1 mt-2 pb-1 text-right address-title-ar" :
              "flex-grow-1 mt-2 pb-1 address-title"
            }>
            {t('ADD A NEW ADDRESS')}
          </div>
          <Image
            className="mb-2 address-close-btn"
            src={closeSign}
            alt=""
            width="24"
            height="24"
            onClick={() => toggleAddNewAddress()} />
        </Row>
        <Row
          className={
            i18n.translator.language === "ar" ?
            "mt-4 mb-3 text-right address-required-fields-msg-ar" :
            "mt-4 mb-3 address-required-fields-msg"
          }>
          {t('required')}
        </Row>
        <Form
          className="row d-flex flex-column mb-5"
          model={modelPath} onSubmit={data => onAddNewAddress({
            userID: userID,
            countryByIP: 'N/A',
            data: data
          })}
          autoComplete="off" hideNativeErrors
        >
          <Row>
            <Col xs={12} lg={6}>
              <FormControl
                className={
                  form.firstName.touched && !form.firstName.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "address-firstName-error-form-ar" :
                    "address-firstName-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "address-firstName-form-ar" :
                    "address-firstName-form"
                  )
                }
                id="firstName"
                formProps={form.firstName}
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
                  "text-right address-firstName-error-ar" :
                  "address-firstName-error"
                }>
                  {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
              />
              <FormControl
                className={
                  i18n.translator.language === "ar" ?
                  "address-additional-form-ar" :
                  "address-additional-form"
                }
                id="additional"
                formProps={form.additional}
                controlProps={{
                  type: 'text',
                  placeholder: t('addInfo'),
                  maxLength: 255,
                }}
              />
              <FormControl
                className={
                  form.zipCode.touched && !form.zipCode.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "address-zipCode-error-form-ar" :
                    "address-zipCode-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "address-zipCode-form-ar" :
                    "address-zipCode-form"
                  )
                }
                id="zipCode"
                formProps={form.zipCode}
                controlProps={{
                  type: 'text',
                  placeholder: t('zipCode'),
                  maxLength: 255,
                }}
                validators={{
                  isRequired,
                }}
              />
              <Errors
                model=".zipCode"
                messages={{
                    isRequired: t('enterZipCode')
                }}
                wrapper={(props) => <div className={
                  i18n.translator.language === "ar" ?
                  "text-right address-zipCode-error-ar" :
                  "address-zipCode-error"
                }>
                  {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
              />
              <FormControl
                className={
                  form.country.touched && !form.country.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "address-country-error-form-ar" :
                    "address-country-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "address-country-form-ar" :
                    "address-country-form"
                  )
                }
                id="country"
                formProps={form.country}
                controlProps={{
                  type: 'text',
                  placeholder: t('country'),
                  maxLength: 255,
                }}
                validators={{
                  isRequired
                }}
              />
              <Errors
                model=".country"
                messages={{
                    isRequired: t('enterCountry')
                }}
                wrapper={(props) => <div className={
                  i18n.translator.language === "ar" ?
                  "text-right address-country-error-ar" :
                  "address-country-error"
                }>
                  {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
              />
            <p className={
                i18n.translator.language === "ar" ?
                "text-right address-country-tip-ar" :
                "address-country-tip"
              }>
                {t('countryTip')}
              </p>
              <FormControl
                className={
                  form.email.touched && !form.email.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "address-email-error-form-ar" :
                    "address-email-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "address-email-form-ar" :
                    "address-email-form"
                  )
                }
                id="email"
                formProps={form.email}
                controlProps={{
                  type: 'email',
                  placeholder: t('emailAddressRequired'),
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
                    isEmail: t('enterValidEmail'),
                    isRequired: t('enterEmail')
                }}
                wrapper={(props) => <div className={
                  i18n.translator.language === "ar" ?
                  "address-email-error-ar" :
                  "address-email-error"
                }>
                  {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
              />
            </Col>
            <Col xs={12} lg={6}>
              <FormControl
                className={
                  form.lastName.touched && !form.lastName.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "address-lastName-error-form-ar" :
                    "address-lastName-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "address-lastName-form-ar" :
                    "address-lastName-form"
                  )
                }
                id="lastName"
                formProps={form.lastName}
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
                    isRequired: t('enterLastName'),
                }}
                wrapper={(props) => <div className={
                  i18n.translator.language === "ar" ?
                  "text-right address-lastName-error-ar" :
                  "address-lastName-error"
                }>
                  {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
              />
              <FormControl
                className={
                  form.address.touched && !form.address.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "address-address-error-form-ar" :
                    "address-address-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "address-address-form-ar" :
                    "address-address-form"
                  )
                }
                id="address"
                formProps={form.address}
                controlProps={{
                  type: 'text',
                  placeholder: t('address'),
                  maxLength: 255,
                }}
                validators={{
                  isRequired
                }}
              />
              <Errors
                model=".address"
                messages={{
                    isRequired: t('enterAddress')
                }}
                wrapper={(props) => <div className={
                  i18n.translator.language === "ar" ?
                  "text-right address-address-error-ar" :
                  "address-address-error"
                }>
                  {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
              />
              <FormControl
                className={
                  form.city.touched && !form.city.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "address-city-error-form-ar" :
                    "address-city-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "address-city-form-ar" :
                    "address-city-form"
                  )
                }
                id="city"
                formProps={form.city}
                controlProps={{
                  type: 'text',
                  placeholder: t('city'),
                  maxLength: 255,
                }}
                validators={{
                  isRequired
                }}
              />
              <Errors
                model=".city"
                messages={{
                    isRequired: t('enterCity')
                }}
                wrapper={(props) => <div className={
                  i18n.translator.language === "ar" ?
                  "text-right address-city-error-ar" :
                  "address-city-error"
                }>
                  {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
              />
              <FormControl
                className={
                  form.province.touched && !form.province.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "address-province-error-form-ar" :
                    "address-province-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "address-province-form-ar" :
                    "address-province-form"
                  )
                }
                id="province"
                formProps={form.province}
                controlProps={{
                  type: 'text',
                  placeholder: t('province'),
                  maxLength: 255,
                }}
                validators={{
                  isRequired
                }}
              />
              <Errors
                model=".province"
                messages={{
                    isRequired: t('enterProvince')
                }}
                wrapper={(props) => <div className={
                  i18n.translator.language === "ar" ?
                  "text-right address-province-error-ar" :
                  "address-province-error"
                }>
                  {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} lg={6}>
              <FormControl
                className={
                  form.dayTelephone.touched && !form.dayTelephone.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "address-dayTelephone-error-form-ar" :
                    "address-dayTelephone-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "address-dayTelephone-form-ar" :
                    "address-dayTelephone-form"
                  )
                }
                id="dayTelephone"
                formProps={form.dayTelephone}
                controlProps={{
                  type: 'text',
                  placeholder: t('telDay'),
                  maxLength: 255,
                }}
                validators={{
                  isRequired
                }}
              />
              <Errors
                model=".dayTelephone"
                messages={{
                    isRequired: t('enterTelephone')
                }}
                wrapper={(props) => <div className={
                  i18n.translator.language === "ar" ?
                  "text-right address-dayTelephone-error-ar" :
                  "address-dayTelephone-error"
                }>
                {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
              />
            </Col>
            <Col xs={12} lg={6}>
              <FormControl
                className={
                  i18n.translator.language === "ar" ?
                  "address-eveningTelephone-form-ar" :
                  "address-eveningTelephone-form"
                }
                id="eveningTelephone"
                formProps={form.eveningTelephone}
                controlProps={{
                  type: 'text',
                  placeholder: t('telEv'),
                  maxLength: 255,
                }}
              />
            </Col>
          </Row>
          <div className="d-flex flex-column mb-5">
            <div
              className={
                i18n.translator.language === "ar" ?
                "mt-4 mb-1 text-right defShipAddr-checkbox-ar" :
                "mt-4 mb-1 defShipAddr-checkbox"
              }>
              <Control.checkbox model=".defShipAddr" id="defShipAddr" />
              <label
                className={
                  i18n.translator.language === "ar" ?
                  "pr-2" : "pl-2"
                }
                htmlFor="defShipAddr">
                {t('shippingAddrDefault')}
              </label>
            </div>
            <div
              className={
                i18n.translator.language === "ar" ?
                "mt-2 mb-1 text-right prefBillingAddr-checkbox-ar" :
                "mt-2 mb-1 prefBillingAddr-checkbox"
              }>
              <Control.checkbox model=".preferBillAddr" id="prefBillingAddr" />
              <label
                className={
                  i18n.translator.language === "ar" ?
                  "pr-2" : "pl-2"
                }
                htmlFor="prefBillingAddr">
                {t('billingAddrPref')}
              </label>
            </div>
            <div className={
                i18n.translator.language === "ar" ?
                "text-right address-msg1-ar" :
                "address-msg1"
              }>
              {t('dataMsg1')}
            </div>
            <div className={
                i18n.translator.language === "ar" ?
                "text-right address-msg2-ar" :
                "address-msg2"
              }>
              {t('dataMsg2')}
            </div>
          </div>
          <Button
            className={
              isPending ?
              (
                i18n.translator.language === "it" ?
                "align-self-center address-pending-it-btn" :
                (
                  i18n.translator.language === "ar" ?
                  "align-self-center address-pending-ar-btn" :
                  "align-self-center address-pending-btn"
                )
              )
              :
              (
                i18n.translator.language === "ar" ?
                "align-self-center address-ar-btn" :
                "align-self-center address-btn"
              )
            }
            type="submit"
            disabled={!form.$form.valid || isPending}>
            {isPending ? <Trans>LOADING</Trans> : <Trans>CONFIRM</Trans>}
          </Button>
       </Form>
      </Col>
    </Row>
  </Container>
);

export default withTranslation()(AddNewAddressComponent);
