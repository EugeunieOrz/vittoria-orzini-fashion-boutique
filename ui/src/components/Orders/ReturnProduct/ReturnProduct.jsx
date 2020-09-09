// @flow
import React from 'react';
import { Form, Errors } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { isLatin, isRequired } from 'util/Validator';
import { modelPath } from 'modules/Orders/ReturnProductModule';
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
import FormControl from 'components/FormControl';
import { Link } from 'react-router-dom';
import config from 'config/index';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import './ReturnProduct.scss';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  checkItemToReturn: () => any,
  form: {[string]: FormProps},
  i18n: Object,
  itemsToReturn: Array,
  t: Object,
  isPending: boolean,
  fillReturnProduct: (id: string, data: Object, items: Array, userID: string) => any,
  order: Object,
  unsettled: string,
  userID: string,
}

const formatNum = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const formatTime = (t: string) => {
  if(t < 10) {
    return '0' + t;
  } else {
    return t;
  }
}

const loadImage = (item: Object) => {
  return require(`../../../static/${item.department.toLowerCase()}/${item.typeOfCollection.toLowerCase()}/${item.links[0]}`)
}

export const ReturnProductComponent = ({
  i18n, t, form, isPending, fillReturnProduct, order, checkItemToReturn,
  itemsToReturn, userID, unsettled,
}: Props) => (
  <Row className="flex-grow-1">
    <Col md={2} xl={3} className="d-none d-md-flex"></Col>
    <Col xs={12} md={8} xl={6}>
      <Row id="return-product-title-row" className="py-1 d-flex flex-row justify-content-center">
        <div id={
            i18n.translator.language === "ar" ?
            "return-product-header-ar" :
            "return-product-header"
          }>
          {t('returnForm-2')}
        </div>
      </Row>
      {
        unsettled === "true" && order && order !== undefined && Object.keys(order).length !== 0 &&
        <div
          id={
            i18n.translator.language === "ar" ?
            "return-product-msg1-ar" :
            "return-product-msg1"
          }
          className="my-4">
          {t('returnForm-3')}
        </div>
      }
      {
        order && order !== undefined && Object.keys(order).length !== 0 &&
        <div
          id={
            i18n.translator.language === "ar" ?
            "return-product-msg-ar" :
            "return-product-msg"
          }
          className="my-4">
          {t('returnFormMsg')}
        </div>
      }
      {
        order && order !== undefined && Object.keys(order).length !== 0 ?
        <Form
          className="d-flex flex-column"
          model={modelPath}
          onSubmit={data => fillReturnProduct({
            id: order.id,
            data: data,
            items: itemsToReturn,
            userID: userID,
          })}
          autoComplete="off">
          <Row className="mb-4">
            <Col md={1} lg={2} className="d-none d-md-flex"></Col>
            <Col xs={12} md={10} lg={8}>
              <FormControl
                className={
                  form.firstName.touched && !form.firstName.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "returnorder-firstName-error-form-ar" :
                    "returnorder-firstName-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "returnorder-firstName-form-ar" :
                    "returnorder-firstName-form"
                  )
                }
                id="firstName"
                formProps={form.firstName}
                controlProps={{
                  type: 'text',
                  placeholder:t('firstName'),
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
                  "text-right returnorder-fname-error-ar" :
                  "returnorder-fname-error"
                }>
                  {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
              />
              <FormControl
                className={
                  form.lastName.touched && !form.lastName.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "returnorder-lastName-error-form-ar" :
                    "returnorder-lastName-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "returnorder-lastName-form-ar" :
                    "returnorder-lastName-form"
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
                  "text-right returnorder-lname-error-ar" :
                  "returnorder-lname-error"
                }>
                  {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
              />
              <FormControl
                className={
                  form.email.touched && !form.email.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "returnorder-email-error-form-ar" :
                    "returnorder-email-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "returnorder-email-form-ar" :
                    "returnorder-email-form"
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
                    isRequired:  t('enterEmail'),
                    isEmail: t('enterValidEmail')
                }}
                wrapper={(props) => <div className={
                  i18n.translator.language === "ar" ?
                  "text-right returnorder-email-error-ar" :
                  "returnorder-email-error"
                }>
                  {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
              />
              <FormControl
                className={
                  form.telephone.touched && !form.telephone.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "returnorder-telephone-error-form-ar" :
                    "returnorder-telephone-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "returnorder-telephone-form-ar" :
                    "returnorder-telephone-form"
                  )
                }
                id="telephone"
                formProps={form.telephone}
                controlProps={{
                  type: 'text',
                  placeholder: t('telephoneRequired'),
                  maxLength: 255,
                }}
                validators={{
                  isRequired,
                }}
              />
              <Errors
                model=".telephone"
                messages={{
                  isRequired: t('enterTelephone')
                }}
                wrapper={(props) => <div className={
                  i18n.translator.language === "ar" ?
                  "text-right returnorder-telephone-error-ar" :
                  "returnorder-telephone-error"
                }>
                  {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
               />
              <FormControl
                className={
                  form.reasonForRefund.touched && !form.reasonForRefund.valid ?
                  (
                    i18n.translator.language === "ar" ?
                    "returnorder-reason-error-form-ar" :
                    "returnorder-reason-error-form"
                  )
                  :
                  (
                    i18n.translator.language === "ar" ?
                    "returnorder-reason-form-ar" :
                    "returnorder-reason-form"
                  )
                }
                id="reasonForRefund"
                formProps={form.reasonForRefund}
                controlProps={{
                  type: 'text',
                  placeholder: t('reasonForRefundRequired'),
                  maxLength: 255,
                }}
                validators={{
                  isRequired,
                }}
              />
              <Errors
                model=".reasonForRefund"
                messages={{
                  isRequired: t('enterReasonForRefund')
                }}
                wrapper={(props) => <div className={
                  i18n.translator.language === "ar" ?
                  "text-right returnorder-reason-error-ar" :
                  "returnorder-reason-error"
                }>
                  {props.children[0]}<br />{props.children[1]}</div>}
                show="focus"
               />
            </Col>
            <Col md={1} lg={2} className="d-none d-md-flex"></Col>
          </Row>
          {
            order.shoppingBag.addedItems.map((addedItem, index) =>
              <div key={index}>
                {
                  addedItem.size.map((size, sizeIndex) =>
                    <Row key={sizeIndex} className="my-2">
                      <Col xs={1} sm={2}>
                        {
                          unsettled === "true" ?
                          <input
                            type="checkbox"
                            className="returnproduct-checkbox"
                            id={addedItem.id}
                            name="returnproduct-checkbox"
                            value={addedItem.id + " " + size.number + " " + addedItem.price}
                            onChange={(ev) => checkItemToReturn(ev)}
                            checked
                            disabled
                            />
                            :
                            <input
                              type="checkbox"
                              className="returnproduct-checkbox"
                              id={addedItem.id}
                              name="returnproduct-checkbox"
                              value={addedItem.id + " " + size.number + " " + addedItem.price}
                              onChange={(ev) => checkItemToReturn(ev)}
                              />
                        }
                      </Col>
                      <Col xs={3} sm={2} dir="ltr"
                        className={
                          i18n.translator.language === "ar" ?
                          "text-right" : ""
                        }>
                        <div id="returnproduct-purchase-date">
                          {new Date(order.dateTime).getDate() + ' / ' +
                           (new Date(order.dateTime).getMonth()+1) + ' / ' +
                           new Date(order.dateTime).getFullYear()
                          }
                        </div>
                        <div id="returnproduct-purchase-time">
                          {new Date(order.dateTime).getUTCHours() + ' : ' +
                           formatTime(new Date(order.dateTime).getUTCMinutes())}
                        </div>
                      </Col>
                      <Col xs={5} sm={3}>
                        <Image
                          id="returnproduct-item-image"
                          src={loadImage(addedItem)}
                          alt="Fashion"
                          width="120"
                          height="160"
                        />
                      </Col>
                      <Col xs={12} sm={5}
                        className={
                          i18n.translator.language === "ar" ?
                          "text-right returnproduct-attributes-ar" :
                          "returnproduct-attributes"
                        }>
                        <p>{addedItem.name}</p>
                        <p className="mb-0">{t('itemQty', {itemQty: size.quantity})}</p>
                        <p className="mb-0">{t('itemSize', {itemSize: size.number})}</p>
                        <p>{t('itemColor', {itemColor: addedItem.color.color})}</p>
                        <p>
                          {addedItem.currency + " " + formatNum(addedItem.price)}
                        </p>
                      </Col>
                    </Row>
                  )
                }
              </div>
            )
          }
          <Button
            id={
              isPending ?
              (
                i18n.translator.language === "it" ?
                "returnorder-pending-it-btn" :
                (
                  i18n.translator.language === "ar" ?
                  "returnorder-pending-ar-btn" :
                  "returnorder-btn"
                )
              ) :
              (
                i18n.translator.language === "ar" ?
                "returnorder-ar-btn" :
                "returnorder-btn"
              )
            }
            className="align-self-center mt-4"
            type="submit"
            disabled={!form.$form.valid || isPending}>
           {isPending ? <Trans>LOADING</Trans> : <div>{t('CONFIRM')}</div>}
          </Button>
         </Form>
        :
        <Row className="my-4 d-flex flex-column align-items-center">
          <div
            id={
              i18n.translator.language === "ar" ?
              "return-form-error-msg-ar" :
              "return-form-error-msg"
            }
            className="mb-4">
            {t('The Page you are looking for could not be found.')}
          </div>
          <Link
            id={
              i18n.translator.language === "ar" ?
              "back-to-return-form-ar" :
              "back-to-return-form"
            }
            to={
              userID ?
              config.route.account.returns :
              config.route.home.returns
            }>
            <Trans>Back To Return Form</Trans>
          </Link>
        </Row>
      }
    </Col>
    <Col md={2} xl={3} className="d-none d-md-flex"></Col>
  </Row>
);

export default withTranslation()(ReturnProductComponent);
