import { createAction, props } from '@ngrx/store';
import { Publication } from '../../models/publication.model';

/**
 * Action: Set feed
 * @param {string} type  Action type
 * @param {string} props  Optional parameters
 * @returns Action
 */
export const setFeed = createAction('[Feed] setFeed', props<{ feed: Publication[]}>());

/**
 * Action: Un set feed
 * @param {string} type  Action type
 * @param {string} props  Optional parameters
 * @returns Action
 */
export const unSetFeed = createAction('[Feed] unSetFeed');