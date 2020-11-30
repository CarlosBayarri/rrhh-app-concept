import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './store/reducers';
import { FeedState, feedReducer } from './store/reducers/feed.reducers';

/**
 * Main state of the application
 */
export interface AppState {
   /**
    * ui declaration
    */
   ui: reducers.UiState,
   /**
    * user declaration
    */
   user: reducers.AuthState,
   /**
    * departments declaration
    */
   departments: reducers.DepartmentsState,
   /**
    * staff declaration
    */
   staff: reducers.StaffState,
   /**
    * staff declaration
    */
   feed: reducers.FeedState,
}

/**
 * Mapping all reducers
 */
export const appReducers: ActionReducerMap<AppState> = {
   ui: reducers.uiReducer,
   user: reducers.authReducer,
   departments: reducers.departmentsReducer,
   staff: reducers.staffReducer,
   feed: reducers.feedReducer,
}