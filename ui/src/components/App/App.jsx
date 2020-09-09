// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Router, Route } from 'react-router-dom';
import { history } from 'modules/LocationModule';
import PreloaderContainer from 'containers/PreloaderContainer';
import MaintenanceContainer from 'containers/MaintenanceContainer';
import HomePageContainer from 'containers/HomePageContainer';
import ReadyToWearContainer from 'containers/ProductsPage/Fashion/ReadyToWearContainer';
import NewInFashionContainer from 'containers/ProductsPage/Fashion/NewInFashionContainer';
import DressesContainer from 'containers/ProductsPage/Fashion/DressesContainer';
import EveningContainer from 'containers/ProductsPage/Fashion/EveningContainer';
import JacketsContainer from 'containers/ProductsPage/Fashion/JacketsContainer';
import OrderInfoContainer from 'containers/Orders/OrderInfoContainer';
import OrderStatusContainer from 'containers/Orders/OrderStatusContainer';
import ClientServiceContainer from 'containers/ClientServiceContainer';
import StoreLocatorContainer from 'containers/StoreLocatorContainer';
import NewsletterUnsubscribeContainer from 'containers/Newsletter/NewsletterUnsubscribeContainer';
import { CaptureNotFoundRoute, NotFoundRoute } from 'components/NotFound';
import * as Bundles from 'bundles';
import { I18nextProvider } from 'react-i18next';
import i18n from 'util/i18n';
import { secured, unsecured } from 'util/Auth';

type Props = {
  store: Object,
}

/**
 * App component.
 */
export default class App extends React.Component<Props> {
  /**
   * The component props.
   */
  props: Props;

  /**
   * Indicates if the component should be updated.
   *
   * @returns {boolean} True if the component should be updated, false otherwise.
   */
  shouldComponentUpdate() {
    return true;
  }

  /**
   * Renders the component.
   *
   * @returns The component.
   */
  render() {
    const { store } = this.props;

    return (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <PreloaderContainer>
            <MaintenanceContainer>
              <Router history={history}>
                <CaptureNotFoundRoute>
                  <Switch>
                    <Route exact path="/" component={HomePageContainer} />
                    <Route path="/account" component={secured(Bundles.account(store))} />
                    <Route path="/auth" component={unsecured(Bundles.auth(store))} />
                    <Route path="/home" component={Bundles.home(store)} />
                    <Route path="/client-service" component={ClientServiceContainer} />
                    <Route path="/fashion/new-arrivals" component={NewInFashionContainer} />
                    <Route path="/fashion/ready-to-wear" component={ReadyToWearContainer} />
                    <Route path="/fashion/dresses" component={DressesContainer} />
                    <Route path="/fashion/evening" component={EveningContainer} />
                    <Route path="/fashion/jackets" component={JacketsContainer} />
                    <Route path='/follow-your-order' component={OrderInfoContainer} />
                    <Route path='/order-status' component={OrderStatusContainer} />
                    <Route path="/store-locator" component={StoreLocatorContainer} />
                    <Route path='/newsletter/unsubscribe/:id' component={NewsletterUnsubscribeContainer} />
                    <NotFoundRoute />
                  </Switch>
                </CaptureNotFoundRoute>
              </Router>
            </MaintenanceContainer>
          </PreloaderContainer>
        </I18nextProvider>
      </Provider>
    );
  }
}
