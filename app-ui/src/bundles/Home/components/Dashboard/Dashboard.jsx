// @flow
import React from 'react';
import { Button, Col, Grid, Nav, NavItem, Panel, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { withI18n, Trans } from 'lingui-react';
import config from 'config/index';

import './Dashboard.scss';

type Props = {
  i18n: Object,
}

export const DashboardComponent = ({ i18n, }: Props) => (
  <Panel className="dashboard">
    <Grid className="menu-links-grid">
      <Row className="fashion-link-row">
          <Link id="fashion-link" to={config.route.home.index}><Trans>FASHION</Trans></Link>
      </Row>
      <Row className="vintage-link-row">
        <Link id="vintage-link" to={config.route.home.index}><Trans>VINTAGE</Trans></Link>
      </Row>
      <Row className="homecoll-link-row">
        <Link id="home-collection-link" to={config.route.home.index}><Trans>HOME COLLECTION</Trans></Link>
      </Row>
    </Grid>
  </Panel>
);

export default withI18n()(DashboardComponent);
