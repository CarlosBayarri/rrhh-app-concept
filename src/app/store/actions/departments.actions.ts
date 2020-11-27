import { createAction, props } from '@ngrx/store';
import { Department } from '../../models/department.model';

/**
 * Action: set Departments
 * @param {string} type  Action type
 * @param {string} props  Optional parameters
 * @returns Action
 */
export const setDepartments = createAction('[Dept] setDepartments', props<{ departments: Department[]}>());

/**
 * Action: Un set departments
 * @param {string} type  Action type
 * @param {string} props  Optional parameters
 * @returns Action
 */
export const unSetDepartments = createAction('[Dept] unSetDepartments');