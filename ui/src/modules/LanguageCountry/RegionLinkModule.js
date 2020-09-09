// @flow
import { createAction, handleActions } from 'redux-actions';

export const decorateRegionLinkOnToggleState = {
  currentKey: ""
}

export const changeCurrentKeyForRegionLink = createAction('CHANGE_CURRENT_KEY_FOR_REGION_LINK');
export const decorateRegionLinkOnToggle = createAction('DECORATE_REGION_LINK_ON_TOGGLE');

export default handleActions({
  [changeCurrentKeyForRegionLink]: (state, action) => ({...state, currentKey: action.payload }),
}, decorateRegionLinkOnToggleState);
