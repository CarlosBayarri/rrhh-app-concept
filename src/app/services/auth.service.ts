import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { User } from '../models/user.model';
import * as actions from '../store/actions';

/**
 * Authentication service
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * User subscription
   */
  private userSubscription: Subscription;
  /**
   * user variable
   */
  private _user: User;
  /**
   * user function to get faster user variable
   */
  get user() {
    return {...this._user};
  }
  /**
   * Constructor
   * @param auth 
   * @param firestore 
   * @param store 
   */
  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore, private store: Store<AppState>) { }

  /**
   * Subscription to database and auth changes
   */
  initAuthListener() {
    this.auth.authState.subscribe(fuser => {
      if (fuser) {
        this.userSubscription = this.firestore.doc(`users/${fuser.uid}`).valueChanges().subscribe((fuser2: any) => {
          const user = User.fromFirebase(fuser2);
          this._user = user;
          this.store.dispatch(actions.setUser({user}));
        })
      } else {
        this.store.dispatch(actions.unSetUser());
        this.store.dispatch(actions.unSetDepartments());
        this.store.dispatch(actions.unSetStaff());
        this._user = null;
        if (this.userSubscription) this.userSubscription.unsubscribe();
      }
    })
  }
  /**
   * Runs login
   * @param email user email
   * @param password user password
   */
  loginUser(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  /**
   * Runs create user
   * @param name user name
   * @param email user email
   * @param password password email
   */
  createUser(name: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(fuser => {
      const newUser = new User(fuser.user.uid, name, email);
      return this.firestore.doc(`users/${fuser.user.uid}`).set({...newUser}); // Firebase does not accept clases, only objects
    });
  }
  /**
   * Runs logout
   */
  logOut() {
    return this.auth.signOut();
  }
  /**
   * Verify the auth state
   */
  isAuth() {
    return this.auth.authState.pipe(
      map(fuse => fuse != null)
    );
  }

}
