// @flow
import React from 'react';
import { withTranslation } from "react-i18next";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CoreContainer from 'containers/CoreContainer';
import './OrderStatus.scss';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  i18n: Object,
  t: Object,
  status: string,
  orderNumber: string,
}

export const OrderStatusComponent = ({
  i18n, t, status, orderNumber,
}: Props) => (
  <CoreContainer>
    <Row className="flex-grow-1">
      <Col md={2} xl={3} className="d-none d-md-flex"></Col>
      <Col xs={12} md={8} xl={6}>
        <Row id="order-status-title-row" className="py-1 d-flex flex-row justify-content-center">
          <div id={
              i18n.translator.language === "ar" ?
              "order-status-header-ar" :
              "order-status-header"
            }>
            {t('orderInfo')}
          </div>
        </Row>
        <div
          id={
            i18n.translator.language === "ar" ?
            "order-status-msg-ar" : "order-status-msg"
          }
          className="my-5 text-center">
          {
            status === "Order in processing" &&
            t('orderStatusMsg1', {orderNumber: orderNumber})
          }
          {
            status === "Order Delivered" &&
            t('orderStatusMsg2', {orderNumber: orderNumber})
          }
          {
            status === "Awaiting Order" &&
            t('orderStatusMsg3', {orderNumber: orderNumber})
          }
          {
            status === "Order Dispatched" &&
            t('orderStatusMsg4', {orderNumber: orderNumber})
          }
          {
            status === "Order Partially Refunded" &&
            t('orderStatusMsg5', {orderNumber: orderNumber})
          }
          {
            status === "Order Returned" &&
            t('orderStatusMsg6', {orderNumber: orderNumber})
          }
        </div>
      </Col>
      <Col md={2} xl={3} className="d-none d-md-flex"></Col>
    </Row>
  </CoreContainer>
);

export default withTranslation()(OrderStatusComponent);
