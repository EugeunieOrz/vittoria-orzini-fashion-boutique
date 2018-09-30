import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { getUserID } from 'selectors/UserSelector';
import config from 'config/index';

export const home = connectedRouterRedirect({
  authenticatedSelector: state => getUserID(state) === undefined,
  redirectPath: config.route.index,
  wrapperDisplayName: 'home',
});

/**
 * Should be used to allow only authenticated users.
 */
export const secured = connectedRouterRedirect({
  authenticatedSelector: state => getUserID(state) !== undefined,
  redirectPath: config.route.admin.index,
  wrapperDisplayName: 'secured',
});

/**
 * Should be used to allow only not authenticated users.
 */
export const unsecured = connectedRouterRedirect({
  authenticatedSelector: state => getUserID(state) === undefined,
  redirectPath: config.route.auth.signOut,
  allowRedirectBack: false,
  wrapperDisplayName: 'unsecured',
});
