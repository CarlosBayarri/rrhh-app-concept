import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as authActions from '../actions';

export interface AuthState {
    user: User; 
}

export const AuthInitialState: AuthState = {
   user: null,
}

const _authReducer = createReducer(AuthInitialState,

    on(authActions.setUser, (state, {user}) => ({ ...state, user: {...user}})),
    on(authActions.unSetUser, (state) => ({ ...state, user: null})),

);

export function authReducer(state, action) {
    return _authReducer(state, action);
}