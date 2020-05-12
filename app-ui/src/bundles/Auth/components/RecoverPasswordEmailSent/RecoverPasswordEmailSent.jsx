// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row } from 'react-bootstrap';
import { withI18n, Trans } from '@lingui/react';
import config from 'config/index';

import './RecoverPasswordEmailSent.scss';

type Props = {
  i18n: Object,
  email: string,
}

export const RecoverPasswordEmailSentComponent = ({
  i18n, email,
}: Props) => (
  <div className="recover-password-email-sent-container">
    { Object.entries(email).length === 0 && email.constructor === Object ?
      <div className="not-found-container">
        <p className="code">404</p>
        <p className="page-not-found"><Trans>The Page you are looking for could not be found!</Trans></p>
        <p className="back-to-home-link"><Link to={config.route.home.index}><Trans>Back to Home</Trans></Link></p>
      </div>
      :
      <Grid className="email-sent">
        <Row id="email-sent-header">{i18n.t`Check your email`}</Row>
        <Row id="email-sent-txt1">
          <Trans>We've sent an email to {email}. Click the link in the email to reset your password.</Trans>
        </Row>
        <Row id="email-sent-txt2">
          <Trans>If you don't see the email, check other places it might be, like your junk, spam, social, or other folders.</Trans>
        </Row>
        <Row id="did-not-receive-the-email-link">
          <Link to={config.route.auth.passwordRecovery}>
            <Trans>I didn't receive the email</Trans>
          </Link>
        </Row>
      </Grid>
    }
  </div>
);

export default withI18n()(RecoverPasswordEmailSentComponent);
