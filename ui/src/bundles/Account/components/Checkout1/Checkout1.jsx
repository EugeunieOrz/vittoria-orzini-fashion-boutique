// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { Errors, Form, Control } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { isLatin, isRequired, monthRequired, yearRequired } from 'util/Validator';
import { modelPath } from 'bundles/Account/modules/Checkout1/CheckoutFormModule';
import FormControl from 'components/FormControl';
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
import type { FormProps } from 'util/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../Checkout.scss';
import months from '../../../../static/json/months_num';
import years from '../../../../static/json/years_num';

type Props = {
  countryByIP: string,
  fillCheckoutData: (countryByIP: string, data: Object, userID: string) => any,
  form: {[string]: FormProps},
  isPending: boolean,
  i18n: Object,
  month: string,
  onSelectExpMonth1: () => any,
  onSelectExpYear1: () => any,
  t: Object,
  userID: string,
  year: string,
}

export const Checkout1Component = ({
countryByIP, fillCheckoutData, form, isPending, i18n, t, userID,
onSelectExpMonth1, onSelectExpYear1, month, year,
}: Props) => (
  <Row className="mt-4">
    <Col md={2} xl={3} className="d-none d-md-flex"></Col>
    <Col xs={12} md={8} xl={6}>
      <div className={
          i18n.translator.language === "ar" ?
          "py-1 mt-2 mb-4 text-center shipping-address-title-ar" :
          "py-1 mt-2 mb-4 text-center shipping-address-title"
        }>
        {t('shippingAddr')}
      </div>
      <div className={
          i18n.translator.language === "ar" ?
          "text-right required-fields-msg-ar" :
          "required-fields-msg"
        }>
        {t('required')}
      </div>
      <Form
        className="d-flex flex-column mt-3"
        model={modelPath}
        onSubmit={data => fillCheckoutData({
            countryByIP: countryByIP,
            data: data,
            userID: userID
        })} autoComplete="off" hideNativeErrors>
        <Row>
          <Col xs={12} lg={6}>
            <FormControl
              className={
                form.firstName.touched && !form.firstName.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "checkout-firstName-error-form-ar" :
                  "checkout-firstName-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "checkout-firstName-form-ar" :
                  "checkout-firstName-form"
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
                  isLatin: t('checkFirstName'),
                  isRequired: t('enterFirstName')
              }}
              wrapper={(props) => <div className={
                i18n.translator.language === "ar" ?
                "text-right checkout-firstName-error-ar" :
                "checkout-firstName-error"
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
                  "checkout-lastName-error-form-ar" :
                  "checkout-lastName-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "checkout-lastName-form-ar" :
                  "checkout-lastName-form"
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
                  isRequired: t('enterLastName')
              }}
              wrapper={(props) => <div className={
                i18n.translator.language === "ar" ?
                "text-right checkout-lastName-error-ar" :
                "checkout-lastName-error"
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
                i18n.translator.language === "ar" ?
                "checkout-additional-form-ar" :
                "checkout-additional-form"
              }
              id="additional"
              formProps={form.additional}
              controlProps={{
                type: 'text',
                placeholder: t('addInfo'),
                maxLength: 255,
              }}
            />
          </Col>
          <Col xs={12} lg={6}>
            <FormControl
              className={
                form.address.touched && !form.address.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "checkout-address-error-form-ar" :
                  "checkout-address-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "checkout-address-form-ar" :
                  "checkout-address-form"
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
                "text-right checkout-address-error-ar" :
                "checkout-address-error"
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
                form.zipCode.touched && !form.zipCode.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "checkout-zipCode-error-form-ar" :
                  "checkout-zipCode-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "checkout-zipCode-form-ar" :
                  "checkout-zipCode-form"
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
                "text-right checkout-zipCode-error-ar" :
                "checkout-zipCode-error"
              }>
                {props.children[0]}<br />{props.children[1]}</div>}
              show="focus"
            />
          </Col>
          <Col xs={12} lg={6}>
            <FormControl
              className={
                form.city.touched && !form.city.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "checkout-city-error-form-ar" :
                  "checkout-city-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "checkout-city-form-ar" :
                  "checkout-city-form"
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
                "text-right checkout-city-error-ar" :
                "checkout-city-error"
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
                form.country.touched && !form.country.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "checkout-country-error-form-ar" :
                  "checkout-country-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "checkout-country-form-ar" :
                  "checkout-country-form"
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
                "text-right checkout-country-error-ar" :
                "checkout-country-error"
              }>
                {props.children[0]}<br />{props.children[1]}</div>}
              show="focus"
            />
           <p className={
               i18n.translator.language === "ar" ?
              "text-right country-tip-ar" : "country-tip"
             }>
              {t('countryTip')}
            </p>
          </Col>
          <Col xs={12} lg={6}>
            <FormControl
              className={
                form.province.touched && !form.province.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "checkout-province-error-form-ar" :
                  "checkout-province-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "checkout-province-form-ar" :
                  "checkout-province-form"
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
                "text-right checkout-province-error-ar" :
                "checkout-province-error"
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
                form.email.touched && !form.email.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "checkout-email-error-form-ar" :
                  "checkout-email-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "checkout-email-form-ar" :
                  "checkout-email-form"
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
                  isRequired: t('enterEmail'),
                  isEmail: t('enterValidEmail')
              }}
              wrapper={(props) => <div className={
                i18n.translator.language === "ar" ?
                "text-right checkout-email-error-ar" :
                "checkout-email-error"
              }>
                {props.children[0]}<br />{props.children[1]}</div>}
              show="focus"
            />
          </Col>
          <Col xs={12} lg={6}>
            <FormControl
              className={
                i18n.translator.language === "ar" ?
                "checkout-telephone-form-ar" :
                "checkout-telephone-form"
              }
              id="telephone"
              formProps={form.telephone}
              controlProps={{
                type: 'text',
                placeholder: t('telephone'),
                maxLength: 255,
              }}
            />
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={2} lg={3} className="d-none d-md-flex"></Col>
          <Col md={8} lg={6} className="d-flex flex-column">
            <div className={
                i18n.translator.language === "ar" ?
                "text-center py-1 mb-4 payment-details-title-ar" :
                "text-center py-1 mb-4 payment-details-title"
              }>
              {t('paymentDetails')}
            </div>
              <FormControl
                className={
                  form.cardNumber.touched && !form.cardNumber.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "checkout-cardNumber-error-form-ar" :
                    "checkout-cardNumber-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "checkout-cardNumber-form-ar" :
                    "checkout-cardNumber-form"
                  )
                }
                id="cardNumber"
                formProps={form.cardNumber}
                controlProps={{
                  type: 'text',
                  placeholder: t('cardNumRequired'),
                  maxLength: 19,
                }}
                validators={{
                  isRequired,
                }}
                disabled={true}
              />
            <Errors
              model=".cardNumber"
              messages={{
                  isRequired: t('enterCardNum')
              }}
              wrapper={(props) => <div className={
                i18n.translator.language === "ar" ?
                "text-right checkout-cardNumber-error-ar" :
                "checkout-cardNumber-error"
              }>
                {props.children[0]}<br />{props.children[1]}</div>}
              show="focus"
            />
            <div
              className="d-flex flex-row my-2 justify-content-between"
              id={
                i18n.translator.language === "ar" ?
                "checkout-month-year-form-ar" :
                "checkout-month-year-form"
              }>
              <Control.select
                model=".month"
                validators={{ monthRequired, }}
                onChange={(m) => onSelectExpMonth1(m.target.value)}>
                {months.map((month, index) =>
                  <option key={index} value={month.MONTH}>{month.MONTH}</option>)}
              </Control.select>
              <Control.select
                model=".year"
                validators={{ yearRequired, }}
                onChange={(y) => onSelectExpYear1(y.target.value)}>
                {years.map((year, index) =>
                  <option key={index} value={year.YEAR}>{year.YEAR}</option>)}
              </Control.select>
            </div>
            {
              (month === "" || month === "MM") && year !== "YY" &&
              <Errors
                model=".month"
                messages={{ monthRequired: t('enterExpDate'), }}
                wrapper={(props) => <div className={
                  i18n.translator.language === "ar" ?
                  "text-right checkout-month-error-ar" : "checkout-month-error"
                }>{props.children}</div>}
                show="focus"
              />
            }
            {
              (year === "" || year === "YY") && month !== "MM" &&
              <Errors
                model=".year"
                messages={{ yearRequired: t('enterExpDate'), }}
                wrapper={(props) => <div className={
                  i18n.translator.language === "ar" ?
                  "text-right checkout-year-error-ar" : "checkout-year-error"
                }>{props.children}</div>}
                show="focus"
              />
            }
            <FormControl
              className={
                form.code.touched && !form.code.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "checkout-code-error-form-ar" :
                  "checkout-code-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "checkout-code-form-ar" :
                  "checkout-code-form"
                )
              }
              id="code"
              formProps={form.code}
              controlProps={{
                type: 'text',
                placeholder: t('securityCode'),
                maxLength: 4,
              }}
              validators={{
                isRequired
              }}
              disabled={true}
            />
            <Errors
              model=".code"
              messages={{ isRequired: t('enterSecurityCode'), }}
              wrapper={(props) => <div className={
                i18n.translator.language === "ar" ?
                "text-right checkout-code-error-ar" : "checkout-code-error"
              }>{props.children}</div>}
              show="focus"
            />
            <FormControl
              className={
                form.name.touched && !form.name.valid ?
                (
                  i18n.translator.language === "ar" ?
                  "checkout-name-error-form-ar" :
                  "checkout-name-error-form"
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "checkout-name-form-ar" :
                  "checkout-name-form"
                )
              }
              id="name"
              formProps={form.name}
              controlProps={{
                type: 'text',
                placeholder: t('nameOnCard'),
                maxLength: 255,
              }}
              validators={{
                isRequired
              }}
            />
            <Errors
              model=".name"
              messages={{ isRequired: t('enterNameOnCard'), }}
              wrapper={(props) => <div className={
                i18n.translator.language === "ar" ?
                "text-right checkout-name-error-ar" : "checkout-name-error"
              }>{props.children}</div>}
              show="focus"
             />
            <div className={
               i18n.translator.language === "ar" ?
               "text-right checkout-name-on-card-ar" :
               "checkout-name-on-card"
             }>
              {t('enterNameOnCard2')}
            </div>
            <Button
              className={
                isPending ?
                (
                  i18n.translator.language === "it" ?
                  "mt-4 align-self-center checkout-pending-it-btn" :
                  (
                    i18n.translator.language === "ar" ?
                    "mt-4 align-self-center checkout-pending-ar-btn" :
                    "mt-4 align-self-center checkout-pending-btn"
                  )
                )
                :
                (
                  i18n.translator.language === "ar" ?
                  "mt-4 align-self-center checkout-ar-btn" :
                  "mt-4 align-self-center checkout-btn"
                )
              }
              type="submit" disabled={!form.$form.valid || isPending}>
              {isPending ? <Trans>LOADING</Trans> : <Trans>PROCEED</Trans>}
            </Button>
          </Col>
          <Col md={2} lg={3} className="d-none d-md-flex"></Col>
        </Row>
      </Form>
    </Col>
    <Col md={2} xl={3} className="d-none d-md-flex"></Col>
  </Row>
);

export default withTranslation()(Checkout1Component);
