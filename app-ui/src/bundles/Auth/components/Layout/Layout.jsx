// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CoreLayout from 'components/CoreLayout';
import Preloader from 'components/Preloader';
import { NotFoundRoute } from 'components/NotFound';
import lifecycle from 'containers/LifecycleContainer';
import SignInContainer from 'bundles/Auth/containers/SignInContainer';
import SignUpContainer from 'bundles/Auth/containers/SignUpContainer';
import RecoverPasswordContainer from 'bundles/Auth/containers/RecoverPasswordContainer';
import ResetPasswordContainer from 'bundles/Auth/containers/ResetPasswordContainer';
import AlreadyRegisteredContainer from 'bundles/Auth/containers/AlreadyRegisteredContainer';
import SignOutContainer from 'bundles/Auth/containers/SignOutContainer';
import RecoverPasswordEmailSentContainer from 'bundles/Auth/containers/RecoverPasswordEmailSentContainer';
import PasswordSurveyContainer from 'bundles/Auth/containers/PasswordSurveyContainer';
import ChangedPassword from 'bundles/Auth/components/ChangedPassword';
import ErrorPage from 'bundles/Auth/components/ErrorPage';
import { signout } from 'util/Auth';
import config from 'config/index';

import './Layout.scss';

type RouteProps = {
  // eslint-disable-next-line react/no-unused-prop-types
  match: Object,
};

export default () => (
  <CoreLayout>
    <div className="authentication-container">
      <Switch>
      <Redirect exact from={config.route.auth.index} to={config.route.auth.signIn} />
      <Route exact path={config.route.auth.signIn} component={SignInContainer} />
      <Route exact path={config.route.auth.signUp} component={SignUpContainer} />
      <Route exact path={config.route.auth.passwordRecovery} component={RecoverPasswordContainer} />
      <Route exact path={config.route.auth.emailSent} component={RecoverPasswordEmailSentContainer} />
      <Route exact path={`${config.route.auth.passwordRecovery}/:token`} component={ResetPasswordContainer} />
      <Route exact path={config.route.auth.signOut} component={SignOutContainer} />
      <Route exact path={config.route.auth.alreadyInUse} component={AlreadyRegisteredContainer} />
      <Route exact path={config.route.auth.passwordSurvey} component={PasswordSurveyContainer} />
      <Route exact path={config.route.auth.changedPassword} component={ChangedPassword} />
      <Route exact path={config.route.auth.errorPage} component={ErrorPage} />
      <NotFoundRoute />
      </Switch>
    </div>
  </CoreLayout>
);
