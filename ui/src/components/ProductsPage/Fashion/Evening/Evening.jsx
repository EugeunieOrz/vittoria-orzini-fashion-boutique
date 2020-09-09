// @flow
import React from 'react';
import { withTranslation } from "react-i18next";
import CoreContainer from 'containers/CoreContainer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import './Evening.scss';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  i18n: Object,
  t: Object,
  products: Array,
  switchToProductView: (product: Object, userID: string) => any,
  userID: string,
}

const formatNum = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const EveningComponent = ({
  i18n, t, products, switchToProductView, userID,
}: Props) => (
  <CoreContainer>
    <div className="px-4 mt-2 mb-5 d-flex flex-column align-items-center text-center" id="fashion-titles">
      <div
        className="d-flex flex-row my-2 text-uppercase"
        id={
          i18n.translator.language === "ar" ?
          "fashion-category-title-ar" :
          "fashion-category-title"
        }>
        {t('Evening')}
      </div>
      <div
        id={
          i18n.translator.language === "ar" ?
          "fashion-category-subtitle-ar" :
          "fashion-category-subtitle"
        }>
        {t('eveningTitle')}
      </div>
    </div>
    <Row className="flex-grow-1" id="products-rows">
      {
        products.map((product, index) =>
          <Col xs={6} md={4} lg={3} key={index}>
            <Figure className="img-figure">
              <Figure.Image
                src={require(`../../../../static/fashion/ready-to-wear/evening/${product.links[0]}`)}
                alt="Fashion"
                width={300}
                height={400}
                onClick={() => switchToProductView({
                  product: product,
                  userID: userID
                })}
                onMouseOver={e => {
                  e.currentTarget.src = require(`../../../../static/fashion/ready-to-wear/evening/${product.links[1]}`)
                }}
                onMouseLeave={e => {
                  e.currentTarget.src = require(`../../../../static/fashion/ready-to-wear/evening/${product.links[0]}`)
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

export default withTranslation()(EveningComponent);
