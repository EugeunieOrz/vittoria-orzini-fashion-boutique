// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Col, Grid, Image, Modal, Row, Nav, NavItem } from 'react-bootstrap';
import { withI18n, Trans } from 'lingui-react';
import { Form, Control, Errors } from 'react-redux-form';
import FormControl from 'components/FormControl';
import Spinner from 'components/Spinner';
import type { FormProps } from 'util/Form';
import config from 'config/index';

import './Dashboard.scss';

type Props = {
  i18n: Object,
  products: Array<Object>,
};

export const DashboardComponent = ({
  i18n, products,
}: Props) => (
  <Grid className="home-dashboard">
    <div className="newin-link">
      <Link to={config.route.home.newIn}>
        <Trans>NEW ARRIVALS</Trans>
      </Link>
    </div>
    <div className="sale-link">
      <Link to={config.route.home.index}>
        <Trans>SALE</Trans>
      </Link>
    </div>
    <div className="fashion-link">
      <Link to={config.route.home.index}>
        <Trans>FASHION</Trans>
      </Link>
    </div>
    <div  className="vintage-link">
      <Link to={config.route.home.index}>
        <Trans>VINTAGE</Trans>
      </Link>
    </div>
    <div className="homecoll-link">
      <Link to={config.route.home.index}>
        <Trans>HOME COLLECTION</Trans>
      </Link>
    </div>
  </Grid>
);

export default withI18n()(DashboardComponent);
