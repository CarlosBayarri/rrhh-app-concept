/**
 * User model
 */
export class User {

    /**
     * Get user object
     * @param param0 Input params
     * @return USer objetc
     */
    static fromFirebase({uid, name, email}) {

        return new User(uid,name, email);
    }
    /**
     * Constructor
     * @param uid UID from firebase
     * @param name username
     * @param email email
     */
    constructor( public uid: string, public name: string, public email: string) {}
    
}