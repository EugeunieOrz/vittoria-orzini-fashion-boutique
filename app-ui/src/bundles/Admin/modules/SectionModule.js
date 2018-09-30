// @flow
import { combineReducers } from 'redux';
import { createAction, handleAction, handleActions } from 'redux-actions';

export type SectionState = {
  section: string
}

export const sectionState: SectionState = { section: '' };

export const selectID = createAction('ADMIN_DISPLAY_SECTION_BASED_ON_ID');

export default combineReducers({
  sectionID: handleAction(
    selectID,
    (sectionState, action) => ({
      section: action.payload
    }),
     sectionState
  ),
});
