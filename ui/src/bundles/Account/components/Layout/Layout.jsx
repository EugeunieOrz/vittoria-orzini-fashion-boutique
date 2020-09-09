// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CoreContainer from 'containers/CoreContainer';
import { NotFoundRoute } from 'components/NotFound';
import AccountDashboardContainer from 'bundles/Account/containers/AccountDashboardContainer';
import ProductPageContainer from 'containers/Product/ProductPageContainer';
import ShoppingBagContainer from 'containers/Shopping/ShoppingBagContainer';
import CheckoutContainer from 'bundles/Account/containers/Checkout/CheckoutContainer';
import OrderConfirmationContainer from 'bundles/Account/containers/OrderConfirmationContainer';
import ReturnFormContainer from 'containers/Orders/ReturnFormContainer';
import ReturnProductContainer from 'containers/Orders/ReturnProductContainer';
import config from 'config/index';

export default () => (
  <CoreContainer>
    <Switch>
      <Route exact path={config.route.account.index} component={AccountDashboardContainer} />
      <Route
        path={`${config.route.account.product}/:productID`}
        component={ProductPageContainer} />
      <Route path={config.route.account.returns} component={ReturnFormContainer} />
      <Route path={config.route.account.returnsForm} component={ReturnProductContainer} />
      <Route path={config.route.account.shopping} component={ShoppingBagContainer} />
      <Route path={config.route.account.checkout} component={CheckoutContainer} />
      <Route path={config.route.account.orderConfirm} component={OrderConfirmationContainer} />
      <NotFoundRoute />
    </Switch>
  </CoreContainer>
);
