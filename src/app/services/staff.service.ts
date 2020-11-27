import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from '../models/employee.model';
import { map } from 'rxjs/operators';

/**
 * Staff service
 */
@Injectable({
  providedIn: 'root'
})
export class StaffService {
  /**
   * Constructor
   * @param firestore 
   */
  constructor(private firestore: AngularFirestore) { }
  /**
   * Adds a new employee object to the staff collection
   * @param employee employee object
   * @returns Promise
   */
  createEmployee(employee: Employee) {
    delete employee.id;
    return this.firestore.firestore.collection('staff').add({...employee});
  }
  /**
   * Sets a employee object from the document
   * @param employee employee object
   * @returns Promise
   */
  modifyEmployee(employee: Employee) {
    const id = employee.id;
    delete employee.id;
    return this.firestore.firestore.doc(`staff/${id}`).set({...employee});
  }
  /**
   * Creates a listener with snapshotchanges for the staff collection
   */
  initstaffListener() {
    return this.firestore.collection(`staff`).snapshotChanges().pipe(
      map(snapshot => snapshot.map(doc =>  ({id: doc.payload.doc.id, ...doc.payload.doc.data() as any}) ))
    );
  }
  /**
   * Deletes a employee from the document
   * @param id employee Id from firebase
   * @returns Promise
   */
  deleteEmployee(id: string) {
    return this.firestore.doc(`staff/${id}`).delete();
  }

}
