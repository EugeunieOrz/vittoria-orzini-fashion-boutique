// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row } from 'react-bootstrap';
import { withI18n, Trans } from 'lingui-react';
import config from 'config/index';

import './AlreadyRegistered.scss';

type Props = {
  i18n: Object,
}

export const AlreadyRegisteredComponent = ({
  i18n
}: Props) => (
  <Grid className="already-registered">
    <Row className="alreadyreg-title">{i18n.t`YOU ARE ALREADY REGISTERED`}</Row>
    <Row className="alreadyreg-txt"><Trans>YOU HAVE ALREADY USED THIS EMAIL ADDRESS</Trans></Row>
    <Row className="alreadyreg-link"><Link to={config.route.index}><Trans>HOME</Trans></Link></Row>
  </Grid>
);

export default withI18n()(AlreadyRegisteredComponent);
