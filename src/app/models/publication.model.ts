import { Like } from './like.model';

/**
 * Publication model
 */
export class Publication {
/**
 * Constructor
 * @param info name of publication
 * @param likes likes of publication
 * @param employee ID of the employee
 * @param department ID of the department
 * @param date date object automated when is created
 * @param id ID from firebase
 */
    constructor(        
        public info: string, 
        public likes: Like[], 
        public employee: string,
        public department: string,
        public date: Date,
        public id?: string) {}
}