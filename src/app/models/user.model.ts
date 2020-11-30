/**
 * User model
 */
export class User {

    /**
     * Get user object
     * @param param0 Input params
     * @return USer objetc
     */
    static fromFirebase({uid, email, employee, department, bookmarks}) {

        return new User(uid, email, employee, department, bookmarks);
    }
    /**
     * Constructor
     * @param uid UID from firebase
     * @param email email
     * @param employee Employee ID
     * @param department Department ID
     * @param bookmarks Save publications
     */
    constructor( public uid: string, public email: string, public employee: string, public department: string, public bookmarks: string[]) {}
    
}