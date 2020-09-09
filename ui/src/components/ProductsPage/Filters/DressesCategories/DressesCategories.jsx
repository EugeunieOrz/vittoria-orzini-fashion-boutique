// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import '../Filters.scss';

import dressesCategories from '../../../../static/json/dresses.json';

import arrowUp from '../../../../static/icons/arrow_up.svg';
import arrowDown from '../../../../static/icons/arrow_down.svg';


/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  dresses: Array,
  i18n: Object,
  t: Object,
  categoryIsShown: boolean,
  fashionCategory: string,
  chooseCategory: (dress: string) => any,
  resetCategory: () => any,
  showCategories: () => any,
}

export const DressesCategoriesComponent = ({
  dresses, i18n, t,
  fashionCategory, categoryIsShown, showCategories, chooseCategory, resetCategory,
}: Props) => (
  <Col md={4} lg={3} xl={2} className="category-filter" id="categories-filter">
    <Nav.Item className="d-flex justify-content-between filter-btn-wrapper">
      <Nav.Item className="filter-btn" onClick={() => showCategories()}>
        <div className="d-flex justify-content-between filter-inner-btn">
          {t('Category')}
          <Image
            className="arrow-img"
            src={categoryIsShown ? arrowUp : arrowDown}
            alt=""
            width="32"
            height="32"
          />
        </div>
      </Nav.Item>
      {
        fashionCategory !== '' &&
        <Nav.Item className="reset-btn" onClick={() => resetCategory()}>
          {t('Reset')}
        </Nav.Item>
      }
    </Nav.Item>
    <div
      className={
        categoryIsShown ?
        "pl-0 text-left category-dropdown-content categories-shown" :
        "pl-0 text-left category-dropdown-content"
      }>
    {
      typeof dresses !== 'undefined' && dresses.length > 0 && dresses !== '' ?
      dresses.map((dress, index) =>
        <Nav.Item
          className={
            fashionCategory === dress ?
            "pl-2 mb-2 dress-category selected" :
            "pl-2 mb-2 dress-category"
          }
          onClick={() => chooseCategory(dress)}
          key={index}>
          <Trans>{dress + ' Dresses'}</Trans>
        </Nav.Item>
      ) :
      dressesCategories.map((dress, index) =>
        <Nav.Item
          className={
            fashionCategory === dress.Category ?
            "pl-2 mb-2 dress-category selected" :
            "pl-2 mb-2 dress-category"
          }
          onClick={() => chooseCategory(dress.Category)}
          key={index}>
          <Trans>{dress.Category + ' Dresses'}</Trans>
        </Nav.Item>
      )
    }
   </div>
  </Col>
);

export default withTranslation()(DressesCategoriesComponent);
