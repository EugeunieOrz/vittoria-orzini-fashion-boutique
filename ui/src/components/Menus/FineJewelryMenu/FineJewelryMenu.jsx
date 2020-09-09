// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../Menu.scss';

import categories from '../../../static/json/fjcategories.json';

type Props = {
  i18n: Object,
  t: Object,
  language: string,
  selectFashionCategory: (categoryLink: string) => any,
  closeFineJewelryMenu: () => any,
  fineJewelryMenuOpened: boolean,
  toggleFineJewelryMenu: () => any,
}

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

export const FineJewelryMenuComponent = ({
  i18n, t, language, selectFashionCategory, closeFineJewelryMenu,
  fineJewelryMenuOpened, toggleFineJewelryMenu,
}: Props) => (
  <Row className={
      fineJewelryMenuOpened ?
      "mt-5 pb-5 fashion-menu-dropdown fashion-menu-opened" :
      "mt-5 pb-5 fashion-menu-dropdown"
    }
       id="fashion-menu-dropdown"
       onMouseEnter={() => toggleFineJewelryMenu()}
       onMouseLeave={() => closeFineJewelryMenu()}>
    <Col lg={2}></Col>
    {
      categories.map((menuList, idx) =>
      <Col
        lg={2}
        className={
          i18n.translator.language === "ar" ?
          "pr-1 fashion-menu-list-title-ar" : "pr-1 fashion-menu-list-title"
        }
        onClick={() => selectFashionCategory(menuList.link)}
        key={idx}>
        <Trans>{menuList.name}</Trans>
      </Col>
    )}
  </Row>
);

export default withTranslation()(FineJewelryMenuComponent);
