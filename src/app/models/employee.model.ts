/**
 * Employee model
 */
export class Employee {
/**
 * Constructor
 * @param name name of employee
 * @param last_name last name of employee
 * @param age age of employee
 * @param department ID of the department asigned
 * @param date_discharge date object automated when is created
 * @param image Employee image
 * @param uid UID from Auth
 * @param id ID from firebase
 */
    constructor(        
        public name: string, 
        public last_name: string, 
        public age: number,
        public department: string,
        public date_discharge: Date,
        public image: string,
        public uid: string,
        public id?: string) {}
}