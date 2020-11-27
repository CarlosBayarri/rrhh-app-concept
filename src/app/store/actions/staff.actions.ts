import { createAction, props } from '@ngrx/store';
import { Employee } from '../../models/employee.model';

/**
 * Action: Set staff
 * @param {string} type  Action type
 * @param {string} props  Optional parameters
 * @returns Action
 */
export const setStaff = createAction('[Dept] setStaff', props<{ staff: Employee[]}>());

/**
 * Action: Un set staff
 * @param {string} type  Action type
 * @param {string} props  Optional parameters
 * @returns Action
 */
export const unSetStaff = createAction('[Dept] unSetStaff');