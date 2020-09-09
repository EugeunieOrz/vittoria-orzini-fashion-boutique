// @flow
import React from 'react';
import { withTranslation } from "react-i18next";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import './OrderConfirmation.scss';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  i18n: Object,
  t: Object,
  orderID: string,
  purchasedItems: Array<Object>
}

const loadImage = (item: Object) => {
  return require(`../../../../static/${item.department.toLowerCase()}/${item.typeOfCollection.toLowerCase()}/${item.links[0]}`)
}

export const OrderConfirmationComponent = ({
  i18n, t, orderID, purchasedItems,
}: Props) => (
  <Row className="flex-grow-1 mt-5 no-gutters">
    <Col sm={1} lg={2} className="d-none d-sm-flex"></Col>
    <Col xs={8} sm={8} lg={6}
      className={i18n.translator.language === "ar" ? "text-right" : ""}>
      <div id={
          i18n.translator.language === "ar" ?
          "thank-you-ar" :
          "thank-you"
        }>
        {t('thanks')}
      </div>
      <div
        id={
          i18n.translator.language === "ar" ?
          "order-confirmation-title-ar" :
          "order-confirmation-title"
        }
        className="mt-3">
        {t('orderCreated', {orderID: orderID})}
      </div>
      <div id={
          i18n.translator.language === "ar" ?
          "order-confirmation-msg1-ar" :
          "order-confirmation-msg1"
        }>
        {t('orderConfirmation')}
      </div>
    </Col>
    <Col xs={4} sm={2} lg={2}
      className={i18n.translator.language === "ar" ? "text-right" : ""}>
      <div id={
          i18n.translator.language === "ar" ?
          "order-confirmation-items-ar" :
          "order-confirmation-items"
        }>
        {t('purchased')}
      </div>
      {
        typeof purchasedItems !== 'undefined' && purchasedItems.length > 0 && purchasedItems !== '' &&
        purchasedItems.map((item, index) =>
          <div className="d-flex flex-row my-3" key={index}>
            <div
              id="orderconfirmation-item-qty"
              className={
                i18n.translator.language === "ar" ?
                "pl-1 pl-lg-2" :
                "pr-1 pr-lg-2"
              }>
              {item.inventory + " X"}
            </div>
            <Image
              id="orderconfirmation-item-image"
              src={loadImage(item)}
              alt="Fashion"
              width="60"
              height="80"
            />
          </div>
        )
      }
    </Col>
    <Col sm={1} lg={2} className="d-none d-sm-flex"></Col>
  </Row>
);

export default withTranslation()(OrderConfirmationComponent);
