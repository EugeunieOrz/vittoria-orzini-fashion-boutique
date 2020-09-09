// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../Menu.scss';

import categories from '../../../static/json/categories.json';

type Props = {
  i18n: Object,
  t: Object,
  language: string,
  selectFashionCategory: (categoryLink: string) => any,
  closeFashionMenu: () => any,
  fashionMenuOpened: boolean,
  toggleFashionMenu: () => any,
}

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

export const FashionMenuComponent = ({
  i18n, t, language, selectFashionCategory, closeFashionMenu,
  fashionMenuOpened, toggleFashionMenu,
}: Props) => (
  <Row
    className={
      i18n.translator.language === "ar" ?
      (
        fashionMenuOpened ?
        "text-right mt-5 pr-5 fashion-menu-dropdown fashion-menu-opened" :
        "text-right mt-5 pr-5 fashion-menu-dropdown"
      )
      :
      (
        fashionMenuOpened ?
        "mt-5 pr-5 fashion-menu-dropdown fashion-menu-opened" :
        "mt-5 pr-5 fashion-menu-dropdown"
      )
    }
    id="fashion-menu-dropdown"
    onMouseEnter={() => toggleFashionMenu()}
    onMouseLeave={() => closeFashionMenu()}>
    <Row className="w-100 mb-4 fashion-menu-lists">
      {
        categories.map((menuList, idx1) =>
        <Col className="fashion-menu-list" lg={2} key={idx1}>
          <div className={
              i18n.translator.language === "ar" ?
              "mb-1 fashion-menu-list-title-ar" :
              "mb-1 fashion-menu-list-title"
            }
            onClick={() => selectFashionCategory(menuList.Category.link)}>
            <Trans>{menuList.Category.name}</Trans>
          </div>
          {
            menuList.Category.categories.map((innerItem, idx2) =>
            <div key={idx2}>
              {
                typeof innerItem.category === 'object' ?
                <div>
                  <div className={
                      i18n.translator.language === "ar" ?
                      "mb-1 fashion-menu-list-inner-title-ar" :
                      "mb-1 fashion-menu-list-inner-title"
                    }>
                    <Trans>{innerItem.category.name}</Trans>
                  </div>
                  {
                    innerItem.category.innerCategory.map((inner2, idx3) =>
                    <div className={
                        i18n.translator.language === "ar" ?
                        "pr-0 py-1 fashion-menu-item-ar" : "pr-0 py-1 fashion-menu-item"
                      }
                        key={idx3} onClick={() => selectFashionCategory(inner2.link)}>
                      <Trans>{inner2.name}</Trans>
                    </div>
                  )}
                </div> :
                <div className="fashion-menu-inner-list">
                  <div
                    className={
                      i18n.translator.language === "ar" ?
                      "pr-0 py-1 fashion-menu-item-ar" : "pr-0 py-1 fashion-menu-item"
                    }
                    onClick={() => selectFashionCategory(innerItem.link)}>
                    <Trans>{innerItem.category}</Trans>
                  </div>
                </div>
              }
            </div>
          )}
        </Col>
      )}
    </Row>
    {
      i18n.translator.language === 'en' &&
      <Row className="d-flex flex-row" id="fashion-menu-message-row">
        <p className="mr-3" id="fashion-menu-message">
          We offer complimentary returns on all orders. Due to reduced capacity there might be a slight delay
          when receiving your order.
        </p>
      </Row>
    }
  </Row>
);

export default withTranslation()(FashionMenuComponent);
