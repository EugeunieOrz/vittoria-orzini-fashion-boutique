// @flow
import React from 'react';
import { Form, Errors } from 'react-redux-form';
import { withTranslation, Trans } from "react-i18next";
import { isRequired } from 'util/Validator';
import { modelPath } from 'modules/Orders/OrderInfoFormModule';
import FormControl from 'components/FormControl';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CoreContainer from 'containers/CoreContainer';
import './OrderInfo.scss';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  form: {[string]: FormProps},
  i18n: Object,
  t: Object,
  isPending: boolean,
  followOrder: (data: Object) => any,
}

export const OrderInfoComponent = ({
  i18n, t, form, isPending, followOrder,
}: Props) => (
  <CoreContainer>
    <Row className="flex-grow-1">
      <Col md={2} xl={3} className="d-none d-md-flex"></Col>
      <Col xs={12} md={8} xl={6}
        className={i18n.translator.language === "ar" ? "text-right" : ""}>
        <Row
          id="orderinfo-title-row"
          className="py-1 d-flex flex-row justify-content-center">
          <div
            id={
              i18n.translator.language === "ar" ?
              "orderinfo-header-ar" : "orderinfo-header"
            }>
            {t('orderInfo')}
          </div>
        </Row>
        <div
          id={
            i18n.translator.language === "ar" ?
            "orderinfo-msg-ar" : "orderinfo-msg"
          }
          className="my-4">
          {t('orderInfoMsg')}
        </div>
        <Form model={modelPath} onSubmit={followOrder} autoComplete="off">
          <FormControl
            className={
              form.orderNumber.touched && !form.orderNumber.valid ?
              (
                i18n.translator.language === "ar" ?
                "followOrder-num-error-form-ar" :
                "followOrder-num-error-form"
              )
              :
              (
                i18n.translator.language === "ar" ?
                "followOrder-num-form-ar" :
                "followOrder-num-form"
              )
            }
            id="orderNumber"
            formProps={form.orderNumber}
            controlProps={{
              type: 'text',
              placeholder: t('orderNum'),
              maxLength: 255,
            }}
            validators={{
              isRequired,
            }}
          />
          <Errors
            model=".orderNumber"
            messages={{
                isRequired:  t('enterOrderNum'),
            }}
            wrapper={(props) => <div className={
              i18n.translator.language === "ar" ?
              "orderinfo-ordernum-error-ar" :
              "orderinfo-ordernum-error"
            }>
            {props.children[0]}<br />{props.children[1]}</div>}
            show="focus"
          />
        <div
          id={
            form.orderNumber.value.length === 24 ?
            "orderinfo-ordernum-noerror"
            :
            (i18n.translator.language === "ar" ?
            "orderinfo-ordernum-error-ar" :
            "orderinfo-ordernum-error")
          }></div>
         <Button
           className={
             isPending ?
             (
               i18n.translator.language === "it" ?
               "mt-4 follow-order-pending-it-btn" :
               (
                 i18n.translator.language === "ar" ?
                 "mt-4 follow-order-pending-ar-btn" :
                 "mt-4 follow-order-pending-btn"
               )
             )
             :
             (
               i18n.translator.language === "ar" ?
               "mt-4 follow-order-ar-btn" :
               "mt-4 follow-order-btn"
             )
           }
           type="submit"
           disabled={!form.$form.valid || isPending}>
            {isPending ? <Trans>LOADING</Trans> : <div>{t('searchOrderNum')}</div>}
          </Button>
        </Form>
      </Col>
      <Col md={2} xl={3} className="d-none d-md-flex"></Col>
    </Row>
  </CoreContainer>
);

export default withTranslation()(OrderInfoComponent);
