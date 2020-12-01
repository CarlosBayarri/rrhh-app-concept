/**
 * User model
 */
export class User {

    /**
     * Get user object
     * @param param0 Input params
     * @return USer objetc
     */
    static fromFirebase({uid, name, email, employee, department, bookmarks}) {

        return new User(uid, name, email, employee, department, bookmarks);
    }
    /**
     * Constructor
     * @param uid UID from firebase
     * @param name User name
     * @param email email
     * @param employee Employee ID
     * @param department Department ID
     * @param bookmarks Save publications
     */
    constructor( public uid: string, public name: string, public email: string, public employee: string, public department: string, public bookmarks: string[]) {}
    
}