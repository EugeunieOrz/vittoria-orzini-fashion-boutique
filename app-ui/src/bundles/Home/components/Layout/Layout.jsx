// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CoreLayout from 'components/CoreLayout';
import { NotFoundRoute } from 'components/NotFound';
import HomeContainer from 'bundles/Home/containers/HomeContainer';
import NewInContainer from 'bundles/Home/containers/NewInContainer';
import config from 'config/index';

import './Layout.scss';

export default () => (
  <CoreLayout>
    <div className="admin-container">
      <Switch>
        <Route exact path={config.route.home.index} component={HomeContainer} />
        <Route path={config.route.home.newIn} component={NewInContainer} />
        <NotFoundRoute />
      </Switch>
    </div>
  </CoreLayout>
);
