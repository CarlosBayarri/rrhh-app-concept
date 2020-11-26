import { createAction, props } from '@ngrx/store';
import { Department } from '../../models/department.model';

export const setDepartments = createAction('[Dept] setDepartments', props<{ departments: Department[]}>());

export const unSetDepartments = createAction('[Dept] unSetDepartments');