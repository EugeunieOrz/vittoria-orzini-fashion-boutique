// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation, Trans } from "react-i18next";
import config from 'config/index';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProductLookContainer from 'containers/Product/ProductLookContainer';
import { formatNum } from 'util/ProductFunctions';
import './ProductPage.scss';

import heartIcon from '../../../static/icons/heart.svg';
import filledHeartIcon from '../../../static/icons/filled_heart.svg';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  i18n: Object,
  t: Object,
  product: Object,
  size: string,
  selectSize: (size: string) => any,
  viewProductLook: (product: Object, slideIndex: number) => any,
  productLookIsShown: boolean,
  selectedIndex: number,
  selectSlide: (index: number) => any,
  addProductToShoppingBag: (
    product: Object,
    size: string,
    quantity: number,
    userID: string
  ) => any,
  addProductToGuestShoppingBag: (
    product: Object,
    size: string,
    shoppingBag: Object
  ) => any,
  shoppingBag: Object,
  toggleShoppingBtnTitle: () => any,
  getBackShoppingBtnTitle: () => any,
  shoppingTitle: string,
  addProductToWishlist: (product: Object, category: string, size: string, userID: string) => any,
  openSignInW: (menuIsShown: boolean) => any,
  menuIsShown: boolean,
  openMsg: () => any,
  selectFashionCategory: (category: string) => any,
  userID: string,
  wishlist: Array,
  proceedToReturnForm: (userID: string) => any,
}

const loadImage = (product: Object, link: string) => {
  const img = require(`../../../static/${product.department.toLowerCase()}/${product.typeOfCollection.toLowerCase()}/${link}`);
  return img;
}

const loadColorImage = (link: string) => {
  const img = require(`../../../static/fashion/colors/${link}.jpg`);
  return img;
}

const itemInTheWishlist = (product: Object, wishlist: Array, size: string) =>
  wishlist.some(i => i.id === product.id && i.size.some(s => s.number === size));

export const ProductPageComponent = ({
  i18n, t, product, size, selectSize, openMsg,
  viewProductLook, productLookIsShown, msgIsShown,
  selectedIndex, selectSlide, shoppingBag,
  addProductToShoppingBag, addProductToGuestShoppingBag,
  menuIsShown, wishlist, toggleShoppingBtnTitle,
  getBackShoppingBtnTitle, shoppingTitle,
  addProductToWishlist, openSignInW, userID,
  selectFashionCategory, proceedToReturnForm,
}: Props) => (
  <div className="product-page-container">
    {
      productLookIsShown &&
      <ProductLookContainer />
    }
    {
      product &&
      <Container className="mb-2" fluid>
        <Row
          className="px-4 mt-2 mb-4"
          id={
            i18n.translator.language === "ar" ?
            "fashion-titles-ar" :
            "fashion-titles"
          }>
          <div className="d-flex flex-row mt-2">
            <div
              className={
                i18n.translator.language === "ar" ?
                "pl-2 border-left border-dark fashion-title" :
                "pr-2 border-right border-dark fashion-title"
              }
              onClick={() => selectFashionCategory(product.department.toLowerCase())}>
              <Trans>{product.department}</Trans>
            </div>
            <div
              className={
                i18n.translator.language === "ar" ?
                "pl-2 pr-2 border-left border-dark fashion-title" :
                "pl-2 pr-2 border-right border-dark fashion-title"
              }
              onClick={() => selectFashionCategory(product.typeOfCollection.toLowerCase())}>
              <Trans>{product.typeOfCollection}</Trans>
            </div>
            <div
              className={
                i18n.translator.language === "ar" ?
                "pr-2 fashion-title" :
                "pl-2 fashion-title"
              }
              onClick={() => selectFashionCategory(product.category.toLowerCase())}>
              <Trans>{product.category}</Trans>
            </div>
          </div>
        </Row>
        <Row className="flex-grow-1" id="product-container">
          <Col className="d-block d-lg-none" xs={12}>
            <Carousel
              activeIndex={selectedIndex}
              onSelect={selectSlide}
              interval={null}
              fade={true}
              indicators={false}>
              {
                product.links.map((link, index) =>
                <Carousel.Item
                  className="d-flex justify-content-center"
                  id="carousel-product-img"
                  key={index}>
                  <Image
                    src={loadImage(product, link)}
                    width={300}
                    height={400}
                    alt="Fashion"
                    className="h-100 product-image" />
                </Carousel.Item>
               )
              }
            </Carousel>
          </Col>
          <Col className="d-none d-lg-block" lg={8} id="product-look">
            <ListGroup horizontal id="product-look-1">
              <ListGroup.Item className="pr-2">
                <Card.Img
                  className="h-100 product-image"
                  src={loadImage(product, product.links[0])}
                  alt="Fashion"
                  width={300}
                  height={400}
                  onClick={() => viewProductLook({
                    product: product,
                    slideIndex: 0
                  })} />
              </ListGroup.Item>
              <ListGroup.Item className="pr-2">
                <Card.Img
                  className="h-100 product-image"
                  src={loadImage(product, product.links[1])}
                  alt="Fashion"
                  width={300}
                  height={400} />
                <Card.ImgOverlay className="d-flex justify-content-center align-items-end">
                  <div
                    className="mb-4 px-5 py-1"
                    id="view-look-btn"
                    onClick={() => viewProductLook({
                      product: product,
                      slideIndex: 1
                    })}>
                    {t('viewLookBtn')}
                  </div>
                </Card.ImgOverlay>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup horizontal id="product-look-2">
              {
                product.links.slice(2).map((link, index) =>
                <ListGroup.Item key={index} className="pr-2">
                  <Card.Img
                    className="h-100 product-image"
                    src={loadImage(product, link)}
                    alt="Fashion"
                    width={180.5}
                    height={243}
                    onClick={() => viewProductLook({
                      product: product,
                      slideIndex: product.links.indexOf(link)
                    })} />
                </ListGroup.Item>
               )
              }
            </ListGroup>
          </Col>
          <Col xs={12} lg={4} className="d-flex flex-column mt-5 mt-lg-0">
            <span className="my-2 d-flex justify-content-center align-items-center" id="product-name">
              <Trans>{product.name}</Trans>
              <Image
                className={i18n.translator.language === "ar" ? "mr-1" : "ml-1"}
                id="add-to-wlist-btn"
                src={
                  (typeof wishlist !== undefined && wishlist.length > 0) &&
                  itemInTheWishlist(product, wishlist, size) ?
                  filledHeartIcon :
                  heartIcon
                }
                width="24" height="24" alt="Heart"
                onClick={
                  size !== '' ?
                  (
                    userID !== undefined ?
                    () => addProductToWishlist({
                      product: product,
                      category: product.category,
                      size: size,
                      userID: userID
                    }) :
                    () => openSignInW(menuIsShown)
                  ) :
                  () => openMsg()
                }
                />
            </span>
            <p className="text-center" id="product-price">
              {product.currency + ' ' + formatNum(product.price)}
            </p>
            <p
              className="align-self-center mb-2 px-5 text-center"
              id={i18n.translator.language === "ar" ? "product-state-ar" : "product-state"}>
              <Trans>{product.stateOfProduct}</Trans>
            </p>
            <ListGroup
              className="d-flex flex-column text-center"
              id="product-color">
              <ListGroup.Item
                className="pb-0"
                id={
                  i18n.translator.language === "ar" ?
                  "product-color-title-ar" : "product-color-title"
                }>
                {t('itemColor')}
                <Trans>{product.color.color}</Trans>
              </ListGroup.Item>
              <ListGroup.Item id="product-color-img">
                <Image
                  src={loadColorImage(product.color.imgIndex)}
                  width="32"
                  height="32"
                  alt="" />
              </ListGroup.Item>
            </ListGroup>
            <div className="mt-1 text-center" id="product-sizes-title">
              {t('Size (French Sizing)')}
            </div>
            <ListGroup
              className="my-3 mx-6 px-6 mx-lg-2 px-lg-2 mx-xl-5 px-xl-4 justify-content-around"
              id="product-sizes" horizontal>
              {
                product.size.map((sizeNum, index) =>
                <ListGroup.Item
                  key={index}
                  className={
                    sizeNum.number === size ?
                    "size selected" :
                    (
                      sizeNum.quantity === 0 ?
                      "size sold-out" :
                      "size"
                    )
                  }
                  onClick={
                    sizeNum.quantity !== 0 ?
                    () => selectSize(sizeNum.number) :
                    () => 'javascript:void(0)'
                  }>
                  {sizeNum.number}
                </ListGroup.Item>
               )
              }
            </ListGroup>
            <ListGroup className="my-3 justify-content-center" id="shopping-btns" horizontal>
              <Button
                className=""
                id={
                  i18n.translator.language === "ar" ?
                  "add-to-bag-btn-ar" : "add-to-bag-btn"
                }
                onClick={
                  userID !== undefined ?
                  () => addProductToShoppingBag({
                    product: product,
                    size: size,
                    quantity: 1,
                    userID: userID
                  })
                  :
                  () => addProductToGuestShoppingBag({
                    product: product,
                    size: size,
                    shoppingBag: shoppingBag
                  })
                }
                onMouseOver={
                  size === '' ?
                  () => toggleShoppingBtnTitle() :
                  () => getBackShoppingBtnTitle()
                }
                onMouseLeave={() => getBackShoppingBtnTitle()}
                disabled={size === ''}>
                <Trans>{shoppingTitle}</Trans>
              </Button>
            </ListGroup>
            <Tabs
              defaultActiveKey="Description"
              id="product-details-tabs"
              className={
                i18n.translator.language === "ar" ?
                "mt-3 justify-content-around border-0 product-details-tabs-ar" :
                "mt-3 justify-content-around border-0 product-details-tabs"
              }>
              <Tab eventKey="Description" title={t('descr')}>
                <ListGroup id="product-description-group">
                  <ListGroup.Item className="pl-0" id="product-description">
                    <Trans>{product.description}</Trans>
                  </ListGroup.Item>
                  {
                    product.details.map((detail, index) =>
                    <ListGroup.Item key={index} className="pl-3 pt-1 pb-0 product-detail">
                      <Trans>{detail}</Trans>
                    </ListGroup.Item>
                   )
                  }
                  <ListGroup.Item className="mt-3 pl-0" id="product-composition">
                    <Trans>Composition</Trans>
                    {
                      product.composition.map((fabric, index) =>
                      fabric.fabric.includes("Lining") || fabric.fabric.includes("Outer") ?
                      <div className="ml-2 mt-1" key={index}>
                        <Trans>{fabric.fabric.replace(':', '')}</Trans>
                      </div>
                      :
                      <span className="" key={index}>
                        {
                          product.composition.indexOf(fabric) !== product.composition.lenth - 1 ?
                          <span>
                            <Trans>{fabric.fabric}</Trans>
                            {fabric.percentage}
                            {', '}
                          </span>
                          :
                          <span>
                            <Trans>{fabric.fabric}</Trans>{fabric.percentage}
                          </span>
                        }
                      </span>
                      )
                    }
                  </ListGroup.Item>
                  <ListGroup.Item className="pl-0" id="product-code">
                    {t('code', {code: product.id})}
                  </ListGroup.Item>
                </ListGroup>
              </Tab>
              <Tab
                eventKey="Shipping"
                title={t('Shipping')}
                className={i18n.translator.language === "ar" ? "text-right" : ""}>
                <div
                  className="mt-3"
                  id={
                    i18n.translator.language === "ar" ?
                    "product-shipping-ar" : "product-shipping"
                  }>
                  {t('someShippingInfo')}
                </div>
              </Tab>
              <Tab
                eventKey="Exchange"
                title={t('exchangeAndReturns')}
                className={i18n.translator.language === "ar" ? "text-right" : ""}>
                <div
                  className="mt-3"
                  id={
                    i18n.translator.language === "ar" ?
                    "exchange-msg-1-ar" : "exchange-msg-1"
                  }>
                  {t('returnsInfoMsg1')}
                </div>
                <div
                  className="mt-3"
                  id={
                    i18n.translator.language === "ar" ?
                    "exchange-msg-2-ar" : "exchange-msg-2"
                  }>
                  <span>
                    {t('returnsInfoMsg2-1')}
                    <span
                      id="returnsform-link"
                      onClick={() => proceedToReturnForm(userID)}>
                      {t('returnForm')}
                    </span>
                    {t('returnsInfoMsg2-3')}
                  </span>
                </div>
                <div
                  className="mt-1"
                  id={
                    i18n.translator.language === "ar" ?
                    "exchange-msg-3-ar" : "exchange-msg-3"
                  }>
                  {t('returnsInfoMsg4')}
                </div>
                <div
                  className="mt-1"
                  id={
                    i18n.translator.language === "ar" ?
                    "exchange-msg-4-ar" : "exchange-msg-4"
                  }>
                  <span>
                    {t('returnsInfoMsg5')}
                    <Link id="clientServiceAreaLink" to={config.route.clientService}>
                      {t('clientServiceAreaLink')}
                    </Link>.
                  </span>
                </div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    }
  </div>
);

export default withTranslation()(ProductPageComponent);
