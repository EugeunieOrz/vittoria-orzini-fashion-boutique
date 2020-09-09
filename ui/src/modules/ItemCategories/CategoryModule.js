// @flow
import { createAction } from 'redux-actions';

export const selectFashionCategory = createAction('SELECT_FASHION_CATEGORY');
export const switchToProductView = createAction('SWITCH_TO_PRODUCT_VIEW');
export const switchToProductViewFromSearch = createAction('SWITCH_TO_PRODUCT_VIEW_FROM_SEARCH_PAGE');
