import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

/**
 * Action: set user
 * @param {string} type  Action type
 * @param {string} props  Optional parameters
 * @returns Action
 */
export const setUser = createAction('[Auht] setUser', props<{ user: User}>());

/**
 * Action: un set user
 * @param {string} type  Action type
 * @param {string} props  Optional parameters
 * @returns Action
 */
export const unSetUser = createAction('[Auht] unSetUser');