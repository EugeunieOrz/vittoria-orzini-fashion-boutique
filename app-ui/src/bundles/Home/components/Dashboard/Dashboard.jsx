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

import countries from 'static/countries';

import './Dashboard.scss';

type Props = {
  i18n: Object,
};

export const DashboardComponent = ({
  i18n,
}: Props) => (
  <Grid className="home-dashboard">
    <Link to={config.route.home.newIn}>
      <p id="new-arrivals-link"><Trans>NEW ARRIVALS</Trans></p>
    </Link>
  </Grid>
);

export default withI18n()(DashboardComponent);
