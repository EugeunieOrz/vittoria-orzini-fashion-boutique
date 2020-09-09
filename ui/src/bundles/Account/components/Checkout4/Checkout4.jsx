// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { Control, Errors, Form } from 'react-redux-form';
import FormControl from 'components/FormControl';
import { withTranslation, Trans } from "react-i18next";
import { isRequired } from 'util/Validator';
import type { FormProps } from 'util/Form';
import { modelPath4 } from 'bundles/Account/modules/Checkout4/CheckoutForm4Module';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import '../Checkout.scss';
import countries from '../../../../static/json/countries';

type Props = {
  addresses: Array,
  cards: Array,
  chooseCreditCard: (v: String) => any,
  countryByIP: string,
  creditCard: string,
  fillCheckoutData4: (
    countryByIP: string, creditCard: string, shippingAddress: string, data: Object, userID: string) => any,
  form4: {[string]: FormProps},
  isPending4: boolean,
  i18n: Object,
  t: Object,
  index: Number,
  onToggleAddNewAddress: () => any,
  onToggleAddNewCard: () => any,
  onToggleEditAddress: (index: string) => any,
  onToggleEditCard: (index: string) => any,
  onToggleBtn: (v: string) => any,
  shippingAddress: string,
  userID: string,
}

const formatCardType = (cardNum: String) => {
  if(cardNum.length !== 15) {
    return "**** - **** - **** - ****";
  } else {
    return "***** - ***** - ***** - *****";
  }
}

export const Checkout4Component = ({
  addresses, cards, chooseCreditCard, countryByIP, creditCard,
  fillCheckoutData4, form4, isPending4, t,
  i18n, index, onToggleBtn, onToggleAddNewAddress, onToggleAddNewCard,
  onToggleEditAddress, onToggleEditCard, shippingAddress, userID,
}: Props) => (
  <Row className="mt-4">
    <Col md={2} xl={3} className="d-none d-md-flex"></Col>
    <Col xs={12} md={8} xl={6}>
      {
        typeof addresses !== 'undefined' && addresses.length > 0 &&
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
        </div>
      }
      {
        typeof cards !== 'undefined' && cards.length > 0 &&
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
                  <div
                    id={
                      i18n.translator.language === "ar" ?
                      "checkout-pref-card-ar" : "checkout-pref-card"
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
                <p
                  id={
                    i18n.translator.language === "ar" ?
                    "checkout-exp-date-ar" : "checkout-exp-date"
                  }>
                  {t('expDate', {expMonth: card.expMonth, expYear: card.expYear})}
                </p>
              </Col>
              <Col xs={12} sm={2} className="d-flex flex-column h-100 justify-content-end pr-0 pr-sm-5">
                <Button
                  className={
                    i18n.translator.language === "ar" ?
                    "mt-3 mb-4 align-self-center checkout-edit-card-btn-ar" :
                    "mt-3 mb-4 align-self-center checkout-edit-card-btn"
                  }
                  onClick={() => onToggleEditCard(index)}>
                  {t('EDIT')}
                </Button>
              </Col>
            </Row>
            )}
          <Button
            className={
              i18n.translator.language === "ar" ?
              "mt-3 mb-4 align-self-center checkout-add-new-card-btn-ar" :
              "mt-3 mb-4 align-self-center checkout-add-new-card-btn"
            }
            onClick={() => onToggleAddNewCard()}>
            {t('ADD A NEW CREDIT CARD')}
          </Button>
        </div>
      }
      <Form
        className="d-flex flex-column"
        model={modelPath4}
        onSubmit={data => fillCheckoutData4({
            countryByIP: countryByIP,
            creditCard: creditCard,
            shippingAddress: shippingAddress,
            data: data,
            userID: userID,
          })}
        autoComplete="off"
        hideNativeErrors>
        <Row className="mt-5">
          <Col md={2} lg={3} className="d-none d-md-flex"></Col>
          <Col md={8} lg={6} className="d-flex flex-column">
            <div
              className={
                i18n.translator.language === "ar" ?
                "text-center py-1 mb-4 payment-details-title-ar" :
                "text-center py-1 mb-4 payment-details-title"
              }>
              {t('cardDetails')}
            </div>
            <FormControl
              className={
                form4.code.touched && !form4.code.valid ?
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
              formProps={form4.code}
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
                "text-right checkout-code-error-ar" :
                "checkout-code-error"
              }>{props.children}</div>}
              show="focus"
            />
            <FormControl
              className={
                form4.name.touched && !form4.name.valid ?
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
              formProps={form4.name}
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
                isPending4 ?
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
              type="submit" disabled={!form4.$form.valid || isPending4}>
              {isPending4 ? <Trans>LOADING</Trans> : <Trans>PROCEED</Trans>}
            </Button>
          </Col>
          <Col md={2} lg={3} className="d-none d-md-flex"></Col>
        </Row>
      </Form>
    </Col>
    <Col md={2} xl={3} className="d-none d-md-flex"></Col>
  </Row>
);

export default withTranslation()(Checkout4Component);
