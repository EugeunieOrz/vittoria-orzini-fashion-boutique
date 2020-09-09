// @flow
import { createAction, handleActions } from 'redux-actions';

export const zoomEffectState = {
  zoomEffectIsOn: false
}

export const toggleZoomEffect = createAction('TOGGLE_ZOOM_EFFECT');

export default handleActions({
  [toggleZoomEffect]: (state, action) => ({...state, zoomEffectIsOn: !state.zoomEffectIsOn }),
}, zoomEffectState);
