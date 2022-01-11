/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';

import dndListReducer from '../app/pages/HomePage/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer() {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  const comnbinedAppReducer = combineReducers({
    dndListReducer,
  });

  const rootReducer = (state, action) => {
    return comnbinedAppReducer(state, action);
  };

  return rootReducer;
}
