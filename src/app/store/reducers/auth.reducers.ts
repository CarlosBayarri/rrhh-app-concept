import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as authActions from '../actions';

/**
 * Auth state interface
 */
export interface AuthState {
    /**
     * user declaration, user model
     */
    user: User; 
}

/**
 * Initial state of user = null
 */
export const AuthInitialState: AuthState = {
   user: null,
}

/**
 * Creates a reducer function to handle state transitions.
 * Reducer creators reduce the explicitness of reducer functions with switch statements.
 * @param initialState — Provides a state value if the current state is undefined, as it is initially.
 * @param ons — Associations between actions and state changes.
 * @returns — A reducer function.
 */
const _authReducer = createReducer(AuthInitialState,

    on(authActions.setUser, (state, {user}) => ({ ...state, user: {...user}})),
    on(authActions.unSetUser, (state) => ({ ...state, user: null})),

);

/**
 * Exports auth reducer
 * @param state - Initial state
 * @param action - Actions
 * @returns — Reducer
 */
export function authReducer(state, action) {
    return _authReducer(state, action);
}