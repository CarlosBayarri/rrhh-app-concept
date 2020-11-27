import { createReducer, on } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import * as staffActions from '../actions';

/**
 * Staff state interface
 */
export interface StaffState {
    /**
     * staff declaration, employee model
     */
    staff: Employee[]; 
}

/**
 * initial state staff = []
 */
export const StaffInitialState: StaffState = {
    staff: [],
}

/**
 * Creates a reducer function to handle state transitions.
 * Reducer creators reduce the explicitness of reducer functions with switch statements.
 * @param initialState — Provides a state value if the current state is undefined, as it is initially.
 * @param ons — Associations between actions and state changes.
 * @returns — A reducer function.
 */
const _staffReducer = createReducer(StaffInitialState,

    on(staffActions.setStaff, (state, {staff}) => ({ ...state, staff: [...staff]})),
    on(staffActions.unSetStaff, (state) => ({ ...state, staff: []})),

);

/**
 * Exports staff reducer
 * @param state - Initial state
 * @param action - Actions
 * @returns — Reducer
 */
export function staffReducer(state, action) {
    return _staffReducer(state, action);
}