// @flow
import React from 'react';
import { Button, Col, Grid, Image, Nav, NavItem, Panel, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withI18n, Trans } from 'lingui-react';
import config from 'config/index';

import './NewIn.scss';

type Props = {
  arrProdNum: string,
  i18n: Object,
  isHidden: boolean,
  products: Array<Object>,
  onSwitchToProductView: (productID: string) => any,
}

export const NewInComponent = ({ arrProdNum, i18n, isHidden, products, onSwitchToProductView, }: Props) => (
  <Panel className="newin">
    <div className="new-arrivals">
      <div className="new-title">
        <Trans>NEW ARRIVALS</Trans>
      </div>
      {products.map((product, index) =>
        <Col xs={4} md={3} key={index}>
          <Image
            src={"/static/fashion/newin/" + product.nameOfImg + ".jpg"}
            width="310"
            height="450"
            onClick={() => onSwitchToProductView(product.id)}
          />
          <div className="line-break"></div>
        </Col>
      )}
    </div>
  </Panel>
);

export default withI18n()(NewInComponent);
