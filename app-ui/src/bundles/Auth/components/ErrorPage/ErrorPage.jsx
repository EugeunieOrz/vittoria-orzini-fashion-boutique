// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row } from 'react-bootstrap';
import { withI18n, Trans } from '@lingui/react';
import config from 'config/index';

import './ErrorPage.scss';

type Props = {
  i18n: Object,
}

export const ErrorPageComponent = ({
  i18n,
}: Props) => (
  <Grid className="auth-error">
    <Row className="auth-error-title">{i18n.t`Unfortunately something went wrong.`}</Row>
    <Row className="auth-error-txt"><Trans>Please try again. Continue your shopping.</Trans></Row>
    <Row className="home-link">
      <Link to={config.route.auth.passwordSurvey}>
        <Trans>Back to HOME</Trans>
      </Link>
    </Row>
  </Grid>
);

export default withI18n()(ErrorPageComponent);
