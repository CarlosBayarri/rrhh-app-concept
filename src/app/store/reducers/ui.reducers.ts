import { createReducer, on } from '@ngrx/store';
import * as uiActions from '../actions';

/**
 * User interface state interface
 */
export interface UiState {
    /**
     * is loading declaration, boolean
     */
    isLoading: boolean; 
}
/**
 * Initial state isloading = false
 */
export const uiInitialState: UiState = {
    isLoading: false,
}

/**
 * Creates a reducer function to handle state transitions.
 * Reducer creators reduce the explicitness of reducer functions with switch statements.
 * @param initialState — Provides a state value if the current state is undefined, as it is initially.
 * @param ons — Associations between actions and state changes.
 * @returns — A reducer function.
 */
const _uiReducer = createReducer(uiInitialState,

    on(uiActions.isLoading, state => ({ ...state, isLoading: true})),
    on(uiActions.stopLoading, state => ({ ...state, isLoading: false})),

);

/**
 * Exports ui reducer
 * @param state - Initial state
 * @param action - Actions
 * @returns — Reducer
 */
export function uiReducer(state, action) {
    return _uiReducer(state, action);
}