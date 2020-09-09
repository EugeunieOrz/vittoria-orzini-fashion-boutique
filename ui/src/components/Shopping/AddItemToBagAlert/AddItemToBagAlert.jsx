// @flow
import React from 'react';
import { withTranslation } from "react-i18next";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import './AddItemToBagAlert.scss';

import closeSign from '../../../static/icons/close.svg';

type Props = {
  i18n: Object,
  t: Object,
  department: string,
  collection: string,
  category: string,
  imgIndex: string,
  itemName: string,
  isShown: boolean,
  proceedToShoppingBag: (userID: string) => any,
  toggleAddItemToBagAlert: () => any,
  route: (value: string) => any,
  userID: string,
}

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

export const AddItemToBagAlertComponent = ({
  i18n, t,
  imgIndex, itemName, department, collection, category, userID,
  toggleAddItemToBagAlert, isShown, route,
  proceedToShoppingBag,
}: Props) => (
  <Modal
    className="shopping-modal"
    id="add-item-to-bag-alert-container"
    show={isShown}
    onHide={toggleAddItemToBagAlert}
    size="lg">
    <Modal.Body
      className={i18n.translator.language === "ar" ? "pr-0 py-0" : "pl-0 py-0"}
      dir={i18n.translator.language === "ar" ? "rtl" : "ltr"}>
      <Row>
        <Col xs={3} lg={2}
          className={i18n.translator.language === "ar" ? "text-right" : ""}>
          <Image
            id="item-image"
            src={require(`../../../static/${department}/${collection}/${category}/${imgIndex}`)}
            alt="Fashion"
            width="120"
            height="160"
          />
        </Col>
        <Col xs={8} lg={9} className="d-flex flex-column">
          <p
            className={
              i18n.translator.language === "ar" ?
              "mt-2 mt-sm-3 mt-md-4 pt-2 text-right" :
              "mt-2 mt-sm-3 mt-md-4 pt-2"
            }
            id={
              i18n.translator.language === "ar" ?
              "add-item-msg-ar" : "add-item-msg"
            }>
            {t('item added to shopping bag', {nameOfItem: itemName})}
          </p>
          <Button
            className="mt-0 mt-sm-2 mb-2 align-self-start"
            id={i18n.translator.language === "ar" ? "view-bag-ar" : "view-bag"}
            onClick={() => proceedToShoppingBag(userID)}>
            {t('VIEW SHOPPING BAG')}
          </Button>
        </Col>
        <Col xs={1}
          className={
            i18n.translator.language === "ar" ?
            "d-flex justify-content-end pt-2 pl-2" :
            "d-flex justify-content-end pt-2 pr-2"
          }>
          <Image
            className="close-alert-btn"
            src={closeSign}
            width="24" height="24"
            alt=""
            onClick={() => toggleAddItemToBagAlert()} />
        </Col>
      </Row>
    </Modal.Body>
  </Modal>
);

export default withTranslation()(AddItemToBagAlertComponent);
