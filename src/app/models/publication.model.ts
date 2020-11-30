/**
 * Publication model
 */
export class Publication {
/**
 * Constructor
 * @param info name of publication
 * @param likes last name of employee
 * @param user ID of the user asigned
 * @param date date object automated when is created
 * @param id ID from firebase
 */
    constructor(        
        public info: string, 
        public likes: number, 
        public user: string,
        public date: Date,
        public id?: string) {}
}