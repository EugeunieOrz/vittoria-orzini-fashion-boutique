// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { Errors, Form, Control } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { isRequired, monthRequired, yearRequired } from 'util/Validator';
import { modelPath2 } from 'bundles/Account/modules/Checkout2/CheckoutForm2Module';
import FormControl from 'components/FormControl';
import type { FormProps } from 'util/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import '../Checkout.scss';

import countries from '../../../../static/json/countries';
import months from '../../../../static/json/months_num';
import years from '../../../../static/json/years_num';

import visaCardImg from '../../../../static/cards/VISA.gif';
import masterCardImg from '../../../../static/cards/MASTERCARD.gif';
import amExImg from '../../../../static/cards/AMERICAN EXPRESS.gif';
import jcbImg from '../../../../static/cards/JCB.gif';

type Props = {
  addresses: Array,
  cardType: string,
  countryByIP: string,
  fillCheckoutData2: (
    cardType: string, countryByIP: string, data: Object, shippingAddress: string, userID: string
  ) => any,
  form2: {[string]: FormProps},
  isPending2: boolean,
  i18n: Object,
  t: Object,
  index: Number,
  month: string,
  onSelectExpMonth5: () => any,
  onSelectExpYear5: () => any,
  onToggleAddNewAddress: () => any,
  onToggleEditAddress: (index: string) => any,
  onToggleBtn: (v: string) => any,
  shippingAddress: string,
  toggleCreditCardTypeForCheckout: (v: string) => any,
  userID: string,
  year: string,
}

const checkCardType = (v: String, cardType: String) => {
  const n6 = Number(v.substring(0, 6));
  const n4 = Number(v.substring(0, 4));
  const first = Number(v.charAt(0));
  const second = Number(v.charAt(1));
  const l = v.length;
  if(cardType === "VISA") {
    if(first === 4 && (l >= 16 && l <= 19)) {
      return true;
    } else {
      return false;
    }
  } else if(cardType === "MASTERCARD") {
    if(l === 16 && ((n6 >= 222100 && n6 <= 272099) || (n6 >= 510000 && n6 <= 559999))) {
      return true;
    } else {
      return false;
    }
  } else if(cardType === "AMERICAN EXPRESS") {
    if(l === 15 && (first === 3 && (second === 4 || second === 7))) {
      return true;
    } else {
      return false;
    }
  } else if(cardType === "JCB") {
    if((l >= 16 && l <= 19) && (n4 >= 3528 && n4 <= 3589)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export const Checkout2Component = ({
  addresses, cardType, countryByIP, fillCheckoutData2, form2,
  isPending2, i18n, index, onToggleBtn, onToggleAddNewAddress,
  onToggleEditAddress,
  shippingAddress, t, toggleCreditCardTypeForCheckout, userID,
  onSelectExpMonth5, onSelectExpYear5, month, year,
}: Props) => (
  <Row className="mt-4">
    <Col md={2} xl={3} className="d-none d-md-flex"></Col>
    <Col xs={12} md={8} xl={6}>
      {
        typeof addresses !== 'undefined' && addresses.length > 0 && addresses !== '' &&
        <div className="d-flex flex-column">
          <div className={
              i18n.translator.language === "ar" ?
              "py-1 mt-2 mb-4 text-center shipping-address-title-ar" :
              "py-1 mt-2 mb-4 text-center shipping-address-title"
            }>
            {t('shippingAddr')}
          </div>
          {
            addresses.map((address, idx) =>
            <Row key={idx}>
              <Col xs={2} sm={2}
                className={
                  i18n.translator.language === "ar" ?
                  "text-right pr-4" : "pl-4"
                }>
                <Control
                  model="shipping-address"
                  type="radio"
                  value={idx}
                  checked={shippingAddress === idx}
                  onChange={(v) => onToggleBtn(v.target.value)}
                />
              </Col>
              <Col xs={10} sm={8}
                className={
                  i18n.translator.language === "ar" ?
                  "text-right" : ""
                }>
                <p className={
                    i18n.translator.language === "ar" ?
                    "checkout-name-ar" : "checkout-name"
                  }>
                  {address.firstName + ' ' + address.lastName}
                </p>
                <p className={
                    i18n.translator.language === "ar" ?
                    "checkout-address-ar" : "checkout-address"
                  }>
                  {address.address + ', ' + address.zipCode +
                  ', ' + address.city + ', ' + address.state +
                  ', ' + countries[address.country]}
                </p>
              </Col>
              <Col xs={12} sm={2} className="d-flex flex-column h-100 justify-content-end pr-0 pr-sm-5">
                <Button
                  className={
                    i18n.translator.language === "ar" ?
                    "align-self-center checkout-edit-address-btn-ar" :
                    "align-self-center checkout-edit-address-btn"
                  }
                  onClick={() => onToggleEditAddress(idx)}>
                  {t('EDIT')}
                </Button>
              </Col>
            </Row>
          )}
          <Button
            className={
              i18n.translator.language === "ar" ?
              "mt-3 mb-4 align-self-center checkout-add-new-address-btn-ar" :
              "mt-3 mb-4 align-self-center checkout-add-new-address-btn"
            }
            onClick={() => onToggleAddNewAddress()}>
            {t('ADD A NEW ADDRESS')}
          </Button>
          <div className={
              i18n.translator.language === "ar" ?
              "py-1 mt-2 mb-4 text-center payment-details-title-ar" :
              "py-1 mt-2 mb-4 text-center payment-details-title"
            }>
            {t('paymentDetails')}
          </div>
          <div className={
              i18n.translator.language === "ar" ?
              "mb-4 pr-2 pl-md-5 text-right required-fields-msg-ar" :
              "mb-4 pl-0 pl-md-5 required-fields-msg"
            }>
            {t('required')}
          </div>
          <Row
            className={
              i18n.translator.language === "ar" ?
              "ml-0 ml-md-5 text-right" :
              "ml-0 ml-md-5"
            }>
            <Col xs={12} md={6} lg={3} className="pl-0">
              <div id="visaCardType-radiobtn">
                <Control
                  model="cardType"
                  type="radio"
                  value="VISA"
                  checked={cardType === "VISA"}
                  onChange={(v) => toggleCreditCardTypeForCheckout(v.target.value)}
                  id="visaCardType"
                />
              <label
                className={i18n.translator.language === "ar" ? "pr-2" : "pl-2"}
                htmlFor="visaCardType">
                  <Image
                    className="addnewcard-card-image"
                    src={visaCardImg}
                    alt="Visa sign"
                    width="65"
                    height="49"
                  />
                </label>
              </div>
            </Col>
            <Col xs={12} md={6} lg={3} className="pl-0">
              <div id="masterCardType-radiobtn">
                <Control
                  model="cardType"
                  type="radio"
                  value="MASTERCARD"
                  checked={cardType === "MASTERCARD"}
                  onChange={(v) => toggleCreditCardTypeForCheckout(v.target.value)}
                  id="masterCardType"
                />
                <label
                  className={i18n.translator.language === "ar" ? "pr-2" : "pl-2"}
                  htmlFor="masterCardType">
                  <Image
                    className="addnewcard-card-image"
                    src={masterCardImg}
                    alt="Mastercard sign"
                    width="65"
                    height="49"
                  />
                </label>
              </div>
            </Col>
            <Col xs={12} md={6} lg={3} className="pl-0">
              <div id="amexCardType-radiobtn">
                <Control
                  model="cardType"
                  type="radio"
                  value="AMERICAN EXPRESS"
                  checked={cardType === "AMERICAN EXPRESS"}
                  onChange={(v) => toggleCreditCardTypeForCheckout(v.target.value)}
                  id="amexCardType"
                 />
               <label
                 className={i18n.translator.language === "ar" ? "pr-2" : "pl-2"}
                 htmlFor="amexCardType">
                  <Image
                    className="addnewcard-card-image"
                    src={amExImg}
                    alt="American Express sign"
                    width="65"
                    height="49"
                  />
                </label>
              </div>
            </Col>
            <Col xs={12} md={6} lg={3} className="pl-0">
              <div id="jcbCardType-radiobtn">
                <Control
                  model="cardType"
                  type="radio"
                  value="JCB"
                  checked={cardType === "JCB"}
                  onChange={(v) => toggleCreditCardTypeForCheckout(v.target.value)}
                  id="jcbCardType"
                />
                <label
                  className={i18n.translator.language === "ar" ? "pr-2" : "pl-2"}
                  htmlFor="jcbCardType">
                 <Image
                  className="addnewcard-card-image"
                  src={jcbImg}
                  alt="JCB sign"
                  width="65"
                  height="49"
                 />
               </label>
              </div>
            </Col>
          </Row>
          <Form
            className="d-flex flex-column mt-3"
            model={modelPath2}
            onSubmit={data => fillCheckoutData2({
              cardType: cardType,
              countryByIP: countryByIP,
              data: data,
              shippingAddress: shippingAddress,
              userID: userID
            })}
            autoComplete="off" hideNativeErrors>
            <Row className="mt-2">
              <Col md={2} lg={3} className="d-none d-md-flex"></Col>
              <Col md={8} lg={6} className="d-flex flex-column">
                <FormControl
                  className={
                    form2.cardNumber.touched && !form2.cardNumber.valid ?
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
                  formProps={form2.cardNumber}
                  controlProps={{
                    type: 'text',
                    placeholder: t('cardNumRequired'),
                    maxLength:
                    cardType === "VISA" || cardType === "JCB" ? 19 : (cardType === "AMERICAN EXPRESS" ? 15 : 16),
                  }}
                  validators={{
                    isRequired,
                    matchesCardType: (val) => checkCardType(val, cardType)
                  }}
                  disabled={true}
                />
                <Errors
                  model=".cardNumber"
                  messages={{
                      isRequired: t('enterCardNum'),
                      matchesCardType: t('enterValidCardNum', {cardType: cardType})
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
                id="checkout-month-year-form">
                  <Control.select
                    model=".month"
                    validators={{ monthRequired, }}
                    onChange={(m) => onSelectExpMonth5(m.target.value)}
                  >
                    {months.map((month, index) =>
                      <option key={index} value={month.MONTH}>{month.MONTH}</option>)}
                  </Control.select>
                  <Control.select
                    model=".year"
                    validators={{ yearRequired, }}
                    onChange={(y) => onSelectExpYear5(y.target.value)}
                  >
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
                      "checkout-month-error-ar" : "checkout-month-error"
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
                      "checkout-year-error-ar" : "checkout-year-error"
                    }>{props.children}</div>}
                    show="focus"
                  />
                }
               <FormControl
                 className={
                   form2.code.touched && !form2.code.valid ?
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
                 formProps={form2.code}
                 controlProps={{
                   type: 'text',
                   placeholder: t('securityCode'),
                   maxLength: 4,
                 }}
                 validators={{
                   isRequired,
                 }}
                 disabled={true}
               />
               <Errors
                model=".code"
                messages={{ isRequired: t('enterSecurityCode'), }}
                wrapper={(props) => <div className={
                  i18n.translator.language === "ar" ?
                  "text-right checkout-code-error-ar" :
                  "checkout-code-error"
                }>{props.children}</div>}
                show="focus"
               />
               <FormControl
                 className={
                   form2.name.touched && !form2.name.valid ?
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
                 formProps={form2.name}
                 controlProps={{
                   type: 'text',
                   placeholder: t('nameOnCard'),
                   maxLength: 255,
                 }}
                 validators={{
                   isRequired,
                 }}
               />
               <Errors
                 model=".name"
                 messages={{ isRequired: t('enterNameOnCard'), }}
                 wrapper={(props) => <div className={
                   i18n.translator.language === "ar" ?
                   "text-right checkout-name-error-ar" :
                   "checkout-name-error"
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
                  isPending2 ?
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
                type="submit" disabled={!form2.$form.valid || isPending2}>
                {isPending2 ? <Trans>LOADING</Trans> : <Trans>PROCEED</Trans>}
              </Button>
              </Col>
              <Col md={2} lg={3} className="d-none d-md-flex"></Col>
            </Row>
           </Form>
        </div>
      }
    </Col>
    <Col md={2} xl={3} className="d-none d-md-flex"></Col>
  </Row>
);

export default withTranslation()(Checkout2Component);
