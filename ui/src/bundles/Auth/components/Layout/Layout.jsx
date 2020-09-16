// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { NotFoundRoute } from 'components/NotFound';
import SignInContainer from 'bundles/Auth/containers/SignInContainer';
import SignUpContainer from 'bundles/Auth/containers/SignUpContainer';
import RecoverPasswordContainer from 'bundles/Auth/containers/RecoverPasswordContainer';
import ResetPasswordContainer from 'bundles/Auth/containers/ResetPasswordContainer';
import AlreadyRegistered from 'bundles/Auth/components/AlreadyRegistered';
import RecoverPasswordEmailSentContainer from 'bundles/Auth/containers/RecoverPasswordEmailSentContainer';
import PasswordSurveyContainer from 'bundles/Auth/containers/PasswordSurveyContainer';
import ChangedPassword from 'bundles/Auth/components/ChangedPassword';
import CoreContainer from 'containers/CoreContainer';
import config from 'config/index';

export default () => (
  <CoreContainer>
    <Switch>
      <Redirect exact from={config.route.auth.index} to={config.route.auth.signIn} />
      <Route exact path={config.route.auth.signIn} component={SignInContainer} />
      <Route exact path={config.route.auth.signUp} component={SignUpContainer} />
      <Route exact path={config.route.auth.passwordRecovery} component={RecoverPasswordContainer} />
      <Route exact path={config.route.auth.emailSent} component={RecoverPasswordEmailSentContainer} />
      <Route exact path={`${config.route.auth.passwordRecovery}/:token`} component={ResetPasswordContainer} />
      <Route exact path={config.route.auth.alreadyInUse} component={AlreadyRegistered} />
      <Route exact path={config.route.auth.passwordSurvey} component={PasswordSurveyContainer} />
      <Route exact path={config.route.auth.changedPassword} component={ChangedPassword} />
      <NotFoundRoute />
    </Switch>
  </CoreContainer>
);
