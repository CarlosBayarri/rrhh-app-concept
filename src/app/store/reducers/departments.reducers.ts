import { createReducer, on } from '@ngrx/store';
import { Department } from '../../models/department.model';
import * as departmentsActions from '../actions';

/**
 * Department state interface
 */
export interface DepartmentsState {
    /**
     * departments declaration, department model
     */
    departments: Department[]; 
}

/**
 * Initial state deparments = []
 */
export const DepartmentsInitialState: DepartmentsState = {
    departments: [],
}

/**
 * Creates a reducer function to handle state transitions.
 * Reducer creators reduce the explicitness of reducer functions with switch statements.
 * @param initialState — Provides a state value if the current state is undefined, as it is initially.
 * @param ons — Associations between actions and state changes.
 * @returns — A reducer function.
 */
const _departmentsReducer = createReducer(DepartmentsInitialState,

    on(departmentsActions.setDepartments, (state, {departments}) => ({ ...state, departments: [...departments]})),
    on(departmentsActions.unSetDepartments, (state) => ({ ...state, departments: []})),

);

/**
 * Exports departments reducer
 * @param state - Initial state
 * @param action - Actions
 * @returns — Reducer
 */
export function departmentsReducer(state, action) {
    return _departmentsReducer(state, action);
}