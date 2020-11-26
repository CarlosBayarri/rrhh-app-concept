import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './store/reducers';

export interface AppState {
   ui: reducers.UiState,
   user: reducers.AuthState,
   departments: reducers.DepartmentsState,
   staff: reducers.StaffState,
}

export const appReducers: ActionReducerMap<AppState> = {
   ui: reducers.uiReducer,
   user: reducers.authReducer,
   departments: reducers.departmentsReducer,
   staff: reducers.staffReducer,
}