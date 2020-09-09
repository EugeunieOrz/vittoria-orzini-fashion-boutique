// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import './AddItemToWishlistAlert.scss';
import closeSign from '../../../../static/icons/close.svg';

type Props = {
  isShown: boolean,
  department: string,
  collection: string,
  category: string,
  i18n: Object,
  imgIndex: string,
  isShown: boolean,
  itemName: string,
  proceedToWishlist: () => any,
  t: Object,
  toggleAddItemToWishlistAlert: () => any,
}

export const AddItemToWishlistAlertComponent = ({
  isShown, i18n, imgIndex, itemName, proceedToWishlist, toggleAddItemToWishlistAlert, t,
  department, collection, category,
}: Props) => (
  <Modal
    className="wishlist-modal"
    id="add-item-to-wishlist-alert-container"
    show={isShown}
    onHide={toggleAddItemToWishlistAlert}
    size="lg">
    <Modal.Body
      className={i18n.translator.language === "ar" ? "pr-0 py-0" : "pl-0 py-0"}
      dir={i18n.translator.language === "ar" ? "rtl" : "ltr"}>
      <Row>
        <Col xs={3} lg={2}
          className={i18n.translator.language === "ar" ? "text-right" : ""}>
          <Image
            id="item-image"
            src={require(`../../../../static/${department}/${collection}/${category}/${imgIndex}`)}
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
              "add-item-to-w-msg-ar" :
              "add-item-to-w-msg"
            }>
            {t('itemAddedToWList', {itemName: itemName})}
          </p>
          <Button
            className="mt-0 mt-sm-2 mb-2"
            id={
              i18n.translator.language === "ar" ?
              "view-wishlist-btn-ar" : "view-wishlist-btn"
            }
            onClick={() => proceedToWishlist()}>
            <Trans>WISH LIST</Trans>
          </Button>
        </Col>
        <Col xs={1} className="d-flex justify-content-end pt-2 pr-2">
          <Image
            className="close-alert-btn"
            src={closeSign}
            width="24" height="24"
            alt=""
            onClick={() => toggleAddItemToWishlistAlert()} />
        </Col>
      </Row>
    </Modal.Body>
  </Modal>
);

export default withTranslation()(AddItemToWishlistAlertComponent);
