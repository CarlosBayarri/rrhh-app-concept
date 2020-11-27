import { createAction } from '@ngrx/store';

/**
 * Action: Start loading
 * @param {string} type  Action type
 * @param {string} props  Optional parameters
 * @returns Action
 */
export const isLoading = createAction('[UI Component] isLoading');


/**
 * Action: Stop loading
 * @param {string} type  Action type
 * @param {string} props  Optional parameters
 * @returns Action
 */
export const stopLoading = createAction('[UI] Component] stopLoading');
