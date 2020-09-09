// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation, Trans } from "react-i18next";
import config from 'config/index';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import './ShoppingBag.scss';

import closeSign from '../../../static/icons/close.svg';
import plusSign from '../../../static/icons/plus.svg';
import substract from '../../../static/icons/minus.svg';
import cardImg from '../../../static/logo/creditcards.gif';

/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/

type Props = {
  i18n: Object,
  t: Object,
  shoppingBag: Object,
  userShoppingBag: Array<Object>,
  products: Array<Object>,
  removeItemFromGuestShoppingBag: (
    itemID: string,
    size: string,
    shoppingBag: Object
  ) => any,
  changeSizeInGuestShoppingBag: (
    itemID: string,
    sizeToAdd: string,
    sizeToRemove: string,
    qty: number,
    shoppingBag: Object
  ) => any,
  changeQtyInGuestShoppingBag: (
    itemID: string,
    size: size,
    qtyToAdd: number,
    shoppingBag: Object
  ) => any,
  removeItemFromShoppingBag: (
    itemID: string,
    size: string,
    userID: string
  ) => any,
  changeSizeInShoppingBag: (
    itemID: string,
    itemQty: number,
    sizeToAdd: string,
    qty: number,
    userID: string
  ) => any,
  changeQtyInShoppingBag: (
    itemID: string,
    itemQty: number,
    size: size,
    qtyToAdd: number,
    userID: string
  ) => any,
  route: (string) => any,
  userID: string,
}

const formatNum = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const checkItemSizes = (arr: Array, id: string, size: string) => {
  var sizes = [];
  for( var i = 0; i < arr.length; i++){
    if(arr[i].id === id) {
      sizes = arr[i].size;
      for(var j = 0; j < sizes.length; j++) {
        if ( sizes[j].number === size) {
          sizes.splice(j, 1);
         }
      }
    }
   }
   return sizes;
}

const checkItemsForZeroQty = (arr: Array) => {

  return arr && arr.filter(e => e.quantity !== 0);
}

const checkTotal = (items: Array) => {
  var lengthArr = items.length;
  var subtotal = 0;
  for(var i = 0; i < lengthArr; i++) {
    subtotal += items[i].price * items[i].inventory;
  }
  return items[0].currency + " " + formatNum(subtotal);
}

const loadImage = (item: Object) => {
  return require(`../../../static/${item.department.toLowerCase()}/${item.typeOfCollection.toLowerCase()}/${item.links[0]}`)
}

export const ShoppingBagComponent = ({
  i18n, t, shoppingBag, removeItemFromGuestShoppingBag,
  changeSizeInGuestShoppingBag, changeQtyInGuestShoppingBag, products, route,
  userShoppingBag, userID,
  removeItemFromShoppingBag, changeSizeInShoppingBag, changeQtyInShoppingBag,
}: Props) => (
  <Container
    className="mb-2 flex-grow-1"
    fluid>
    <Row className="mt-2 mb-4 py-2 row d-flex flex-row justify-content-center" id="shoppingbag-title-row">
      <div
        id={
          i18n.translator.language === "ar" ?
          "shoppingbag-title-ar" :
          "shoppingbag-title"
        }>
        {t('SHOPPING BAG')}
      </div>
    </Row>
    {
      userID !== undefined ?
      (
        Object.keys(userShoppingBag).length !== 0 ?
        <Row className="flex-grow-1">
          {
            typeof checkItemsForZeroQty(userShoppingBag) !== 'undefined' &&
            checkItemsForZeroQty(userShoppingBag).length > 0 &&
            checkItemsForZeroQty(userShoppingBag) !== '' &&
            userShoppingBag.map((addedItem, index) =>
            <Col xs={12} key={index}>
              {
                addedItem.size.map((size, sizeIndex) =>
                <Row key={sizeIndex} className="mb-4">
                  <Col md={2} lg={3} className="d-none d-md-flex"></Col>
                  <Col xs={12} md={8} lg={6}>
                    <Row>
                      <Col lg={5} className="d-flex flex-column align-items-center">
                        <Image
                          id="item-image"
                          src={loadImage(addedItem)}
                          alt="Fashion"
                          width="200"
                          height="260"
                        />
                      </Col>
                      <Col lg={7} className="d-flex flex-column pl-5 pl-sm-0">
                        <div
                          className="d-flex flex-row align-items-start"
                          id={
                            i18n.translator.language === "ar" ?
                            "shoppingbag-item-name-ar" :
                            "shoppingbag-item-name"
                          }>
                          <p
                            className={
                              i18n.translator.language === "ar" ?
                              "flex-grow-1 text-right" : "flex-grow-1"
                            }>
                            <Trans>{addedItem.name}</Trans>
                          </p>
                          <Image
                              id="close-img"
                              src={closeSign}
                              alt=""
                              width="24"
                              height="24"
                              onClick={() => removeItemFromShoppingBag({
                                itemID: addedItem.id,
                                size: size.number,
                                userID: userID
                              })}
                           />
                        </div>
                        <div
                          id={
                            i18n.translator.language === "ar" ?
                            "shoppingbag-item-size-ar" :
                            "shoppingbag-item-size"
                          }
                          className={
                            i18n.translator.language === "ar" ?
                            "text-right" : ""
                          }>
                          {t('itemSize', {itemSize: size.number})}
                        </div>
                        <ListGroup id="available-sizes" horizontal>
                          {checkItemSizes(products, addedItem.id, size.number).map((itemSize, index) =>
                            <ListGroup.Item
                              className={
                                i18n.translator.language === "ar" ?
                                "pt-1 pr-0" : "pt-0 pl-0"
                              }
                              id={"item-size-" + itemSize.number}
                              key={index}
                              onClick={() => changeSizeInShoppingBag({
                                itemID: addedItem.id,
                                sizeToAdd: itemSize.number,
                                sizeToRemove: size.number,
                                qty: size.quantity,
                                userID: userID
                              })}
                            >{itemSize.number}</ListGroup.Item>
                          )}
                        </ListGroup>
                        <div
                          id={
                            i18n.translator.language === "ar" ?
                            "shoppingbag-item-color-ar" :
                            "shoppingbag-item-color"
                          }
                          className={
                            i18n.translator.language === "ar" ?
                            "text-right my-2" : "my-2"
                          }>
                          {t('itemColor')}
                          <Trans>{addedItem.color.color}</Trans>
                        </div>
                        <ListGroup
                          id={
                            i18n.translator.language === "ar" ?
                            "shoppingbag-item-qty-ar" :
                            "shoppingbag-item-qty"
                          }
                          className={
                            i18n.translator.language === "ar" ?
                            "text-right" : ""
                          }
                          horizontal>
                          <ListGroup.Item className={
                              i18n.translator.language === "ar" ?
                              "pt-0 pr-0" : "pt-0 pl-0"
                            }>
                            {t('itemQty', {itemQty: size.quantity})}
                          </ListGroup.Item>
                          <ListGroup.Item className={
                              i18n.translator.language === "ar" ?
                              "pt-0 pr-0 pl-2" : "pt-0 pl-0 pr-2"
                            }>
                            <Image
                              id="increase-item-qty"
                              src={plusSign}
                              alt=""
                              width="24"
                              height="24"
                              onClick={() => changeQtyInShoppingBag({
                                itemID: addedItem.id,
                                size: size.number,
                                qtyToAdd: 1,
                                userID: userID
                              })}
                             />
                          </ListGroup.Item>
                          <ListGroup.Item className={
                              i18n.translator.language === "ar" ?
                              "pt-0 pr-0" : "pt-0 pl-0"
                            }>
                            <Image
                              className="mt-2"
                              id="decrease-item-qty"
                              src={substract}
                              alt=""
                              width="24"
                              height="24"
                              onClick={() => changeQtyInShoppingBag({
                                itemID: addedItem.id,
                                size: size.number,
                                qtyToAdd: -1,
                                userID: userID
                              })}
                             />
                          </ListGroup.Item>
                        </ListGroup>
                        <div
                          id={
                            i18n.translator.language === "ar" ?
                            "shoppingbag-item-price-ar" :
                            "shoppingbag-item-price"
                          }
                          className={
                            i18n.translator.language === "ar" ?
                            "text-right mt-3" : "mt-3"
                          }
                          dir="ltr">
                          {addedItem.currency + " " + formatNum(addedItem.price)}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={2} lg={3} className="d-none d-md-flex"></Col>
                </Row>
              )}
            </Col>
          )}
        </Row>
          :
        <Row
          className="mt-5 pt-5 d-flex flex-column justify-content-center"
          id={
            i18n.translator.language === "ar" ?
            "shoppingbag-empty-ar" : "shoppingbag-empty"
          }>
          <div className="align-self-center text-center">
            <p>
              {t('Your Shopping Bag is empty')}
            </p>
            <Button
              className="mt-1"
              id={
                i18n.translator.language === "ar" ?
                "shoppingbag-empty-btn-ar" : "shoppingbag-empty-btn"
              }
              type="button"
              onClick={() => route(config.route.fashion.newIn)}>
              {t('BACK TO SHOPPING')}
            </Button>
          </div>
        </Row>
      )
      :
      (
        Object.keys(shoppingBag).length !== 0 ?
        <Row className="flex-grow-1">
          {
            typeof checkItemsForZeroQty(shoppingBag.addedItems) !== 'undefined' &&
            checkItemsForZeroQty(shoppingBag.addedItems).length > 0 &&
            checkItemsForZeroQty(shoppingBag.addedItems) !== '' &&
            shoppingBag.addedItems.map((addedItem, index) =>
            <Col xs={12} key={index}>
              {
                addedItem.size.map((size, sizeIndex) =>
                <Row key={sizeIndex} className="mb-4">
                  <Col md={2} lg={3} className="d-none d-md-flex"></Col>
                  <Col xs={12} md={8} lg={6}>
                    <Row>
                      <Col xs={5} className="d-flex flex-column align-items-center">
                        <Image
                          id="shoppingbag-item-image"
                          src={loadImage(addedItem)}
                          alt="Fashion"
                          width="200"
                          height="260"
                        />
                      </Col>
                      <Col xs={7} className="d-flex flex-column pl-5 pl-sm-0">
                        <div
                          className="d-flex flex-row align-items-start"
                          id={
                            i18n.translator.language === "ar" ?
                            "shoppingbag-item-name-ar" :
                            "shoppingbag-item-name"
                          }>
                          <p className={
                              i18n.translator.language === "ar" ?
                              "flex-grow-1 text-right" : "flex-grow-1"
                            }>
                            <Trans>{addedItem.name}</Trans>
                          </p>
                          <Image
                              id="close-img"
                              src={closeSign}
                              alt=""
                              width="24"
                              height="24"
                              onClick={() => removeItemFromGuestShoppingBag({
                                itemID: addedItem.id,
                                size: size.number,
                                shoppingBag: shoppingBag
                              })}
                           />
                        </div>
                        <div
                          id={
                            i18n.translator.language === "ar" ?
                            "shoppingbag-item-size-ar" :
                            "shoppingbag-item-size"
                          }
                          className={
                            i18n.translator.language === "ar" ?
                            "text-right" : ""
                          }>
                          {t('itemSize', {itemSize: size.number})}
                        </div>
                        <ListGroup id="available-sizes" horizontal>
                          {checkItemSizes(products, addedItem.id, size.number).map((itemSize, index) =>
                            <ListGroup.Item
                              className={
                                i18n.translator.language === "ar" ?
                                "pt-1 pr-0" : "pt-0 pl-0"
                              }
                              id={"item-size-" + itemSize.number}
                              key={index}
                              onClick={() => changeSizeInGuestShoppingBag({
                                itemID: addedItem.id,
                                sizeToAdd: itemSize.number,
                                sizeToRemove: size.number,
                                qty: size.quantity,
                                shoppingBag: shoppingBag
                              })}
                            >{itemSize.number}</ListGroup.Item>
                          )}
                        </ListGroup>
                        <div
                          id={
                            i18n.translator.language === "ar" ?
                            "shoppingbag-item-color-ar" :
                            "shoppingbag-item-color"
                          }
                          className={
                            i18n.translator.language === "ar" ?
                            "text-right my-2" : "my-2"
                          }>
                          {t('itemColor')}
                          <Trans>{addedItem.color.color}</Trans>
                        </div>
                        <ListGroup
                          id={
                            i18n.translator.language === "ar" ?
                            "shoppingbag-item-qty-ar" :
                            "shoppingbag-item-qty"
                          }
                          className={
                            i18n.translator.language === "ar" ?
                            "text-right" : ""
                          }
                          horizontal>
                          <ListGroup.Item className={
                              i18n.translator.language === "ar" ?
                              "pt-0 pr-0" : "pt-0 pl-0"
                            }>
                            {t('itemQty', {itemQty: size.quantity})}
                          </ListGroup.Item>
                          <ListGroup.Item className={
                              i18n.translator.language === "ar" ?
                              "pt-0 pr-0 pl-2" : "pt-0 pl-0 pr-2"
                            }>
                            <Image
                              id="increase-item-qty"
                              src={plusSign}
                              alt=""
                              width="24"
                              height="24"
                              onClick={() => changeQtyInGuestShoppingBag({
                                itemID: addedItem.id,
                                size: size.number,
                                qtyToAdd: 1,
                                shoppingBag: shoppingBag
                              })}
                             />
                          </ListGroup.Item>
                          <ListGroup.Item className={
                              i18n.translator.language === "ar" ?
                              "pt-0 pr-0" : "pt-0 pl-0"
                            }>
                            <Image
                              className="mt-2"
                              id="decrease-item-qty"
                              src={substract}
                              alt=""
                              width="24"
                              height="24"
                              onClick={() => changeQtyInGuestShoppingBag({
                                itemID: addedItem.id,
                                size: size.number,
                                qtyToAdd: -1,
                                shoppingBag: shoppingBag
                              })}
                             />
                          </ListGroup.Item>
                       </ListGroup>
                        <div
                          id={
                            i18n.translator.language === "ar" ?
                            "shoppingbag-item-price-ar" :
                            "shoppingbag-item-price"
                          }
                          className={
                            i18n.translator.language === "ar" ?
                            "text-right mt-3" : "mt-3"
                          }
                          dir="ltr">
                          {addedItem.currency + " " + formatNum(addedItem.price)}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={2} lg={3} className="d-none d-md-flex"></Col>
                </Row>
              )}
            </Col>
          )}
        </Row>
          :
        <Row
          className="mt-5 pt-5 d-flex flex-column justify-content-center"
          id={
            i18n.translator.language === "ar" ?
            "shoppingbag-empty-ar" : "shoppingbag-empty"
          }>
          <div className="align-self-center text-center">
            <p>
              {t('Your Shopping Bag is empty')}
            </p>
            <Button
              className="mt-1"
              id={
                i18n.translator.language === "ar" ?
                "shoppingbag-empty-btn-ar" : "shoppingbag-empty-btn"
              }
              type="button"
              onClick={() => route(config.route.fashion.newIn)}>
              {t('BACK TO SHOPPING')}
            </Button>
          </div>
        </Row>
      )
    }
    {
      userID !== undefined ?
      (
        Object.keys(userShoppingBag).length !== 0 &&
        <Row id="shoppingbag-summary" className="">
          <Col md={2} lg={3} className="d-none d-md-flex"></Col>
          <Col xs={12} md={8} lg={6}
            className={
              i18n.translator.language === "ar" ?
              "pr-0 pr-sm-3 pr-xl-4" : "pl-0 pl-sm-3 pl-xl-4"
            }>
            <p
              className="text-center"
              id={
                i18n.translator.language === "ar" ?
                "order-summary-title-ar" :
                "order-summary-title"
              }>
              <Trans>ORDER SUMMARY</Trans>
            </p>
            <Row
              id={
                i18n.translator.language === "ar" ?
                "shoppingbag-subtotal-ar" : "shoppingbag-subtotal"
              }
              className={
                i18n.translator.language === "ar" ?
                "pr-0 pr-sm-1 pr-xl-2" : "pl-0 pl-sm-1 pl-xl-2"
              }>
              <Col xs={6} className={i18n.translator.language === "ar" ? "text-right" : ""}>
                <p>{t('SUBTOTAL')}</p>
              </Col>
              <Col xs={6} className="d-flex flex-row justify-content-end">
                <p dir="ltr">{checkTotal(userShoppingBag)}</p>
              </Col>
            </Row>
            <Row
              id={
                i18n.translator.language === "ar" ?
                "shoppingbag-shippingexpr-ar" : "shoppingbag-shippingexpr"
              }
              className={
                i18n.translator.language === "ar" ?
                "pr-0 pr-sm-1 pr-xl-2" : "pl-0 pl-sm-1 pl-xl-2"
              }>
              <Col xs={6} className={i18n.translator.language === "ar" ? "text-right" : ""}>
                <p>{t('ShippingExpress')}</p>
              </Col>
              <Col xs={6} className="d-flex flex-row justify-content-end">
                <p>{t('Complimentary')}</p>
              </Col>
            </Row>
            <Row
              id={
                i18n.translator.language === "ar" ?
                "shoppingbag-total-ar" : "shoppingbag-total"
              }
              className={
                i18n.translator.language === "ar" ?
                "pr-0 pr-sm-1 pr-xl-2" : "pl-0 pl-sm-1 pl-xl-2"
              }>
              <Col xs={6} className={i18n.translator.language === "ar" ? "text-right" : ""}>
                <p>{t('ESTIMATED TOTAL')}</p>
              </Col>
              <Col xs={6} className="d-flex flex-row justify-content-end">
                <p dir="ltr">{checkTotal(userShoppingBag)}</p>
              </Col>
            </Row>
            <div className="d-flex flex-row justify-content-center">
              <Button
                id={
                  i18n.translator.language === "ar" ?
                  "proceed-to-checkout-btn-ar" : "proceed-to-checkout-btn"
                }
                onClick={() => route(config.route.account.checkout)}>
                <Trans>CHECKOUT</Trans>
              </Button>
            </div>
            {
              i18n.translator.language === "ar" ?
              <ListGroup
                id="shoppingbag-help-info-ar"
                className="mt-5 text-right">
                <ListGroup.Item className="pr-2 pb-1">
                  {t('help')}
                </ListGroup.Item>
                <ListGroup.Item className="pr-2 pt-0">
                  <Link to="mailto:vittoriaorzini@gmail.com">{t('Email Us')}</Link>
                </ListGroup.Item>
                <ListGroup.Item className="pr-2 pt-1">
                  {t('sendMsg2')}
                </ListGroup.Item>
              </ListGroup>
              :
              <ListGroup
                id="shoppingbag-help-info"
                className="mt-5">
                <ListGroup.Item className="pl-2 pb-1">
                  {t('help')}
                </ListGroup.Item>
                <ListGroup.Item className="pl-2 pt-0">
                  <Link to="mailto:vittoriaorzini@gmail.com">{t('Email Us')}</Link>
                </ListGroup.Item>
                <ListGroup.Item className="pl-2 pt-1">
                  {t('sendMsg2')}
                </ListGroup.Item>
              </ListGroup>
            }
            {
              i18n.translator.language === "ar" ?
              <ListGroup
                id="shoppingbag-cards-info-ar"
                className="mt-3 text-right">
                <ListGroup.Item className="pr-2 pb-1">
                  {t('SECURE PAYMENTS')}
                </ListGroup.Item>
                <ListGroup.Item className="pr-2 pt-0">
                  {t('payBy')}
                </ListGroup.Item>
                <ListGroup.Item className="pr-2 pt-1 pb-0">
                  <div className="d-flex flex-row justify-content-between">
                    <p>{t('creditCard')}</p>
                    <Image
                      id="creditcards-img"
                      src={cardImg}
                      alt="Credit Cards"
                      width="137"
                      height="20"
                     />
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="pr-2 pt-0">
                  {t('ssl')}
                </ListGroup.Item>
              </ListGroup>
              :
              <ListGroup
                id="shoppingbag-cards-info"
                className="mt-3">
                <ListGroup.Item className="pl-2 pb-1">
                  {t('SECURE PAYMENTS')}
                </ListGroup.Item>
                <ListGroup.Item className="pl-2 pt-0">
                  {t('payBy')}
                </ListGroup.Item>
                <ListGroup.Item className="pl-2 pt-1 pb-0">
                  <div className="d-flex flex-row justify-content-between">
                    <p>{t('creditCard')}</p>
                    <Image
                      id="creditcards-img"
                      src={cardImg}
                      alt="Credit Cards"
                      width="137"
                      height="20"
                     />
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="pl-2 pt-0">
                  {t('ssl')}
                </ListGroup.Item>
              </ListGroup>
            }
            {
              i18n.translator.language === "ar" ?
              <ListGroup id="shoppingbag-returns-info-ar" className="mt-1 text-right">
                <ListGroup.Item className="pr-2 pb-0">
                  {t('shipping')}
                </ListGroup.Item>
                <ListGroup.Item className="pr-2 pt-0">
                  <ListGroup className="d-flex flex-row justify-content-between" horizontal>
                    <ListGroup.Item className="pr-0">
                      <div>{t('express')}</div>
                      <div>{t('delivery')}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex flex-column justify-content-center">
                      {t('Complimentary')}
                    </ListGroup.Item>
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
              :
              <ListGroup id="shoppingbag-returns-info" className="mt-1">
                <ListGroup.Item className="pl-2 pb-0">
                  {t('shipping')}
                </ListGroup.Item>
                <ListGroup.Item className="pl-2 pt-0">
                  <ListGroup className="d-flex flex-row justify-content-between" horizontal>
                    <ListGroup.Item className="pl-0">
                      <div>{t('express')}</div>
                      <div>{t('delivery')}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex flex-column justify-content-center">
                      {t('Complimentary')}
                    </ListGroup.Item>
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            }
            <ListGroup
              id={
                i18n.translator.language === "ar" ?
                "shoppingbag-shipping-info-ar" :
                "shoppingbag-shipping-info"
              }>
              <ListGroup.Item className={
                  i18n.translator.language === "ar" ?
                  "pr-2 text-right" : "pl-2"
                }>
                <div>{t('localDuties')}</div>
                <div>{t('shippingtxt1')}</div>
                <div>{t('shippingtxt2')}</div>
                <div className="mt-2">{t('shippingtxt3')}</div>
                <div>{t('shippingtxt4')}</div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={2} lg={3} className="d-none d-md-flex"></Col>
        </Row>
      )
      :
      (
        Object.keys(shoppingBag).length !== 0 &&
        <Row id="shoppingbag-summary" className="mt-5">
          <Col md={2} lg={3} className="d-none d-md-flex"></Col>
          <Col xs={12} md={8} lg={6}
            className={
              i18n.translator.language === "ar" ?
              "pr-0 pr-sm-3 pr-xl-4" : "pl-0 pl-sm-3 pl-xl-4"
            }>
            <p
              className="text-center"
              id={
                i18n.translator.language === "ar" ?
                "order-summary-title-ar" :
                "order-summary-title"
              }>
              <Trans>ORDER SUMMARY</Trans>
            </p>
            <Row
              id={
                i18n.translator.language === "ar" ?
                "shoppingbag-subtotal-ar" : "shoppingbag-subtotal"
              }
              className={
                i18n.translator.language === "ar" ?
                "pr-0 pr-sm-1 pr-xl-2" : "pl-0 pl-sm-1 pl-xl-2"
              }>
              <Col xs={6}
                className={i18n.translator.language === "ar" ? "text-right" : ""}>
                <p>{t('SUBTOTAL')}</p>
              </Col>
              <Col xs={6} className="d-flex flex-row justify-content-end">
                <p>{shoppingBag.total}</p>
              </Col>
            </Row>
            <Row
              id={
                i18n.translator.language === "ar" ?
                "shoppingbag-shippingexpr-ar" : "shoppingbag-shippingexpr"
              }
              className={
                i18n.translator.language === "ar" ?
                "pr-0 pr-sm-1 pr-xl-2" : "pl-0 pl-sm-1 pl-xl-2"
              }>
              <Col xs={6} className={i18n.translator.language === "ar" ? "text-right" : ""}>
                <p>{t('ShippingExpress')}</p>
              </Col>
              <Col xs={6} className="d-flex flex-row justify-content-end">
                <p>{t('Complimentary')}</p>
              </Col>
            </Row>
            <Row
              id={
                i18n.translator.language === "ar" ?
                "shoppingbag-total-ar" : "shoppingbag-total"
              }
              className={
                i18n.translator.language === "ar" ?
                "pr-0 pr-sm-1 pr-xl-2" : "pl-0 pl-sm-1 pl-xl-2"
              }>
              <Col xs={6} className={i18n.translator.language === "ar" ? "text-right" : ""}>
                <p>{t('ESTIMATED TOTAL')}</p>
              </Col>
              <Col xs={6} className="d-flex flex-row justify-content-end">
                <p dir="ltr">{shoppingBag.total}</p>
              </Col>
            </Row>
            <div className="d-flex flex-row justify-content-center">
              <Button
                id={
                  i18n.translator.language === "ar" ?
                  "proceed-to-checkout-btn-ar" : "proceed-to-checkout-btn"
                }
                onClick={() => route(config.route.home.checkout)}>
                <Trans>CHECKOUT</Trans>
              </Button>
            </div>
            {
              i18n.translator.language === "ar" ?
              <ListGroup
                id="shoppingbag-help-info-ar"
                className="mt-5 text-right">
                <ListGroup.Item className="pr-2 pb-1">
                  {t('help')}
                </ListGroup.Item>
                <ListGroup.Item className="pr-2 pt-0">
                  <Link to="mailto:vittoriaorzini@gmail.com">{t('Email Us')}</Link>
                </ListGroup.Item>
                <ListGroup.Item className="pr-2 pt-1">
                  {t('sendMsg2')}
                </ListGroup.Item>
              </ListGroup>
              :
              <ListGroup
                id="shoppingbag-help-info"
                className="mt-5">
                <ListGroup.Item className="pl-2 pb-1">
                  {t('help')}
                </ListGroup.Item>
                <ListGroup.Item className="pl-2 pt-0">
                  <Link to="mailto:vittoriaorzini@gmail.com">{t('Email Us')}</Link>
                </ListGroup.Item>
                <ListGroup.Item className="pl-2 pt-1">
                  {t('sendMsg2')}
                </ListGroup.Item>
              </ListGroup>
            }
            {
              i18n.translator.language === "ar" ?
              <ListGroup
                id="shoppingbag-cards-info-ar"
                className="mt-3 text-right">
                <ListGroup.Item className="pr-2 pb-1">
                  {t('SECURE PAYMENTS')}
                </ListGroup.Item>
                <ListGroup.Item className="pr-2 pt-0">
                  {t('payBy')}
                </ListGroup.Item>
                <ListGroup.Item className="pr-2 pt-1 pb-0">
                  <div className="d-flex flex-row justify-content-between">
                    <p>{t('creditCard')}</p>
                    <Image
                      id="creditcards-img"
                      src={cardImg}
                      alt="Credit Cards"
                      width="137"
                      height="20"
                     />
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="pr-2 pt-0">
                  {t('ssl')}
                </ListGroup.Item>
              </ListGroup>
              :
              <ListGroup
                id="shoppingbag-cards-info"
                className="mt-3">
                <ListGroup.Item className="pl-2 pb-1">
                  {t('SECURE PAYMENTS')}
                </ListGroup.Item>
                <ListGroup.Item className="pl-2 pt-0">
                  {t('payBy')}
                </ListGroup.Item>
                <ListGroup.Item className="pl-2 pt-1 pb-0">
                  <div className="d-flex flex-row justify-content-between">
                    <p>{t('creditCard')}</p>
                    <Image
                      id="creditcards-img"
                      src={cardImg}
                      alt="Credit Cards"
                      width="137"
                      height="20"
                     />
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="pl-2 pt-0">
                  {t('ssl')}
                </ListGroup.Item>
              </ListGroup>
            }
            {
              i18n.translator.language === "ar" ?
              <ListGroup id="shoppingbag-returns-info-ar" className="mt-1 text-right">
                <ListGroup.Item className="pr-2 pb-0">
                  {t('shipping')}
                </ListGroup.Item>
                <ListGroup.Item className="pr-2 pt-0">
                  <ListGroup className="d-flex flex-row justify-content-between" horizontal>
                    <ListGroup.Item className="pr-0">
                      <div>{t('express')}</div>
                      <div>{t('delivery')}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex flex-column justify-content-center">
                      {t('Complimentary')}
                    </ListGroup.Item>
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
              :
              <ListGroup id="shoppingbag-returns-info" className="mt-1">
                <ListGroup.Item className="pl-2 pb-0">
                  {t('shipping')}
                </ListGroup.Item>
                <ListGroup.Item className="pl-2 pt-0">
                  <ListGroup className="d-flex flex-row justify-content-between" horizontal>
                    <ListGroup.Item className="pl-0">
                      <div>{t('express')}</div>
                      <div>{t('delivery')}</div>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex flex-column justify-content-center">
                      {t('Complimentary')}
                    </ListGroup.Item>
                  </ListGroup>
                </ListGroup.Item>
              </ListGroup>
            }
            <ListGroup id={
                i18n.translator.language === "ar" ?
                "shoppingbag-shipping-info-ar" :
                "shoppingbag-shipping-info"
              }>
              <ListGroup.Item className={
                  i18n.translator.language === "ar" ?
                  "pr-2 text-right" : "pl-2"
                }>
                <div>{t('localDuties')}</div>
                <div>{t('shippingtxt1')}</div>
                <div>{t('shippingtxt2')}</div>
                <div className="mt-2">{t('shippingtxt3')}</div>
                <div>{t('shippingtxt4')}</div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={2} lg={3} className="d-none d-md-flex"></Col>
        </Row>
      )
    }
  </Container>
);

export default withTranslation()(ShoppingBagComponent);
