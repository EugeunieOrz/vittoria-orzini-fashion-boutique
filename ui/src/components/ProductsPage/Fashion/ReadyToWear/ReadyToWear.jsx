// @flow
import React from 'react';
import { withTranslation } from "react-i18next";
import CoreContainer from 'containers/CoreContainer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import ReadyToWearFilters from 'components/ProductsPage/Filters/ReadyToWearFilters';
import { filterByCategory } from 'util/ProductFilters';
import { formatNum } from 'util/ProductFunctions';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  fashionCategory: string,
  sizeCategory: string,
  colorCategory: string,
  orderCategory: string,
  i18n: Object,
  t: Object,
  products: Array,
  selectFashionCategory: (category: string) => any,
  switchToProductView: (product: Object, userID: string) => any,
  userID: string,
}

export const ReadyToWearComponent = ({
  i18n, t, products, selectFashionCategory, switchToProductView, userID,
  fashionCategory, sizeCategory, colorCategory, orderCategory,
}: Props) => (
  <CoreContainer>
    <Row
      className="px-4 mt-2 mb-3"
      id={
        i18n.translator.language === "ar" ?
        "fashion-titles-ar" : "fashion-titles"
      }>
      <div className="d-flex flex-row mt-2">
        <div
          className={
            i18n.translator.language === "ar" ?
            "pl-2 border-left border-dark fashion-title" :
            "pr-2 border-right border-dark fashion-title"
          }
          onClick={() => selectFashionCategory("fashion")}>
          {t('Fashion')}
        </div>
        <div
          className={
            i18n.translator.language === "ar" ?
            "pr-2 fashion-title" :
            "pl-2 fashion-title"
          }
          onClick={() => selectFashionCategory("ready-to-wear")}>
          {t('Ready-To-Wear')}
        </div>
      </div>
    </Row>
    <ReadyToWearFilters />
    <Row className="flex-grow-1" id="products-rows">
      {
        filterByCategory(
          products,
          fashionCategory,
          sizeCategory,
          colorCategory,
          orderCategory
        ).map((product, index) =>
          <Col xs={6} md={4} lg={3} key={index}>
            <Figure className="img-figure">
              <Figure.Image
                src={require(`../../../../static/fashion/ready-to-wear/${product.links[0]}`)}
                alt="Fashion"
                width={300}
                height={400}
                onClick={() => switchToProductView({
                  product: product,
                  userID: userID
                })}
                onMouseOver={e => {
                  e.currentTarget.src = require(`../../../../static/fashion/ready-to-wear/${product.links[1]}`)
                }}
                onMouseLeave={e => {
                  e.currentTarget.src = require(`../../../../static/fashion/ready-to-wear/${product.links[0]}`)
                }}
              />
            <Figure.Caption>
              <p className="mb-1" id="item-name">{product.name.toUpperCase()}</p>
              <p id="item-price">{product.currency + " " + formatNum(product.price)}</p>
            </Figure.Caption>
          </Figure>
          </Col>
        )
      }
    </Row>
  </CoreContainer>
);

export default withTranslation()(ReadyToWearComponent);
