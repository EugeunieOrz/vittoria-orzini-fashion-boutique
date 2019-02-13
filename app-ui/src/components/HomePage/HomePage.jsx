// @flow
import React from 'react';
import { Button, Col, Grid, Image, Nav, NavItem, Panel, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withI18n, Trans } from 'lingui-react';
import config from 'config/index';

import './HomePage.scss';

type Props = {
  i18n: Object,
}

export const HomePageComponent = ({ i18n, }: Props) => (
  <Panel className="home-page">
    <div className="grid" id="central-container">
      <Link to={config.route.newIn}>
        <p id="new-arrivals-link"><Trans>NEW ARRIVALS</Trans></p>
      </Link>
   </div>
  </Panel>
);

export default withI18n()(HomePageComponent);
