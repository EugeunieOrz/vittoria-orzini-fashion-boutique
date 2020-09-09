// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import { checkTotal, formatNum } from 'util/ProductFunctions';
import './MiniShoppingBag.scss';


/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  i18n: Object,
  t: Object,
  addedItems: Array,
  removeItemFromShoppingBag: (
    itemID: string,
    size: string,
    category: string,
    userID: string
  ) => any,
  removeItemFromGuestBag: (
    itemID: string,
    size: string,
    category: string,
    shoppingBag: Object
  ) => any,
  toggleMiniBag: () => any,
  shoppingBag: Object,
  proceedToCheckout: (userID: string) => any,
  proceedToShoppingBag: (userID: string) => any,
  userID: string,
}

export const loadImage = (item: Object) => {
  return require(`../../../static/${item.department.toLowerCase()}/${item.typeOfCollection.toLowerCase()}/${item.links[0]}`)
}

export const MiniShoppingBagComponent = ({
  i18n, t, removeItemFromGuestBag, toggleMiniBag, shoppingBag,
  addedItems, userID, removeItemFromShoppingBag,
  proceedToShoppingBag, proceedToCheckout,
}: Props) => (
  <Container
    id={
      i18n.translator.language === "ar" ?
      "minishoppingbag-container-ar" :
      "minishoppingbag-container"
    }
    fluid>
    <Row className="px-1 px-md-3 px-lg-0">
      <Col className="d-none d-sm-flex" xs={12} sm={4} md={5} lg={6} xl={8}></Col>
      <Col xs={12} sm={8} md={7} lg={6} xl={4}>
        <Row className="d-flex flex-row my-1" id="minishoppingbag-header">
          <div
            className={
              i18n.translator.language === "ar" ?
              "text-right flex-grow-1 mt-2 pb-1" :
              "flex-grow-1 mt-2 pb-1"
            }
            id={
              i18n.translator.language === "ar" ?
              "minishoppingbag-title-ar" :
              "minishoppingbag-title"
            }>
            {t('MINI SHOPPING BAG')}
          </div>
          <div className="mb-2" id="close-btn" onClick={() => toggleMiniBag()}></div>
        </Row>
        {
          userID ?
          (
            <div>
              {
                typeof addedItems !== 'undefined' && addedItems.length > 0 && addedItems !== '' &&
                addedItems.map((item, index) =>
                <Row className="mt-3" id="minibag-details" key={index}>
                  {
                    item.size.map((size, sizeIndex) =>
                    <Row className="mb-4 w-100" id="minibag-item" key={sizeIndex}>
                      <Col xs={6} sm={5} lg={4}
                        className="d-flex justify-content-center"
                        id="minibag-item-img">
                        <Image
                          src={loadImage(item)}
                          alt="Fashion"
                          width="120"
                          height="160"
                        />
                      </Col>
                      <Col xs={6} sm={7} lg={8}
                        id="minibag-item-attr"
                        className={
                          i18n.translator.language === "ar" ?
                          "text-right pr-0 pr-lg-4" : "pl-0 pl-lg-4"
                        }>
                        <div className="d-flex flex-row" id="item-name">
                          <p className="mb-1 mb-lg-2 flex-grow-1">{item.name}</p>
                          <div
                            id="remove-item-btn"
                            onClick={() => removeItemFromShoppingBag({
                              itemID: item.id,
                              size: size.number,
                              category: item.category,
                              userID: userID
                            })}></div>
                        </div>
                        <div
                          className="mt-0 mt-lg-1 d-flex flex-column"
                          id={
                            i18n.translator.language === "ar" ?
                            "item-attributes-ar" :
                            "item-attributes"
                          }>
                          <p className="mb-0 mb-lg-1">
                            {t('itemQty', {itemQty: size.quantity})}
                          </p>
                          <p className="mb-0 mb-lg-1">
                            {t('itemSize', {itemSize: size.number})}
                          </p>
                          <p>
                            {t('itemColor')}
                            <Trans>{item.color.color}</Trans>
                          </p>
                        </div>
                        <div
                          className="mt-0 mt-lg-1 d-flex flex-row"
                          id={
                              i18n.translator.language === "ar" ?
                              "mt-0 mt-lg-1 d-flex flex-row item-price-ar" :
                              "mt-0 mt-lg-1 d-flex flex-row item-price"
                            }>
                          <p id="item-price" dir="ltr">
                            {item.currency + " " + formatNum(item.price)}
                          </p>
                        </div>
                      </Col>
                    </Row>
                    )
                  }
                </Row>
                )
              }
              {
                typeof addedItems !== 'undefined' && addedItems.length > 0 && addedItems !== '' ?
                <div className="mt-2 mb-4" id="minibag-footer">
                  <Row className="d-flex flex-row">
                    <div
                      className={
                        i18n.translator.language === "ar" ?
                        "text-right pr-1 pr-lg-0 flex-grow-1" : "pl-1 pl-lg-0 flex-grow-1"
                      }
                      id={
                        i18n.translator.language === "ar" ?
                        "item-subtotal-ar" : "item-subtotal"
                      }>
                      {t('SUBTOTAL')}
                    </div>
                    <div
                      className={
                          i18n.translator.language === "ar" ?
                          "pl-4 item-price" : "pr-4 item-price"
                      }
                      dir="ltr">
                      {checkTotal(addedItems)}
                    </div>
                  </Row>
                  <Row className="mt-4" id="shopping-btns">
                    <Col className="d-flex justify-content-center" xs={12} lg={6}>
                      <Button
                        className={
                          i18n.translator.language === "ar" ?
                          "viewbag-btn-ar" : "viewbag-btn"
                        }
                        onClick={() => proceedToShoppingBag(userID)}>
                        {t('VIEW SHOPPING BAG')}
                      </Button>
                    </Col>
                    <Col className="d-flex justify-content-center mt-4 mt-lg-0" xs={12} lg={6}>
                      <Button
                        className={
                          i18n.translator.language === "ar" ?
                          "checkout-btn-ar" : "checkout-btn"
                        }
                        onClick={() => proceedToCheckout(userID)}>
                          <Trans>CHECKOUT</Trans>
                      </Button>
                    </Col>
                  </Row>
                </div>
                :
                <Row
                  className="mt-5 pt-5 h-100 d-flex justify-content-center"
                  id={
                    i18n.translator.language === "ar" ?
                    "minibag-empty-ar" : "minibag-empty"
                  }>
                  <div className="align-self-center text-center">
                    <p>
                      {t('Your Shopping Bag is empty')}
                    </p>
                    <Button
                      className="mt-1"
                      id={
                        i18n.translator.language === "ar" ?
                        "minibag-empty-btn-ar" : "minibag-empty-btn"
                      }
                      type="button"
                      onClick={() => toggleMiniBag()}>
                      {t('BACK TO SHOPPING')}
                    </Button>
                  </div>
                </Row>
              }
            </div>
          )
          :
          (
            Object.keys(shoppingBag).length !== 0 ?
            <div>
              {
                typeof shoppingBag.addedItems !== 'undefined' && shoppingBag.addedItems.length > 0
                && shoppingBag.addedItems !== '' &&
                  shoppingBag.addedItems.map((item, index) =>
                    <Row className="mt-3" id="minibag-details" key={index}>
                      {
                        item.size.map((size, sizeIndex) =>
                        <Row className="mb-4 w-100" id="minibag-item" key={sizeIndex}>
                          <Col xs={6} sm={5} lg={4}
                            className="d-flex justify-content-center"
                            id="minibag-item-img">
                            <Image
                              src={loadImage(item)}
                              alt="Fashion"
                              width="120"
                              height="160"
                            />
                          </Col>
                          <Col
                            xs={6} sm={7} lg={8}
                            id="minibag-item-attr"
                            className={
                              i18n.translator.language === "ar" ?
                              "text-right pr-0 pr-lg-4" : "pl-0 pl-lg-4"
                            }>
                            <div className="d-flex flex-row" id="item-name">
                              <p className="mb-1 mb-lg-2 flex-grow-1">{item.name}</p>
                              <div
                                id="remove-item-btn"
                                onClick={() => removeItemFromGuestBag({
                                  itemID: item.id.replace("BSONObjectID(\"", "")
                                                              .replace("\")", "")
                                                              .replace(/\"/g, ""),
                                  size: size.number,
                                  category: item.category,
                                  shoppingBag: shoppingBag
                                })}></div>
                            </div>
                            <div
                              className="mt-0 mt-lg-1 d-flex flex-column"
                              id={
                                i18n.translator.language === "ar" ?
                                "item-attributes-ar" :
                                "item-attributes"
                              }>
                              <p className="mb-0 mb-lg-1">
                                {t('itemQty', {itemQty: size.quantity})}
                              </p>
                              <p className="mb-0 mb-lg-1">
                                {t('itemSize', {itemSize: size.number})}
                              </p>
                              <p>
                                {t('itemColor')}
                                <Trans>{item.color.color}</Trans>
                              </p>
                            </div>
                            <div
                              className={
                                i18n.translator.language === "ar" ?
                                "mt-0 mt-lg-1 d-flex flex-row item-price-ar" :
                                "mt-0 mt-lg-1 d-flex flex-row item-price"
                              }>
                              <p id="item-price" dir="ltr">
                                {item.currency + " " + formatNum(item.price)}
                              </p>
                            </div>
                          </Col>
                        </Row>
                        )
                      }
                    </Row>
              )}
              {
                typeof shoppingBag.addedItems !== 'undefined' && shoppingBag.addedItems.length > 0
                && shoppingBag.addedItems !== '' &&
                <div className="mt-2 mb-4" id="minibag-footer">
                  <Row className="d-flex flex-row">
                    <div
                      className={
                        i18n.translator.language === "ar" ?
                        "text-right pr-1 pr-lg-0 flex-grow-1" : "pl-1 pl-lg-0 flex-grow-1"
                      }
                      id={
                        i18n.translator.language === "ar" ?
                        "item-subtotal-ar" : "item-subtotal"
                      }>
                      {t('SUBTOTAL')}
                    </div>
                    <div
                      className={
                        i18n.translator.language === "ar" ?
                        "pl-4 item-price" : "pr-4 item-price"
                      }
                      dir="ltr">
                      {formatNum(shoppingBag.total)}
                    </div>
                  </Row>
                  <Row className="mt-4" id="shopping-btns">
                    <Col className="d-flex justify-content-center" xs={12} lg={6}>
                      <Button
                        className={
                          i18n.translator.language === "ar" ?
                          "viewbag-btn-ar" : "viewbag-btn"
                        }
                        onClick={() => proceedToShoppingBag(userID)}>
                        {t('VIEW SHOPPING BAG')}
                      </Button>
                    </Col>
                    <Col className="d-flex justify-content-center mt-4 mt-lg-0" xs={12} lg={6}>
                      <Button
                        className={
                          i18n.translator.language === "ar" ?
                          "checkout-btn-ar" : "checkout-btn"
                        }
                        onClick={() => proceedToCheckout(userID)}>
                        <Trans>CHECKOUT</Trans>
                      </Button>
                    </Col>
                  </Row>
                </div>
              }
            </div>
            :
            <Row
              className="mt-5 pt-5 h-100 d-flex justify-content-center"
              id={
                i18n.translator.language === "ar" ?
                "minibag-empty-ar" : "minibag-empty"
              }>
              <div className="align-self-center text-center">
                <p>
                  {t('Your Shopping Bag is empty')}
                </p>
                <Button
                  className="mt-1"
                  id={
                    i18n.translator.language === "ar" ?
                    "minibag-empty-btn-ar" : "minibag-empty-btn"
                  }
                  type="button"
                  onClick={() => toggleMiniBag()}>
                  {t('BACK TO SHOPPING')}
                </Button>
              </div>
            </Row>
          )
        }
      </Col>
    </Row>
  </Container>
);

export default withTranslation()(MiniShoppingBagComponent);
