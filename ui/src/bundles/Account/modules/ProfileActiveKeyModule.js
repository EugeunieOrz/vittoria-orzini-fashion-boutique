// @flow
/*
Author: Ievgeniia Ozirna
Licensed under the CC BY-NC-ND 3.0: http://creativecommons.org/licenses/by-nc-nd/3.0/
*/
import { createAction, handleActions } from 'redux-actions';

export const profileActiveKeyState = {
  activeKey: "profile"
}

export const toggleProfileActiveKey = createAction('ACCOUNT_TOGGLE_PROFILE_ACTIVE_KEY');

export default handleActions({
  [toggleProfileActiveKey]: (state, action) => ({...state, activeKey: action.payload }),
}, profileActiveKeyState);
