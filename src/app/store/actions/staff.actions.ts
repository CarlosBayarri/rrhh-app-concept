import { createAction, props } from '@ngrx/store';
import { Employee } from '../../models/employee.model';

export const setStaff = createAction('[Dept] setStaff', props<{ staff: Employee[]}>());

export const unSetStaff = createAction('[Dept] unSetStaff');