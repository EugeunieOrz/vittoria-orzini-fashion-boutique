// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import './OrderHistory.scss';

type Props = {
  i18n: Object,
  t: Object,
  orders: Array,
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
  return require(`../../../../../static/${item.department.toLowerCase()}/${item.typeOfCollection.toLowerCase()}/${item.links[0]}`)
}

export const OrderHistoryComponent = ({
  i18n, t, orders,
}: Props) => (
  <Row className="mt-5 mb-4">
    <Col md={1} lg={2} className="d-none d-md-flex"></Col>
    <Col xs={12} md={10} lg={8}>
      <Row
        id={
          i18n.translator.language === "ar" ?
          "orderhistory-header-ar" : "orderhistory-header"
        }
        className="d-flex flex-row justify-content-center pb-4">
        {t('Order History')}
      </Row>
      <Row
        id={
          i18n.translator.language === "ar" ?
          "orderhistory-msg-ar" : "orderhistory-msg"
        }
        className="mb-4 pb-4 text-center">
        {t('ordersMsg')}
      </Row>
      {
        typeof orders !== 'undefined' && orders.length > 0 ?
        <div>
          <div
            id={
              i18n.translator.language === "ar" ?
              "ordershistory-orders-quantity-ar" :
              "ordershistory-orders-quantity"
            }
            className={
              i18n.translator.language === "ar" ?
              "text-right" : ""
            }>
            {
              orders.length > 1 ?
              t('orders', {num: orders.length}) :
              t('oneOrder')
            }
          </div>
          {
            orders.map((order, index) =>
            <div
              key={index}
              id="order-container"
              className={
                i18n.translator.language === "ar" ?
                "my-4 pb-4 text-right" :
                "my-4 pb-4"
              }>
              <Row
                id={
                  i18n.translator.language === "ar" ?
                  "ordershistory-id-ar" :
                  "ordershistory-id"
                }>
                <Col xs={6}>Order ID</Col>
                <Col xs={6} className="d-flex flex-row justify-content-end">
                  {order.id}
                </Col>
              </Row>
              <Row
                id={
                  i18n.translator.language === "ar" ?
                  "ordershistory-total-ar" :
                  "ordershistory-total"
                }
                className="my-2">
                <Col xs={6}>
                  {t('TOTAL')}
                </Col>
                <Col xs={6} className="d-flex flex-row justify-content-end">
                  {formatNum(order.shoppingBag.total)}
                </Col>
              </Row>
              <Row
                className="mb-3"
                id={
                  i18n.translator.language === "ar" ?
                  "ordershistory-status-ar" :
                  "ordershistory-status"
                }>
                <Col xs={6}><Trans>Order Status</Trans></Col>
                <Col xs={6} className="d-flex flex-row justify-content-end">
                  <Trans>{order.status}</Trans>
                </Col>
              </Row>
              <div id={
                  i18n.translator.language === "ar" ?
                  "ordershistory-items-quantity-ar" :
                  "ordershistory-items-quantity"
                }>
                {
                  order.shoppingBag.addedItems.length > 1 ?
                  t('items found', {count: order.shoppingBag.addedItems.length}) :
                  t('item found', {count: 1})
                }
              </div>
              {
                order.shoppingBag.addedItems.map((addedItem, index2) =>
                <div className="my-3" key={index2}>
                  {
                    addedItem.size.map((size, sizeIndex) =>
                    <Row
                      id={
                        i18n.translator.language === "ar" ?
                        "ordershistory-item-info-ar" :
                        "ordershistory-item-info"
                      }
                      key={sizeIndex}
                      className="no-gutters">
                      <Col xs={3} dir="ltr">
                        <div id="purchase-date">
                          {new Date(order.dateTime).getDate() + ' / ' +
                           (new Date(order.dateTime).getMonth()+1) + ' / ' +
                           new Date(order.dateTime).getFullYear()
                          }
                        </div>
                        <div id="purchase-time">
                          {new Date(order.dateTime).getUTCHours() + ' : ' +
                           formatTime(new Date(order.dateTime).getUTCMinutes())}
                        </div>
                      </Col>
                      <Col xs={3}>
                        <Image
                          src={loadImage(addedItem)}
                          alt="Fashion"
                          width="120"
                          height="160"
                        />
                      </Col>
                      <Col xs={6}
                        className="pl-5 pl-sm-3"
                        id={
                          i18n.translator.language === "ar" ?
                          "orderhistory-data-ar" :
                          "orderhistory-data"
                        }>
                        <div id="orders-history-item-name" className="mb-1 mb-sm-3">
                          <Trans>{addedItem.name}</Trans>
                        </div>
                        <div id="orders-history-item-qty">
                          {t('itemQty', {itemQty: size.quantity})}
                        </div>
                        <div id="orders-history-item-size">
                          {t('itemSize', {itemSize: size.number})}
                        </div>
                        <div id="orders-history-item-color" className="mb-1 mb-sm-3">
                          {t('itemColor', {itemColor: addedItem.color.color})}
                        </div>
                        <div id="orders-history-item-price">
                          {addedItem.currency + " " + formatNum(addedItem.price)}
                        </div>
                      </Col>
                    </Row>
                    )}
                </div>
              )}
            </div>
            )
          }
        </div>
        :
        <p
          id={
            i18n.translator.language === "ar" ?
            "items-not-ordered-msg-ar" :
            "items-not-ordered-msg"
          }
          className="my-3 text-center">
          {t('notOrdered')}
        </p>
      }
    </Col>
    <Col md={1} lg={2} className="d-none d-md-flex"></Col>
  </Row>
);

export default withTranslation()(OrderHistoryComponent);
