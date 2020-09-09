// @flow
import React from 'react';
import { withTranslation } from "react-i18next";
import Row from 'react-bootstrap/Row';
import ReadyToWearCategoriesContainer from 'containers/ProductsPage/Filters/ReadyToWearCategoriesContainer';
import ReadyToWearItemsContainer from 'containers/ProductsPage/Filters/ReadyToWearItemsContainer';
import ColorFilterContainer from 'containers/ProductsPage/Filters/ColorFilterContainer';
import OrderFilterContainer from 'containers/ProductsPage/Filters/OrderFilterContainer';
import SizesFilterContainer from 'containers/ProductsPage/Filters/SizesFilterContainer';

import '../Filters.scss';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  i18n: Object,
  t: Object,
}

export const ReadyToWearFiltersComponent = ({
  i18n, t,
}: Props) => (
  <Row
    className={
      i18n.translator.language === "ar" ?
      "px-2 mt-2 mb-3 product-filters-ar" :
      "px-2 mt-2 mb-3 product-filters"
    }>
    <ReadyToWearCategoriesContainer />
    <SizesFilterContainer />
    <ColorFilterContainer />
    <OrderFilterContainer />
    <ReadyToWearItemsContainer />
  </Row>
);

export default withTranslation()(ReadyToWearFiltersComponent);
