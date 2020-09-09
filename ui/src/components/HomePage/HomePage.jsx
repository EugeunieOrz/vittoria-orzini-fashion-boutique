// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import config from 'config/index';
import { withTranslation } from "react-i18next";
import CoreContainer from 'containers/CoreContainer';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Figure from 'react-bootstrap/Figure';
import './HomePage.scss';

import newInFashion from 'static/fashion/new_in_fashion.png';

/*
 *  Author: Ievgeniia Ozirna
 *  Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

type Props = {
  i18n: Object,
  t: Object,
};

export const HomePageComponent = ({
  i18n, t,
}: Props) => (
  <CoreContainer>
    <Row className="mb-2 no-gutters flex-fill d-flex" id="category-row">
      <Col className="d-none d-sm-block" sm={3} lg={2}></Col>
      <Col xs={12} sm={2}>
        <Link className="d-none d-sm-block" to={config.route.fashion.newIn}>
          <Image src={newInFashion} width="387.67" height="424.33" alt="Wedding Dress" />
        </Link>
        <Link className="d-block d-sm-none" to={config.route.fashion.newIn}>
          <Figure.Image src={newInFashion} alt="Wedding Dress" width="387.67" height="424.33" />
        </Link>
      </Col>
    </Row>
  </CoreContainer>
);

export default withTranslation()(HomePageComponent);
