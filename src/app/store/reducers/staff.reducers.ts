import { createReducer, on } from '@ngrx/store';
import { Employee } from '../../models/employee.model';
import * as staffActions from '../actions';

export interface StaffState {
    staff: Employee[]; 
}

export const StaffInitialState: StaffState = {
    staff: [],
}

const _staffReducer = createReducer(StaffInitialState,

    on(staffActions.setStaff, (state, {staff}) => ({ ...state, staff: [...staff]})),
    on(staffActions.unSetStaff, (state) => ({ ...state, staff: []})),

);

export function staffReducer(state, action) {
    return _staffReducer(state, action);
}