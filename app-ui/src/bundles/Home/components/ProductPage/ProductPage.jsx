// @flow
import React from 'react';
import { Button, Col, Grid, Image, Nav, NavItem, Panel, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withI18n, Trans } from 'lingui-react';
import config from 'config/index';

import './ProductPage.scss';

type Props = {
  i18n: Object,
  
}

export const ProductPageComponent = ({ i18n,  }: Props) => (
  <Panel className="products">
    <div className="product-page">
      <div className="product-title">
        <Trans>Product Page</Trans>
        <p></p>
      </div>
    </div>
  </Panel>
);

export default withI18n()(ProductPageComponent);
