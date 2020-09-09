// @flow
import React from 'react';
import { withTranslation } from "react-i18next";
import Row from 'react-bootstrap/Row';
import NewInFashionCategoriesContainer from 'containers/ProductsPage/Filters/NewInFashionCategoriesContainer';
import NewInFashionItemsContainer from 'containers/ProductsPage/Filters/NewInFashionItemsContainer';
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

export const NewInFashionFiltersComponent = ({
  i18n, t,
}: Props) => (
  <Row
    className={
      i18n.translator.language === "ar" ?
      "px-2 mt-2 mb-3 product-filters-ar" :
      "px-2 mt-2 mb-3 product-filters"
    }>
    <NewInFashionCategoriesContainer />
    <SizesFilterContainer />
    <ColorFilterContainer />
    <OrderFilterContainer />
    <NewInFashionItemsContainer />
  </Row>
);

export default withTranslation()(NewInFashionFiltersComponent);
