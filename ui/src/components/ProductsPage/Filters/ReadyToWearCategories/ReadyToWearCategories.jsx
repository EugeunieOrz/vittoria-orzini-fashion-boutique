// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import '../Filters.scss';

import arrowUp from '../../../../static/icons/arrow_up.svg';
import arrowDown from '../../../../static/icons/arrow_down.svg';


/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  rtwCategories: Array,
  i18n: Object,
  t: Object,
  rtwCategoryIsShown: boolean,
  readyToWearCategory: string,
  chooseRTWCategory: (category: string) => any,
  resetRTWCategory: () => any,
  showRTWCategories: () => any,
}

export const ReadyToWearCategoriesComponent = ({
  rtwCategories, i18n, t,
  readyToWearCategory, rtwCategoryIsShown, showRTWCategories, chooseRTWCategory, resetRTWCategory,
}: Props) => (
  <Col md={4} lg={3} xl={2} className="category-filter" id="categories-filter">
    <Nav.Item className="d-flex justify-content-between filter-btn-wrapper">
      <Nav.Item className="filter-btn" onClick={() => showRTWCategories()}>
        <div className="d-flex justify-content-between filter-inner-btn">
          {t('Category')}
          <Image
            className="arrow-img"
            src={rtwCategoryIsShown ? arrowUp : arrowDown}
            alt=""
            width="32"
            height="32"
          />
        </div>
      </Nav.Item>
      {
        readyToWearCategory !== '' &&
        <Nav.Item className="reset-btn" onClick={() => resetRTWCategory()}>
          {t('Reset')}
        </Nav.Item>
      }
    </Nav.Item>
    <div
      className={
        rtwCategoryIsShown ?
        (
          i18n.translator.language === "ar" ?
          "pl-0 text-right category-dropdown-content-ar categories-shown" :
          "pl-0 text-left category-dropdown-content categories-shown"
        )
        :
        (
          i18n.translator.language === "ar" ?
          "pl-0 text-right category-dropdown-content-ar" :
          "pl-0 text-left category-dropdown-content"
        )
      }>
    {
      typeof rtwCategories !== 'undefined' && rtwCategories.length > 0 && rtwCategories !== '' &&
      rtwCategories.map((item, index) =>
        <Nav.Item
          className={
            i18n.translator.language === "ar" ?
            (
              readyToWearCategory === item ?
              "pr-2 mb-2 dress-category-ar selected" :
              "pr-2 mb-2 dress-category-ar"
            )
            :
            (
              readyToWearCategory === item ?
              "pl-2 mb-2 dress-category selected" :
              "pl-2 mb-2 dress-category"
            )
          }
          onClick={() => chooseRTWCategory(item)}
          key={index}>
          <Trans>{item}</Trans>
        </Nav.Item>
      )
    }
   </div>
  </Col>
);

export default withTranslation()(ReadyToWearCategoriesComponent);
