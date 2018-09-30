// @flow
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CoreLayout from 'components/CoreLayout';
import { NotFoundRoute } from 'components/NotFound';
import Dashboard from 'bundles/Admin/components/Dashboard';
import AdminContainer from 'bundles/Admin/containers/AdminContainer';
import config from 'config/index';

import './Layout.scss';

export default () => (
  <CoreLayout>
    <div className="admin-container">
      <Switch>
        <Route exact path={config.route.admin.index} component={AdminContainer} />
        <NotFoundRoute />
      </Switch>
    </div>
  </CoreLayout>
);
