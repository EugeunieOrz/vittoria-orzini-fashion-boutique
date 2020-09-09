// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import '../Filters.scss';

import colors from '../../../../static/json/colors.json';

import arrowUp from '../../../../static/icons/arrow_up.svg';
import arrowDown from '../../../../static/icons/arrow_down.svg';


/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  i18n: Object,
  t: Object,
  colorIsShown: boolean,
  colorCategory: string,
  chooseColor: (color: string) => any,
  resetColor: () => any,
  showColors: () => any,
}

export const ColorFilterComponent = ({
  i18n, t,
  chooseColor, showColors, colorIsShown, colorCategory, resetColor,
}: Props) => (
  <Col md={4} lg={3} xl={2} className="d-flex category-filter">
    <div id="colors-filter">
      <Nav.Item className="d-inline-block filter-btn" onClick={() => showColors()}>
        <div className="d-flex justify-content-between filter-inner-btn">
          {t('Color')}
          <Image
            className="d-inline-block arrow-img"
            src={colorIsShown ? arrowUp : arrowDown}
            alt=""
            width="32"
            height="32"
          />
        </div>
      </Nav.Item>
      {
        colorCategory !== '' &&
        <Nav.Item className="ml-2 d-inline reset-btn" onClick={() => resetColor()}>
          {t('Reset')}
        </Nav.Item>
      }
      <div
        className={
          colorIsShown ?
          "text-left pr-0 colors-dropdown-content colors-shown" :
          "text-left pr-0 colors-dropdown-content"
        }
        dir={i18n.translator.language === "ar" ? "rtl" : "ltr"}>
      {
        colors.map((color, index) =>
        <Nav.Item
          className={
            colorCategory === color.name ?
            (
              i18n.translator.language === "ar" ?
              "d-flex align-items-center mb-2 color-category-ar selected" :
              "d-flex align-items-center mb-2 color-category selected"
            )
            :
            (
              i18n.translator.language === "ar" ?
              "d-flex align-items-center mb-2 color-category-ar" :
              "d-flex align-items-center mb-2 color-category"
            )
          }
          key={index}
          onClick={() => chooseColor(color.name)}>
          <Image
            className="mx-2"
            src={require(`../../../../static/fashion/colors/${color.color}`)}
            alt="Color"
            width="16"
            height="16"
            />
          <Trans>{color.name}</Trans>
        </Nav.Item>
        )
      }
     </div>
    </div>
  </Col>
);

export default withTranslation()(ColorFilterComponent);
