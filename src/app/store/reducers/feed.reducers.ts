import { createReducer, on } from '@ngrx/store';
import * as feedActions from '../actions';
import { Publication } from '../../models/publication.model';

/**
 * Feed state interface
 */
export interface FeedState {
    /**
     * feed declaration, employee model
     */
    feed: Publication[]; 
}

/**
 * initial state feed = []
 */
export const FeedInitialState: FeedState = {
    feed: [],
}

/**
 * Creates a reducer function to handle state transitions.
 * Reducer creators reduce the explicitness of reducer functions with switch statements.
 * @param initialState — Provides a state value if the current state is undefined, as it is initially.
 * @param ons — Associations between actions and state changes.
 * @returns — A reducer function.
 */
const _feedReducer = createReducer(FeedInitialState,

    on(feedActions.setFeed, (state, {feed}) => ({ ...state, feed: [...feed]})),
    on(feedActions.unSetFeed, (state) => ({ ...state, feed: []})),

);

/**
 * Exports feed reducer
 * @param state - Initial state
 * @param action - Actions
 * @returns — Reducer
 */
export function feedReducer(state, action) {
    return _feedReducer(state, action);
}