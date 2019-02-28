// @flow
import React from 'react';
import Alert from 'react-s-alert';
import { Switch, Route } from 'react-router-dom';
import AuthenticatedContainer from 'containers/Header/AuthenticatedContainer';
import UnauthenticatedContainer from 'containers/Header/UnauthenticatedContainer';
import HomeHeaderContainer from 'containers/Header/HomeHeaderContainer';
import { withI18n, Trans } from 'lingui-react';
import config from 'config/index';

import type { Node } from 'react';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import './CoreLayout.scss';

type Props = {
  children: Node,
};

export default ({ children }: Props) => (
  <div id="core-layout">
    <Switch>
      <Route exact path='/home' component={HomeHeaderContainer} />
      <Route path='/home/new-in' component={HomeHeaderContainer} />
      <Route path='/home/product' component={HomeHeaderContainer} />
      <Route path="/auth" component={UnauthenticatedContainer} />
      <Route path="/admin" component={AuthenticatedContainer} />
    </Switch>
    {children}
    <Alert
      stack={{ limit: 3 }}
      html
      effect="stackslide"
      position="top"
      beep={false}
      timeout={10000}
    />
  </div>
);
