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
  newInFashionCategories: Array,
  i18n: Object,
  t: Object,
  newInFashionCategoryIsShown: boolean,
  newInFashionCategory: string,
  chooseNFCategory: (category: string) => any,
  resetNFCategory: () => any,
  showNFCategories: () => any,
}

export const NewInFashionCategoriesComponent = ({
  newInFashionCategories, i18n, t,
  newInFashionCategory, newInFashionCategoryIsShown, showNFCategories, chooseNFCategory, resetNFCategory,
}: Props) => (
  <Col md={4} lg={3} xl={2} className="category-filter" id="categories-filter">
    <Nav.Item className="d-inline-block filter-btn" onClick={() => showNFCategories()}>
      <div className="d-flex justify-content-between filter-inner-btn">
        {t('Category')}
        <Image
          className="arrow-img"
          src={newInFashionCategoryIsShown ? arrowUp : arrowDown}
          alt=""
          width="32"
          height="32"
        />
      </div>
    </Nav.Item>
    {
      newInFashionCategory !== '' &&
      <Nav.Item className="ml-2 d-inline reset-btn" onClick={() => resetNFCategory()}>
        {t('Reset')}
      </Nav.Item>
    }
    <div
      className={
        newInFashionCategoryIsShown ?
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
      typeof newInFashionCategories !== 'undefined' && newInFashionCategories.length > 0 &&
      newInFashionCategories !== '' &&
      newInFashionCategories.map((item, index) =>
        <Nav.Item
          className={
            i18n.translator.language === "ar" ?
            (
              newInFashionCategory === item ?
              "pr-2 mb-2 dress-category-ar selected" :
              "pr-2 mb-2 dress-category-ar"
            ) :
            (
              newInFashionCategory === item ?
              "pl-2 mb-2 dress-category selected" :
              "pl-2 mb-2 dress-category"
            )
          }
          onClick={() => chooseNFCategory(item)}
          key={index}>
          <Trans>{item}</Trans>
        </Nav.Item>
      )
    }
   </div>
  </Col>
);

export default withTranslation()(NewInFashionCategoriesComponent);
