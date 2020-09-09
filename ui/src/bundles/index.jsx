import React from 'react';
import loadable from '@loadable/component';
import Preloader from 'components/Preloader';

export const account = store => loadable(() =>
  import(/* webpackChunkName: "account" */ './Account').then(bundle => bundle.default(store)), {
  LoadingComponent: () => <Preloader />,
});

export const auth = store => loadable(() =>
  import(/* webpackChunkName: "auth" */ './Auth').then(bundle => bundle.default(store)), {
  LoadingComponent: () => <Preloader />,
});

export const home = store => loadable(() =>
  import(/* webpackChunkName: "home" */ './Home').then(bundle => bundle.default(store)), {
  LoadingComponent: () => <Preloader />,
});
