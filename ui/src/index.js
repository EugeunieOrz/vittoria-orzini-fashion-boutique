import 'styles/core.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import createStore from 'store/createStore';
import lifecycle from 'containers/LifecycleContainer';
import App from 'components/App';
import { initApp } from 'modules/InitModule';
import * as serviceWorker from 'serviceWorker';

// ========================================================
// Store Instantiation
// ========================================================
// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__;
const store = createStore(initialState);

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  // eslint-disable-next-line react/jsx-filename-extension
  const AppComponent = lifecycle(App, { componentWillMount: initApp() });

  ReactDOM.render(
    // https://github.com/gaearon/react-hot-loader/issues/666
    // eslint-disable-next-line react/jsx-filename-extension
    <AppComponent store={store} />,
    MOUNT_NODE,
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// This code is excluded from production bundle
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      // eslint-disable-next-line import/no-extraneous-dependencies,global-require
      const RedBox = require('redbox-react').default;

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        renderError(error);
      }
    };
  }
}

// ========================================================
// Go!
// ========================================================
render();
