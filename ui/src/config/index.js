import environments from 'config/environments';

// *******************************************
// Durations
// *******************************************
export const IP_DURATION = 1000; // Fetch the user's IP every second
export const PRODUCTS_DURATION = 5 * 1000; // Fetch the health state every 5 seconds
export const HEALTH_DURATION = 10 * 1000; // Fetch the health state every 10 seconds
export const NEWSLETTER_DURATION = 4 * 60 * 60 * 1000; // Fetch newsletter task every 4 hours
export const CUSTOMERS_DURATION = 7 * 1000;
export const TRANSACTIONS_DURATION = 8 * 1000;
export const USER_DURATION = 1000; // Fetch the user data every 1 second
export const DIRECTOR_DURATION = 1000; // Fetch the user data every 1 second

// *******************************************
// Config
// *******************************************
const config = {
  env: process.env.NODE_ENV || 'development',
  csrfCookieName: 'PLAY_CSRF_TOKEN',
  route: {
    index: '/',
    account: {
      index: '/account',
      product: '/account/product',
      returns: '/account/return-product',
      returnsForm: '/account/return-product-form',
      shopping: '/account/shopping-bag',
      checkout: '/account/checkout',
      orderConfirm: '/account/order-confirmation',
    },
    auth: {
      index: '/auth',
      signIn: '/auth/sign-in',
      signUp: '/auth/sign-up',
      passwordRecovery: '/auth/password/recovery',
      emailSent: '/auth/password/recovery/email/sent',
      alreadyInUse: '/auth/already/registered',
      signOut: '/auth/sign-out',
      passwordSurvey: '/auth/password/survey',
      changedPassword: '/auth/changed/password',
    },
    home: {
      index: '/home',
      product: '/home/product',
      returns: '/home/return-product',
      returnsForm: '/home/return-product-form',
      shopping: '/home/shopping-bag',
      checkout: '/home/proceed-to-purchase',
      completeSignIn: '/home/complete-checkout',
    },
    fashion: {
      index: '/fashion',
      newIn: '/fashion/new-arrivals',
      readyToWear: '/fashion/ready-to-wear',
      dresses: '/fashion/dresses',
      evening: '/fashion/evening',
      jackets: '/fashion/jackets',
    },
    clientService: '/client-service',
    storeLocator: '/store-locator',
    followOrder: '/follow-your-order',
    orderStatus: '/order-status',
    unsubscribe: '/newsletter/unsubscribe',
    unsubscribed: '/newsletter/unsubscribed',
  },
};

// ========================================================
// Environment Configuration
// ========================================================
const overrides = environments[config.env];
if (overrides) {
  Object.assign(config, overrides(config));
}

export default config;
