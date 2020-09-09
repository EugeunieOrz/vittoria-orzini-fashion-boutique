// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import config from 'config/index';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { formatNum } from 'util/ProductFunctions';
import './WishList.scss';

import closeSign from '../../../../../static/icons/close.svg';

type Props = {
  i18n: Object,
  t: Object,
  userID: string,
  route: (string) => any,
  wishlist: Array,
  addWItemToBag: (product: Object, size: string, quantity: number, userID: string) => any,
  removeItemFromWishlist: (product: Object, category: string, size: string, userID: string) => any,
  notifications: Array,
  setLastItemAlert: (
    lastItemAlert: boolean,
    productID: string,
    received: boolean,
    received2: boolean,
    size: string,
    stateOfProduct: string,
    userID: string
  ) => any,
}

export const loadImage = (item: Object) => {
  return require(`../../../../../static/${item.department.toLowerCase()}/${item.typeOfCollection.toLowerCase()}/${item.links[0]}`)
}

const updatedWishlist = (wlist: Array, notifs: Array) => {
  var i;
  for(i = 0; i < wlist.length; i++) {
    var j;
    for(j = 0; j < notifs.length; j++) {
      if(wlist[i].id === notifs[j].productID) {
        const sz = wlist[i].size.find(s => s.number === notifs[j].size);
        if(sz) {
          sz.lastItemAlert = notifs[j].lastItemAlert;
          sz.received = notifs[j].received;
          sz.received2 = notifs[j].received2;
          sz.availability = notifs[j].stateOfProduct;
        }
      }
    }
  }
  return wlist;
}

export const WishListComponent = ({
  i18n, t, userID, route, wishlist,
  removeItemFromWishlist, addWItemToBag,
  notifications, setLastItemAlert
}: Props) => (
  <Row className="mt-5 mb-4 d-flex flex-column align-items-center">
    <p
      id={
        i18n.translator.language === "ar" ?
        "wishlist-header-ar" : "wishlist-header"
      }
      className="text-center">
      <Trans>Wish List</Trans>
    </p>
    <p
      id={
        i18n.translator.language === "ar" ?
        "wishlist-msg-ar" : "wishlist-msg"
      }
      className="pb-4 text-center">
      {t('wishlistMsg')}
    </p>
    {
      typeof wishlist !== 'undefined' && wishlist.length > 0 && wishlist !== '' ?
      (
        typeof notifications !== 'undefined' && notifications.length > 0 && notifications !== '' ?
        updatedWishlist(wishlist, notifications).map((item, index) =>
          <Row id="wishlist-content" className="w-100" key={index}>
            <Col md={2} lg={3} className="d-none d-md-flex"></Col>
            <Col md={8} lg={6}>
              {
                item.size.map((size, sizeIndex) =>
                <Container className="mb-5 mx-0" key={sizeIndex}>
                  <Row className="mb-2" id="wishlist-item">
                    <Col xs={3}
                      className="d-flex justify-content-center"
                      id="wishlist-item-img">
                      <Image
                        src={loadImage(item)}
                        alt="Fashion"
                        width="140"
                        height="180"
                      />
                    </Col>
                    <Col xs={9}
                      id="wishlist-item-attr"
                      className={
                        i18n.translator.language === "ar" ?
                        "pr-5" : "pl-5"
                      }>
                      <div className="d-flex flex-row" id="item-name">
                        <p
                          className={
                            i18n.translator.language === "ar" ?
                            "mb-1 mb-lg-2 text-right flex-grow-1" :
                            "mb-1 mb-lg-2 flex-grow-1"
                          }>
                          {item.name}
                        </p>
                        <Image
                          src={closeSign}
                          alt=""
                          height="24"
                          width="24"
                          id="remove-item-btn"
                          onClick={() => removeItemFromWishlist({
                            product: item,
                            category: item.category,
                            size: size.number,
                            userID: userID
                          })}
                        />
                      </div>
                      <div
                        className={
                          i18n.translator.language === "ar" ?
                          "mt-0 mt-lg-1 text-right d-flex flex-column" :
                          "mt-0 mt-lg-1 d-flex flex-column"
                        }
                        id={
                          i18n.translator.language === "ar" ?
                          "item-attributes-ar" : "item-attributes"
                        }>
                        <p className="mb-0 mb-lg-1" id="item-qty">
                          {t('itemQty', {itemQty: size.quantity})}
                        </p>
                        <p className="mb-0 mb-lg-1" id="item-size">
                          {t('itemSize', {itemSize: size.number})}
                        </p>
                        <p id="item-color">
                          {t('itemColor')}
                          <Trans>{item.color.color}</Trans>
                        </p>
                      </div>
                      <div className="mt-0 mt-lg-1 d-flex flex-row">
                        <p id={
                            i18n.translator.language === "ar" ?
                            "item-price-ar" : "item-price"
                          }
                          dir="ltr">
                          {item.currency + " " + formatNum(item.price)}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col xs={12} lg={6}
                      className={
                        i18n.translator.language === "ar" ?
                        "pr-0" : ""
                      }>
                      {
                        size.lastItemAlert ?
                        <div className="d-flex flex-row">
                          <div
                            className={
                              i18n.translator.language === "ar" ?
                              "pl-2" : "pr-2"
                            }
                            id={
                              i18n.translator.language === "ar" ?
                              "lastItemAlert-on-btn-ar" :
                              "lastItemAlert-on-btn"
                            }
                            onClick={
                              size.stateOfProduct !== undefined ?
                              () => setLastItemAlert({
                                lastItemAlert: false,
                                productID: item.id,
                                received: false,
                                received2: false,
                                size: size.number,
                                stateOfProduct: size.stateOfProduct,
                                category: item.category,
                                userID: userID
                              }) :
                              () => setLastItemAlert({
                                lastItemAlert: false,
                                productID: item.id,
                                received: false,
                                received2: false,
                                size: size.number,
                                stateOfProduct: "",
                                category: item.category,
                                userID: userID
                              })
                            }>
                            <Trans>ON</Trans>
                          </div>
                          <label
                            id={
                              i18n.translator.language === "ar" ?
                              "lastItemAlert-on-ar" :
                              "lastItemAlert-on"
                            }
                            htmlFor="lastItemAlert-on-btn">
                            <Trans>Last Item</Trans>
                          </label>
                        </div>
                        :
                        <div className="d-flex flex-row">
                          <div
                            className={
                              i18n.translator.language === "ar" ?
                              "pl-2" : "pr-2"
                            }
                            id={
                              i18n.translator.language === "ar" ?
                              "lastItemAlert-off-btn-ar" :
                              "lastItemAlert-off-btn"
                            }
                            onClick={
                              size.stateOfProduct !== undefined ?
                              () => setLastItemAlert({
                                lastItemAlert: true,
                                productID: item.id,
                                received: false,
                                received2: false,
                                size: size.number,
                                stateOfProduct: size.stateOfProduct,
                                category: item.category,
                                userID: userID
                              }) :
                              () => setLastItemAlert({
                                lastItemAlert: true,
                                productID: item.id,
                                received: false,
                                received2: false,
                                size: size.number,
                                stateOfProduct: "",
                                category: item.category,
                                userID: userID
                              })
                            }>
                            <Trans>OFF</Trans>
                          </div>
                          <label
                            id={
                              i18n.translator.language === "ar" ?
                              "lastItemAlert-off-ar" :
                              "lastItemAlert-off"
                            }
                            htmlFor="lastItemAlert-off-btn">
                            <Trans>Last Item</Trans>
                          </label>
                        </div>
                      }
                    </Col>
                    <Col xs={12} lg={6}>
                      <Button
                        id={
                          i18n.translator.language === "ar" ?
                          "add-witem-to-bag-btn-ar" :
                          "add-witem-to-bag-btn"
                        }
                        onClick={() => addWItemToBag({
                          product: item,
                          size: size.number,
                          quantity: 1,
                          userID: userID
                        })}>
                        <Trans>ADD TO SHOPPING BAG</Trans>
                      </Button>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    {
                      size.availability === 'Last Item' &&
                      <p id={
                          i18n.translator.language === "ar" ?
                          "lastItem-msg-ar" : "lastItem-msg"
                        }>{t('lastItemAlert2')}</p>
                    }
                    {
                      size.availability === 'Item is sold out' &&
                      <p id={
                          i18n.translator.language === "ar" ?
                          "itemOutOfStock-msg-ar" : "itemOutOfStock-msg"
                        }>{t('itemOutOfStockAlert2')}</p>
                    }
                  </Row>
                </Container>
                )
              }
            </Col>
            <Col md={2} lg={3} className="d-none d-md-flex"></Col>
          </Row>
        )
        :
        wishlist.map((item, index) =>
          <Row id="wishlist-content" className="w-100" key={index}>
            <Col md={2} lg={3} className="d-none d-md-flex"></Col>
            <Col md={8} lg={6}>
              {
                item.size.map((size, sizeIndex) =>
                <Container className="mb-5 mx-0" key={sizeIndex}>
                  <Row className="mb-2" id="wishlist-item">
                    <Col xs={3}
                      className="d-flex justify-content-center"
                      id="wishlist-item-img">
                      <Image
                        src={loadImage(item)}
                        alt="Fashion"
                        width="140"
                        height="180"
                      />
                    </Col>
                    <Col xs={9}
                      id="wishlist-item-attr"
                      className={
                        i18n.translator.language === "ar" ?
                        "pr-5" : "pl-5"
                      }>
                      <div className="d-flex flex-row" id="item-name">
                        <p className="mb-1 mb-lg-2 flex-grow-1">{item.name}</p>
                        <Image
                            src={closeSign}
                            alt=""
                            height="24"
                            width="24"
                            id="remove-item-btn"
                            onClick={() => removeItemFromWishlist({
                              product: item,
                              category: item.category,
                              size: size.number,
                              userID: userID
                            })}
                            />
                      </div>
                      <div
                        className="mt-0 mt-lg-1 d-flex flex-column"
                        id={
                          i18n.translator.language === "ar" ?
                          "item-attributes-ar" : "item-attributes"
                        }>
                        <p className="mb-0 mb-lg-1" id="item-qty">
                          {t('itemQty', {itemQty: size.quantity})}
                        </p>
                        <p className="mb-0 mb-lg-1" id="item-size">
                          {t('itemSize', {itemSize: size.number})}
                        </p>
                        <p id="item-color">
                          {t('itemColor')}
                          <Trans>{item.color.color}</Trans>
                        </p>
                      </div>
                      <div className="mt-0 mt-lg-1 d-flex flex-row">
                        <p id={
                            i18n.translator.language === "ar" ?
                            "item-price-ar" : "item-price"
                          }
                          dir="ltr">
                          {item.currency + " " + formatNum(item.price)}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row className="mt-1">
                    <Col xs={12} lg={6}>
                      {
                        size.lastItemAlert ?
                        <div className="d-flex flex-row">
                          <div
                            className={
                              i18n.translator.language === "ar" ?
                              "pl-2" : "pr-2"
                            }
                            id={
                              i18n.translator.language === "ar" ?
                              "lastItemAlert-on-btn-ar" :
                              "lastItemAlert-on-btn"
                            }
                            onClick={
                              size.stateOfProduct !== undefined ?
                              () => setLastItemAlert({
                                lastItemAlert: false,
                                productID: item.id,
                                received: false,
                                received2: false,
                                size: size.number,
                                stateOfProduct: size.stateOfProduct,
                                category: item.category,
                                userID: userID
                              }) :
                              () => setLastItemAlert({
                                lastItemAlert: false,
                                productID: item.id,
                                received: false,
                                received2: false,
                                size: size.number,
                                stateOfProduct: "",
                                category: item.category,
                                userID: userID
                              })
                            }>
                            ON
                          </div>
                          <label
                            id={
                              i18n.translator.language === "ar" ?
                              "lastItemAlert-on-ar" :
                              "lastItemAlert-on"
                            }
                            htmlFor="lastItemAlert-on-btn">
                            Last Item
                          </label>
                        </div>
                        :
                        <div className="d-flex flex-row">
                          <div
                            className={
                              i18n.translator.language === "ar" ?
                              "pl-2" : "pr-2"
                            }
                            id={
                              i18n.translator.language === "ar" ?
                              "lastItemAlert-off-btn-ar" :
                              "lastItemAlert-off-btn"
                            }
                            onClick={
                              size.stateOfProduct !== undefined ?
                              () => setLastItemAlert({
                                lastItemAlert: true,
                                productID: item.id,
                                received: false,
                                received2: false,
                                size: size.number,
                                stateOfProduct: size.stateOfProduct,
                                category: item.category,
                                userID: userID
                              }) :
                              () => setLastItemAlert({
                                lastItemAlert: true,
                                productID: item.id,
                                received: false,
                                received2: false,
                                size: size.number,
                                stateOfProduct: "",
                                category: item.category,
                                userID: userID
                              })
                            }>
                            OFF
                          </div>
                          <label
                            id={
                              i18n.translator.language === "ar" ?
                              "lastItemAlert-off-ar" :
                              "lastItemAlert-off"
                            }
                            htmlFor="lastItemAlert-off-btn">
                            Last Item
                          </label>
                        </div>
                      }
                    </Col>
                    <Col xs={12} lg={6}>
                      <Button
                        id={
                          i18n.translator.language === "ar" ?
                          "add-witem-to-bag-btn-ar" :
                          "add-witem-to-bag-btn"
                        }
                        onClick={() => addWItemToBag({
                          product: item,
                          size: size.number,
                          quantity: 1,
                          userID: userID
                        })}>
                        <Trans>ADD TO SHOPPING BAG</Trans>
                      </Button>
                    </Col>
                  </Row>
                  <Row className="mt-2">
                    {
                      size.availability === 'Last Item' &&
                      <p id={
                          i18n.translator.language === "ar" ?
                          "lastItem-msg-ar" : "lastItem-msg"
                        }>
                        {t('lastItemAlert2')}
                      </p>
                    }
                    {
                      size.availability === 'Item is sold out' &&
                      <p id={
                          i18n.translator.language === "ar" ?
                          "itemOutOfStock-msg-ar" : "itemOutOfStock-msg"
                        }>
                        {t('itemOutOfStockAlert2')}
                      </p>
                    }
                  </Row>
                </Container>
                )
              }
            </Col>
            <Col md={2} lg={3} className="d-none d-md-flex"></Col>
          </Row>
        )
      )
      :
      <p
        id={
          i18n.translator.language === "ar" ?
          "witems-not-saved-msg-ar" :
          "witems-not-saved-msg"
        }
        className="my-3 text-center">
        {t('wlistItemsNotSaved')}
      </p>
    }
   <Button
     className="mt-3 align-self-center"
     id={
       i18n.translator.language === "ar" ?
       "continue-shopping-w-btn-ar" :
       "continue-shopping-w-btn"
     }
     onClick={() => route(config.route.index)}
     >
     {t('CONTINUE SHOPPING')}
   </Button>
  </Row>
);

export default withTranslation()(WishListComponent);
