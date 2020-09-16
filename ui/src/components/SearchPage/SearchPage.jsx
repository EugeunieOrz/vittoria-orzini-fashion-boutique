// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import { Control } from 'react-redux-form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Figure from 'react-bootstrap/Figure';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './SearchPage.scss';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  i18n: Object,
  t: Object,
  closeSearchPage: () => any,
  filtered: Array,
  filterProducts: () => any,
  handleSearchResult: () => any,
  products: Array,
  switchToProductView: (product: Object, userID: string) => any,
  userID: string,
}

const formatNum = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const SearchPageComponent = ({
  i18n, t, closeSearchPage, filtered, filterProducts, handleSearchResult, products,
  switchToProductView, userID,
}: Props) => (
  <Container id="search-page-container" fluid>
    <Row id="search-form-row">
      <Row className="w-100">
        <Col xs={6} lg={11}></Col>
        <Col xs={6} lg={1} className="d-flex justify-content-end pt-4 pr-2">
          <div id="close-search-btn" onClick={() => closeSearchPage()}></div>
        </Col>
      </Row>
      <Row className="w-100 no-gutters">
        <Col className="d-none d-lg-flex" lg={1}></Col>
        <Col xs={12} lg={10} className="mt-5 pt-5">
          <Form id={
              i18n.translator.language === "ar" ?
              "searchbar-ar" : "searchbar"
            }>
            <Control.text
              id="search"
              className="form-control mx-sm-2 border-0 text-center"
              model="search"
              placeholder={t('Search')}
              onChange={(event) => filterProducts({
                 event: event,
                 products: products
              })}/>
          </Form>
        </Col>
        <Col className="d-none d-lg-flex" lg={1}></Col>
      </Row>
    </Row>
    {
      typeof filtered !== 'undefined' && filtered.length > 0 &&
      <Row className="mt-5" id="search-results-row">
        <Row className="w-100 pl-3 mt-2 mb-4">
          <Col lg={1}></Col>
          <Col lg={10}>
            <p id={
                i18n.translator.language === "ar" ?
                "search-results-title-ar" : "search-results-title"
              }>
              <Trans>Search Results</Trans>
            </p>
            {
              i18n.translator.language === "ar" ?
              <div className="d-flex flex-row">
                <div className="clearfix" id="filtered-length-ar">
                  <span className="float-left">{t('items')}</span>
                  <span className="float-right ml-2">{filtered.length}</span>
                </div>
                <div className="flex-grow-1"></div>
              </div>
              :
              <p id="filtered-length">
                {t('products', {length: filtered.length})}
              </p>
            }
          </Col>
          <Col lg={1}></Col>
        </Row>
        <Row>
          <Col lg={1}></Col>
          <Col lg={10}>
            <Row className="px-2">
              {
                filtered.map((product, index) =>
                  <Col lg={4}
                    key={index}
                    className="product"
                    onClick={event => handleSearchResult({
                      event: event,
                      product: product,
                      userID: userID
                    })}>
                    <Figure className="img-figure">
                      <Figure.Image
                        className="my-0"
                        src={require(`../../static/${product.department.toLowerCase()}/${product.typeOfCollection.toLowerCase()}/${product.links[0]}`)}
                        alt="Fashion"
                        width={500}
                        height={600}
                        onClick={() => switchToProductView({
                          product: product,
                          userID: userID
                        })}
                        onMouseOver={e => {
                          e.currentTarget.src = require(`../../static/${product.department.toLowerCase()}/${product.typeOfCollection.toLowerCase()}/${product.links[1]}`)
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.src = require(`../../static/${product.department.toLowerCase()}/${product.typeOfCollection.toLowerCase()}/${product.links[0]}`)
                        }}
                      />
                  </Figure>
                  <Figure.Caption className="mb-4">
                    <div id="item-name">{product.name.toUpperCase()}</div>
                    <div id="item-price">{product.currency + " " + formatNum(product.price)}</div>
                  </Figure.Caption>
                  </Col>
                )
              }
            </Row>
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Row>
    }
  </Container>
);

export default withTranslation()(SearchPageComponent);
