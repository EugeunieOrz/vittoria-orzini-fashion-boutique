// @flow
import React from 'react';
import { withTranslation, Trans } from "react-i18next";
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

import './MsgToCustomer.scss';

import closeSign from '../../static/icons/close.svg';

type Props = {
  i18n: Object,
  t: Object,
  msgIsShown: boolean,
  message: string,
  toggleMsg: () => any,
}

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

export const MsgToCustomer = ({
  i18n, t, msgIsShown, message, toggleMsg,
}: Props) => (
  <Modal
    className="msg-modal"
    id="msgtocustomer-container"
    show={msgIsShown}
    onHide={toggleMsg}
    size="lg">
    <Modal.Body className="pl-0 py-0">
      <Row className="d-flex justify-content-end pt-2 pr-2">
        <Image
          id="msgtocustomer-btn"
          src={closeSign}
          width="24" height="24"
          alt=""
          onClick={() => toggleMsg()} />
      </Row>
      <Row className={
          i18n.translator.language === "ar" ?
          "my-5 mx-5 justify-content-center text-right" :
          "my-5 mx-5 justify-content-center"
        }>
        <p id={
            i18n.translator.language === "ar" ?
            "msg-to-customer-ar" : "msg-to-customer"
          }>
          <Trans>{message}</Trans>
        </p>
      </Row>
    </Modal.Body>
  </Modal>
);

export default withTranslation()(MsgToCustomer);
