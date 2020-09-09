// @flow
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CoreContainer from 'containers/CoreContainer';
import { NotFoundRoute } from 'components/NotFound';
import BeforeCheckoutContainer from 'bundles/Home/containers/BeforeCheckoutContainer';
import ProductPageContainer from 'containers/Product/ProductPageContainer';
import ShoppingBagContainer from 'containers/Shopping/ShoppingBagContainer';
import SignInOrSignUpContainer from 'bundles/Home/containers/SignInOrSignUpContainer';
import ReturnFormContainer from 'containers/Orders/ReturnFormContainer';
import ReturnProductContainer from 'containers/Orders/ReturnProductContainer';
import { shopUnsecure } from 'util/Auth';
import config from 'config/index';

export default () => (
  <CoreContainer>
    <Switch>
      <Redirect exact from={config.route.home.index} to={config.route.home.shopping} />
      <Route
        path={`${config.route.home.product}/:productID`}
        component={shopUnsecure(ProductPageContainer)} />
      <Route path={config.route.home.shopping} component={ShoppingBagContainer} />
      <Route path={config.route.home.checkout} component={BeforeCheckoutContainer} />
      <Route path={config.route.home.completeSignIn} component={SignInOrSignUpContainer} />
      <Route path={config.route.home.returns} component={ReturnFormContainer} />
      <Route path={config.route.home.returnsForm} component={ReturnProductContainer} />
      <NotFoundRoute />
    </Switch>
  </CoreContainer>
);
