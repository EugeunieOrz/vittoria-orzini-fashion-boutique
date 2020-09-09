// @flow
import React from 'react';
import { withTranslation } from "react-i18next";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { filterByCategory } from 'util/ProductFilters';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  readyToWearItems: Array,
  i18n: Object,
  t: Object,
  category: string,
  size: string,
  color: string,
  order: string,
}

export const ReadyToWearItemsComponent = ({
  i18n, t, readyToWearItems, category, size, color, order,
}: Props) => (
  <Col lg={12} xl={3} className="d-flex w-100 category-filter">
    <Nav.Item
      className={
        i18n.translator.language === "ar" ?
        "mr-auto items-found" : "ml-auto items-found"
      }>
      {
        filterByCategory(readyToWearItems, category, size, color, order).length > 1 ?
        (
          i18n.translator.language === "ar" ?
          <div className="clearfix">
            <span className="float-left">
              {t('items')}
            </span>
            <span className="float-right ml-2">
              {filterByCategory(readyToWearItems, category, size, color, order).length}
            </span>
          </div>
          :
          t('items found', {count: filterByCategory(readyToWearItems, category, size, color, order).length})
        )
        :
        t('item found', {count: filterByCategory(readyToWearItems, category, size, color, order).length})
      }
    </Nav.Item>
  </Col>
);

export default withTranslation()(ReadyToWearItemsComponent);
