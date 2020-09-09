// @flow
import React from 'react';
import { Errors, Form, Control } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { isLatin, isRequired, monthRequired, yearRequired } from 'util/Validator';
import { modelPath } from 'bundles/Account/modules/CreditCards/EditCardFormModule';
import FormControl from 'components/FormControl';
import isAlpha from 'validator/lib/isAlpha';
import type { FormProps } from 'util/Form';

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';

import '../../AddressCard.scss';
import months from '../../../../../static/json/months_num';
import years from '../../../../../static/json/years_num';
import closeSign from '../../../../../static/icons/close.svg';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  cardType: string,
  form: {[string]: FormProps},
  isPending: boolean,
  i18n: Object,
  t: Object,
  index: Number,
  onEditCard: (userID: string, index: Number, data: Object) => any,
  userID: string,
  month3: string,
  year3: string,
  toggleEditCard: (index: Number) => any,
  onSelectExpMonth3: () => any,
  onSelectExpYear3: () => any,
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
  } else if(cardType === "AMERICANEXPRESS") {
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

export const EditCardComponent = ({
  cardType, form, isPending, i18n, index, onEditCard, t, userID,
  month3, year3, onSelectExpMonth3, onSelectExpYear3, toggleEditCard,
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
          <div className={
            i18n.translator.language === "ar" ?
            "flex-grow-1 mt-2 pb-1 text-right address-title-ar" :
            "flex-grow-1 mt-2 pb-1 address-title"
          }>
            {t('editCard')}
          </div>
          <Image
            className="mb-2 address-close-btn"
            src={closeSign}
            alt=""
            width="24"
            height="24"
            onClick={() => toggleEditCard(index)} />
        </Row>
        <Row className={
          i18n.translator.language === "ar" ?
          "mt-4 mb-3 address-required-fields-msg-ar" :
          "mt-4 mb-3 address-required-fields-msg"
        }>
          {t('required')}
        </Row>
        <Form
          className="row d-flex flex-column mb-5"
          model={modelPath} onSubmit={data => onEditCard({
            userID: userID,
            index: index,
            cardType: cardType,
            data: data
          })}
          autoComplete="off" hideNativeErrors
        >
          <Row className="mt-4">
            <Col xs={12} lg={6}>
              <div className="d-flex flex-row">
                <FormControl
                  className={
                    form.cardNumber.touched && !form.cardNumber.valid ?
                    (
                      i18n.translator.language === "ar" ?
                      "card-cardNumber-error-form-ar" :
                      "card-cardNumber-error-form"
                    )
                    :
                    (
                      i18n.translator.language === "ar" ?
                      "card-cardNumber-form-ar" :
                      "card-cardNumber-form"
                    )
                  }
                  id="cardNumber"
                  formProps={form.cardNumber}
                  controlProps={{
                    type: 'text',
                    placeholder: t('cardNumRequired'),
                    maxLength: cardType === "VISA" || cardType === "JCB" ? 19 : (cardType === "AMERICAN EXPRESS" ? 15 : 16)
                  }}
                  validators={{
                    isRequired,
                    matchesCardType: (val) => checkCardType(val, cardType)
                  }}
                />
                <Image
                  id="edit-card-type-image"
                  src={require(`../../../../../static/cards/${cardType}.gif`)}
                  alt=""
                  width="45"
                  height="37"
                />
              </div>
              <Errors
               model=".cardNumber"
               messages={{
                   isRequired: t('enterCardNum'),
                   matchesCardType: t('enterValidCardNum', {cardType: cardType})
               }}
               wrapper={(props) => <div className={
                 i18n.translator.language === "ar" ?
                 "text-right card-cardnum-error-ar" :
                 "card-cardnum-error"
               }>
               {props.children[0]}<br />{props.children[1]}</div>}
               show="focus"
              />
            <p
              className={
                i18n.translator.language === "ar" ?
                "mt-4 text-right card-exp-date-title-ar" :
                "mt-4 card-exp-date-title"
              }>
                {t('expDateRequired')}
            </p>
              <div
                className="d-flex flex-row justify-content-between"
                id="month-year-select">
                <Control.select
                   model=".month"
                   validators={{ monthRequired, }}
                   onChange={(m) => onSelectExpMonth3(m.target.value)}
                 >
                   {months.map((month, index) =>
                     <option key={index} value={month.MONTH}>{month.MONTH}</option>)}
                 </Control.select>
                 <Control.select
                   className="ml-3"
                   model=".year"
                   validators={{ yearRequired, }}
                   onChange={(y) => onSelectExpYear3(y.target.value)}
                 >
                   {years.map((year, index) =>
                     <option key={index} value={year.YEAR}>{year.YEAR}</option>)}
                 </Control.select>
              </div>
               {
                 (month3 === "" || month3 === "MM") && year3 !== "YY" &&
                 <Errors
                   model=".month"
                   messages={{ monthRequired: t('enterExpDate'), }}
                   wrapper={(props) => <div className={
                     i18n.translator.language === "ar" ?
                     "mt-1 text-right card-month-error-ar" :
                     "mt-1 card-month-error"
                   }>{props.children}</div>}
                   show="focus"
                 />
               }
               {
                 (year3 === "" || year3 === "YY") && month3 !== "MM" &&
                 <Errors
                   model=".year"
                   messages={{ yearRequired: t('enterExpDate'), }}
                   wrapper={(props) => <div className={
                     i18n.translator.language === "ar" ?
                     "mt-1 text-right card-year-error-ar" :
                     "mt-1 card-year-error"
                   }>{props.children}</div>}
                   show="focus"
                 />
               }
            </Col>
            <Col xs={12} lg={6}></Col>
          </Row>
          <div className="d-flex flex-column mt-4 mt-lg-0 mb-4 pt-4">
            <div className={
                i18n.translator.language === "ar" ?
                "text-right card-billing-addr-title-ar" :
                "card-billing-addr-title"
              }>
              {t('billingAddr')}
            </div>
            <div className={
                i18n.translator.language === "ar" ?
                "text-right card-billing-addr-msg1-ar" :
                "card-billing-addr-msg1"
              }>
              {t('cardMsg')}
            </div>
          </div>
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
                  isLatin,
                }}
              />
              <Errors
                model=".firstName"
                messages={{
                    isRequired: t('enterFirstName'),
                    isLatin: t('checkFirstName')
                }}
                wrapper={(props) =>
                  <div className={
                    i18n.translator.language === "ar" ?
                    "text-right address-firstName-error-ar" :
                    "address-firstName-error"
                  }>{props.children[0]}<br />{props.children[1]}</div>}
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
                }>{props.children[0]}<br />{props.children[1]}</div>}
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
                }>{props.children[0]}<br />{props.children[1]}</div>}
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
                  isAlpha,
                }}
              />
              <Errors
                model=".lastName"
                messages={{
                    isRequired: t('enterLastName'),
                    isAlpha:  t('checkLastName')
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
                    isRequired: t('enterZipCode'),
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
                }>{props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
              />
            </Col>
          </Row>
          <div className="d-flex flex-column mb-5">
            <div className={
              i18n.translator.language === "ar" ?
              "mt-4 mb-1 text-right prefCrdCard-checkbox-ar" :
              "mt-4 mb-1 prefCrdCard-checkbox"
            }>
              <Control.checkbox model=".prefCrdCard" id="prefCrdCard" />
              <label
                className={
                i18n.translator.language === "ar" ?
                "pr-2" : "pl-2"
              }
                htmlFor="prefCrdCard">
                {t('cardPref')}
              </label>
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

export default withTranslation()(EditCardComponent);
