// @flow
import React from 'react';
import { withTranslation } from "react-i18next";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import '../Filters.scss';

import sizes from '../../../../static/json/sizes.json';

import arrowUp from '../../../../static/icons/arrow_up.svg';
import arrowDown from '../../../../static/icons/arrow_down.svg';


/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  i18n: Object,
  t: Object,
  sizeIsShown: boolean,
  sizeCategory: string,
  chooseSize: (size: string) => any,
  resetSize: () => any,
  showSizes: () => any,
}

export const SizesFilterComponent = ({
  i18n, t,
  resetSize, chooseSize, showSizes, sizeIsShown, sizeCategory,
}: Props) => (
  <Col md={4} lg={3} xl={2} className="d-flex category-filter">
    <div id="sizes-filter">
      <Nav.Item className="d-inline-block filter-btn" onClick={() => showSizes()}>
        <div className="d-flex justify-content-between filter-inner-btn">
          {t('Size')} FR
          <Image
            className="arrow-img"
            src={sizeIsShown ? arrowUp : arrowDown}
            alt=""
            width="32"
            height="32"
          />
        </div>
      </Nav.Item>
      {
        sizeCategory !== '' &&
        <Nav.Item className="ml-2 d-inline reset-btn" onClick={() => resetSize()}>
          {t('Reset')}
        </Nav.Item>
      }
      <div
        className={
          sizeIsShown ?
          "pl-0 sizes-dropdown-content sizes-shown" :
          "pl-0 sizes-dropdown-content"
        }>
      {
        sizes.map((size, index) =>
        <Nav.Item
          className={
            sizeCategory === size.Category ?
            (
              i18n.translator.language === "ar" ?
              "pl-2 mb-2 size-category-ar selected" :
              "pl-2 mb-2 size-category selected"
            )
            :
            (
              i18n.translator.language === "ar" ?
              "pl-2 mb-2 size-category-ar" :
              "pl-2 mb-2 size-category"
            )
          }
          onClick={() => chooseSize(size.Category)}
          key={index}>
          {size.Category}
        </Nav.Item>
        )
      }
     </div>
    </div>
  </Col>
);

export default withTranslation()(SizesFilterComponent);
