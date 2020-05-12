// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row } from 'react-bootstrap';
import { withI18n, Trans } from '@lingui/react';
import config from 'config/index';

import './SignOut.scss';

type Props = {
  i18n: Object,
}

export const AlreadyRegisteredComponent = ({
  i18n
}: Props) => (
  <Grid className="sign-out">
    <Row className="sign-out-header">{i18n.t`YOU HAVE BEEN LOGGED OUT`}</Row>
    <Row className="sign-out-txt"><Trans>SEE YOU SOON</Trans></Row>
    <Row className="signout-linktohome"><Link to={config.route.index}><Trans>HOME</Trans></Link></Row>
  </Grid>
);

export default withI18n()(AlreadyRegisteredComponent);
