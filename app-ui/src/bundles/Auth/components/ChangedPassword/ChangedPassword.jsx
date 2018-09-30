// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row } from 'react-bootstrap';
import { withI18n, Trans } from 'lingui-react';
import config from 'config/index';

import './ChangedPassword.scss';

type Props = {
  i18n: Object,
}

export const ChangedPasswordComponent = ({
  i18n,
}: Props) => (
  <Grid className="changed-password">
    <Row className="changedpasswd-title">{i18n.t`Congratulations!`}</Row>
    <Row className="changedpasswd-txt"><Trans>You've successfully changed your password</Trans></Row>
    <Row className="home-link">
      <Link to={config.route.auth.passwordSurvey}>
        <Trans>Continue to V.O. Fashion Boutique</Trans>
      </Link>
    </Row>
  </Grid>
);

export default withI18n()(ChangedPasswordComponent);
