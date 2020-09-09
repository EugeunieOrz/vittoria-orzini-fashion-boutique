// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { Errors, Form, Control } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { isLatin, isRequired } from 'util/Validator';
import { modelPath3 } from 'bundles/Account/modules/Checkout3/CheckoutForm3Module';
import FormControl from 'components/FormControl';
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
import type { FormProps } from 'util/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import '../Checkout.scss';

type Props = {
  cards: Array,
  chooseCreditCard: (v: String) => any,
  countryByIP: string,
  creditCard: string,
  fillCheckoutData3: (countryByIP: string, creditCard: string, data: Object, userID: string) => any,
  form3: {[string]: FormProps},
  isPending3: boolean,
  i18n: Object,
  index: Number,
  onToggleAddNewCard: () => any,
  onToggleEditCard: (index: string) => any,
  t: Object,
  userID: string
}

const formatCardType = (cardNum: String) => {
  if(cardNum.length !== 15) {
    return "**** - **** - **** - ****";
  } else {
    return "***** - ***** - ***** - *****";
  }
}

export const Checkout3Component = ({
  cards, chooseCreditCard, countryByIP, creditCard,
  fillCheckoutData3, form3, isPending3, i18n, index,
  onToggleAddNewCard, onToggleEditCard,
  t, userID,
}: Props) => (
  <Row className="mt-4">
    <Col md={2} xl={3} className="d-none d-md-flex"></Col>
    <Col xs={12} md={8} xl={6}>
      {
        typeof cards !== 'undefined' && cards.length > 0 && cards !== '' &&
        <div className="d-flex flex-column">
          <div className={
              i18n.translator.language === "ar" ?
              "py-1 mt-2 mb-4 text-center payment-details-title-ar" :
              "py-1 mt-2 mb-4 text-center payment-details-title"
            }>
            {t('paymentDetails')}
          </div>
            {
              cards.map((card, index) =>
                <Row key={index}>
                  <Col xs={1} sm={1}>
                    <Control
                      model="credit-card"
                      type="radio"
                      value={index}
                      checked={creditCard === index}
                      onChange={(v) => chooseCreditCard(v.target.value)}
                    />
                  </Col>
                  <Col xs={1} sm={1}>
                    <Image
                      className="card-image"
                      src={require(`../../../../static/cards/${card.cardType}.gif`)}
                      alt=""
                      width="32"
                      height="24"
                    />
                  </Col>
                  <Col xs={9} sm={8}
                    className={
                      i18n.translator.language === "ar" ?
                      "pl-5 text-right" : "pl-5"
                    }>
                    {
                      card.prefCrdCard.mark === true &&
                      <div id={
                          i18n.translator.language === "ar" ?
                          "checkout-pref-card-ar" :
                          "checkout-pref-card"
                        }>
                        {t('Preferred Credit Card')}
                      </div>
                    }
                    <p id="checkout-card-name">
                      {card.address.firstName + ' ' + card.address.lastName}
                    </p>
                    <div id="checkout-card-num">
                      {formatCardType(card.cardNumber)}
                    </div>
                    <p id={
                        i18n.translator.language === "ar" ?
                        "checkout-exp-date-ar" :
                        "checkout-exp-date"
                      }>
                      {t('expDate', {expMonth: card.expMonth, expYear: card.expYear})}
                    </p>
                  </Col>
                  <Col xs={12} sm={2} className="d-flex flex-column h-100 justify-content-end pr-0 pr-sm-5">
                    <Button
                      className={
                        i18n.translator.language === "ar" ?
                        "align-self-center checkout-edit-card-btn-ar" :
                        "align-self-center checkout-edit-card-btn"
                      }
                      onClick={() => onToggleEditCard(index)}>
                      {t('EDIT')}
                    </Button>
                  </Col>
                </Row>
              )
            }
          <Button
            className={
              i18n.translator.language === "ar" ?
              "mt-3 mb-4 align-self-center checkout-add-new-card-btn-ar" :
              "mt-3 mb-4 align-self-center checkout-add-new-card-btn"
            }
            onClick={() => onToggleAddNewCard()}>
            {t('ADD A NEW CREDIT CARD')}
          </Button>
          <div className={
              i18n.translator.language === "ar" ?
              "text-center py-1 mt-2 mb-4 shipping-address-title-ar" :
              "text-center py-1 mt-2 mb-4 shipping-address-title"
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
            model={modelPath3}
            onSubmit={data => fillCheckoutData3({
                countryByIP: countryByIP,
                creditCard: creditCard,
                data: data,
                userID: userID
            })}
            autoComplete="off" hideNativeErrors>
            <Row>
              <Col xs={12} lg={6}>
                <FormControl
                  className={
                    form3.firstName.touched && !form3.firstName.valid ?
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
                  formProps={form3.firstName}
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
                    form3.lastName.touched && !form3.lastName.valid ?
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
                  formProps={form3.lastName}
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
                  formProps={form3.additional}
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
                    form3.address.touched && !form3.address.valid ?
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
                  formProps={form3.address}
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
                    form3.zipCode.touched && !form3.zipCode.valid ?
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
                  formProps={form3.zipCode}
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
                    form3.city.touched && !form3.city.valid ?
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
                  formProps={form3.city}
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
                    form3.country.touched && !form3.country.valid ?
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
                  formProps={form3.country}
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
                    form3.province.touched && !form3.province.valid ?
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
                  formProps={form3.province}
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
                    form3.email.touched && !form3.email.valid ?
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
                  formProps={form3.email}
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
                  formProps={form3.telephone}
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
                    "text-center py-1 payment-details-title-ar" :
                    "text-center py-1 payment-details-title"
                  }>
                  {t('cardDetails')}
                </div>
                <FormControl
                  className={
                    form3.code.touched && !form3.code.valid ?
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
                  formProps={form3.code}
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
                    form3.name.touched && !form3.name.valid ?
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
                  formProps={form3.name}
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
                    isPending3 ?
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
                  type="submit" disabled={!form3.$form.valid || isPending3}>
                  {isPending3 ? <Trans>LOADING</Trans> : <Trans>PROCEED</Trans>}
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

export default withTranslation()(Checkout3Component);
