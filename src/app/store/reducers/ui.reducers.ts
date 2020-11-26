import { createReducer, on } from '@ngrx/store';
import * as uiActions from '../actions';

export interface UiState {
    isLoading: boolean; 
}

export const uiInitialState: UiState = {
    isLoading: false,
}

const _uiReducer = createReducer(uiInitialState,

    on(uiActions.isLoading, state => ({ ...state, isLoading: true})),
    on(uiActions.stopLoading, state => ({ ...state, isLoading: false})),

);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}