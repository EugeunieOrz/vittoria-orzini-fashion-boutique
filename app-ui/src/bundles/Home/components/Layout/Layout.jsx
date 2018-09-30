// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CoreLayout from 'components/CoreLayout';
import { NotFoundRoute } from 'components/NotFound';
import Dashboard from 'bundles/Home/components/Dashboard';
import config from 'config/index';

import './Layout.scss';

export default () => (
  <CoreLayout>
    <div className="home-container">
      <Switch>
        <Route exact path={config.route.index} component={Dashboard} />
        <NotFoundRoute />
      </Switch>
    </div>
  </CoreLayout>
);
