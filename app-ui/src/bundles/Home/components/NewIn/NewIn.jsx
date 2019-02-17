// @flow
import React from 'react';
import { Button, Col, Grid, Image, Nav, NavItem, Panel, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withI18n, Trans } from 'lingui-react';
import config from 'config/index';
import Masonry from 'react-masonry-component';

import './NewIn.scss';

import items from 'static/fashion-images';

type Props = {
  i18n: Object,
  products: Array<Object>,
}

export const NewInComponent = ({ i18n, products, }: Props) => (
  <Panel className="newin">
    <div className="grid">
      {items.map((item, index) =>
        <Col xs={4} md={3} key={index}>
          <Image src={item.src} width="310" height="450" />
          <div className="line-break"></div>
        </Col>
      )}
   </div>
  </Panel>
);

export default withI18n()(NewInComponent);
