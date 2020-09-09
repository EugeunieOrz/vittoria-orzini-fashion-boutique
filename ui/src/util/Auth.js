import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import { getUserID } from 'selectors/UserSelector';
import config from 'config/index';

/**
 * Author: Ievgeniia Ozirna
 * Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
 */

export const secured = connectedRouterRedirect({
  authenticatedSelector: state => getUserID(state) !== undefined,
  redirectPath: config.route.account.index,
  allowRedirectBack: false,
  wrapperDisplayName: 'secured',
});

export const shopUnsecure = connectedRouterRedirect({
  authenticatedSelector: state => getUserID(state) === undefined,
  redirectPath: config.route.index,
  wrapperDisplayName: 'shopUnsecure',
});

export const unsecured = connectedRouterRedirect({
  authenticatedSelector: state => getUserID(state) === undefined,
  redirectPath: config.route.auth.signIn,
  allowRedirectBack: false,
  wrapperDisplayName: 'unsecured',
});
