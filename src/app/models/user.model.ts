/**
 * User model
 */
export class User {

    /**
     * Get user object
     * @param param0 Input params
     * @return USer objetc
     */
    static fromFirebase({uid, name, email, photoUrl, displayName}) {

        return new User(uid,name, email, photoUrl, displayName);
    }
    /**
     * Constructor
     * @param uid UID from firebase
     * @param name username
     * @param email email
     * @param photoURL User image
     * @param displayName Username
     */
    constructor( public uid: string, public name: string, public email: string, public photoUrl: string, public displayName: string) {}
    
}