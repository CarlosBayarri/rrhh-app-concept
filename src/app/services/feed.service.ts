import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Publication } from '../models/publication.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

    /**
   * Constructor
   * @param firestore 
   */
  constructor(private firestore: AngularFirestore) { }
  /**
   * Adds a new publication object to the feed collection
   * @param publication publication object
   * @returns Promise
   */
  createPublication(publication: Publication) {
    delete publication.id;
    return this.firestore.firestore.collection('feed').add({...publication});
  }
  /**
   * Sets a publication object from the document
   * @param publication publication object
   * @returns Promise
   */
  modifyPublication(publication: Publication) {
    const id = publication.id;
    delete publication.id;
    return this.firestore.firestore.doc(`feed/${id}`).set({...publication});
  }
  /**
   * Creates a listener with snapshotchanges for the feed collection
   */
  initFeedListener() {
    return this.firestore.collection(`feed`).snapshotChanges().pipe(
      map(snapshot => snapshot.map(doc =>  ({id: doc.payload.doc.id, ...doc.payload.doc.data() as any}) ))
    );
  }
  /**
   * Deletes a publication from the document
   * @param id publication Id from firebase
   * @returns Promise
   */
  deletePublication(id: string) {
    return this.firestore.doc(`feed/${id}`).delete();
  }

  bookmarkPublication(id: string, user: User) {
    user.bookmarks = [id, ...user.bookmarks];
    return this.firestore.doc(`users/${user.uid}`).set(user);
  }

  unbookmarkPublication(id: string, user: User) {
    const index = user.bookmarks.indexOf(id, 0);
    if (index > -1) {
      const bookmarks = [...user.bookmarks];
      bookmarks.splice(index, 1);
      user.bookmarks = [...bookmarks];
    }
    return this.firestore.doc(`users/${user.uid}`).set(user);
  }

}
