/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';

import HomePageReducer from '../app/pages/HomePage/reducer';
import DragAndDropReducer from '../app/components/DragAndDrop/reducer';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer() {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  const comnbinedAppReducer = combineReducers({
    HomePageReducer,

    DragAndDropReducer,
  });

  const rootReducer = (state, action) => {
    return comnbinedAppReducer(state, action);
  };

  return rootReducer;
}
