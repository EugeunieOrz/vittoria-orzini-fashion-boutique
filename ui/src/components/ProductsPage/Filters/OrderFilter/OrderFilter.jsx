// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import '../Filters.scss';

import orderBy from '../../../../static/json/orderby.json';

import arrowUp from '../../../../static/icons/arrow_up.svg';
import arrowDown from '../../../../static/icons/arrow_down.svg';


/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  i18n: Object,
  t: Object,
  orderIsShown: boolean,
  orderCategory: string,
  chooseOrderCategory: (orderCategory: string) => any,
  resetOrder: () => any,
  showOrderCategories: () => any,
}

export const OrderFilterComponent = ({
  i18n, t,
  showOrderCategories, orderIsShown, orderCategory, resetOrder, chooseOrderCategory,
}: Props) => (
  <Col xl={3} className="d-flex category-filter">
    <div id="order-filter">
      <Nav.Item className="mr-2 d-inline-block filter-btn" onClick={() => showOrderCategories()}>
        <div className="d-flex justify-content-between filter-inner-btn">
          {t('Order by')}
          <Image
            className="arrow-img"
            src={orderIsShown ? arrowUp : arrowDown}
            alt=""
            width="32"
            height="32"
          />
        </div>
      </Nav.Item>
      {
        orderCategory !== '' &&
        <Nav.Item className="ml-2 d-inline reset-btn" onClick={() => resetOrder()}>
          {t('Reset')}
        </Nav.Item>
      }
      <div
        className={
          orderIsShown ?
          (
            i18n.translator.language === "ar" ?
            "pl-0 text-right order-dropdown-content-ar order-shown" :
            "pl-0 text-left order-dropdown-content order-shown"
          )
          :
          (
            i18n.translator.language === "ar" ?
            "pl-0 text-right order-dropdown-content-ar" :
            "pl-0 text-left order-dropdown-content"
          )
        }>
      {
        orderBy.map((order, index) =>
          <Nav.Item
            key={index}
            className={
              i18n.translator.language === "ar" ?
              (
                orderCategory === order.Category ?
                "pr-2 mb-2 order-category-ar selected" :
                "pr-2 mb-2 order-category-ar"
              ) :
              (
                orderCategory === order.Category ?
                "pl-2 mb-2 order-category selected" :
                "pl-2 mb-2 order-category"
              )
            }
            onClick={() => chooseOrderCategory(order.Category)}>
            <Trans>{order.Category}</Trans>
          </Nav.Item>
        )
      }
     </div>
    </div>
  </Col>
);

export default withTranslation()(OrderFilterComponent);
