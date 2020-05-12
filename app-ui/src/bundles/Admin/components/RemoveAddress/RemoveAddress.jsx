// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Grid, Row } from 'react-bootstrap';
import { withI18n, Trans } from '@lingui/react';
import Spinner from 'components/Spinner';
import config from 'config/index';

type Props = {
  i18n: Object,
  indexToRemoveAddress: Number,
  onRemoveAddress: (userID: string, indexToRemoveAddress: Number) => any,
  onShowRemoveAddressModal: (indexToRemoveAddress: Number) => any,
  userID: string,
}

export const RemoveAddressComponent = ({
  i18n, indexToRemoveAddress, onRemoveAddress, onShowRemoveAddressModal, userID,
}: Props) => (
  <Grid className="remove-address-container">
   <Row>
    <p className="rm-addr-q">
      {i18n.t`Are you sure you want to delete this address?`}
    </p>
  </Row>
  <Row className="cofirm-cancel-buttons">
    <Col md={6} mdPush={6}>
      <Button className="cancel-rm-addr-btn" onClick={() => onShowRemoveAddressModal(indexToRemoveAddress)}>
        CANCEL
      </Button>
    </Col>
    <Col md={6} mdPull={6}>
      <Button className="confirm-rm-addr-btn"
              onClick={() => onRemoveAddress(userID, indexToRemoveAddress)}>
        CONFIRM
      </Button>
    </Col>
  </Row>
</Grid>
);

export default withI18n()(RemoveAddressComponent);
