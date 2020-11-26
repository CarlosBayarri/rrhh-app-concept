import { createReducer, on } from '@ngrx/store';
import { Department } from '../../models/department.model';
import * as departmentsActions from '../actions';

export interface DepartmentsState {
    departments: Department[]; 
}

export const DepartmentsInitialState: DepartmentsState = {
    departments: [],
}

const _departmentsReducer = createReducer(DepartmentsInitialState,

    on(departmentsActions.setDepartments, (state, {departments}) => ({ ...state, departments: [...departments]})),
    on(departmentsActions.unSetDepartments, (state) => ({ ...state, departments: []})),

);

export function departmentsReducer(state, action) {
    return _departmentsReducer(state, action);
}