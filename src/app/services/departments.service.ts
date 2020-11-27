import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Department } from '../models/department.model';
import { map } from 'rxjs/operators';

/**
 * Departments service
 */
@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  /**
   * Constructor
   * @param firestore 
   */
  constructor(private firestore: AngularFirestore) { }
  /**
   * Adds a new department object to the collection
   * @param department department object
   * @return Promise
   */
  createDepartment(department: Department) {
    delete department.id;
    return this.firestore.firestore.collection('departments').add({...department});
  }
  /**
   * Sets the modified object in his document by the ID
   * @param department department object
   * @return Promise
   */
  modifyDepartment(department: Department) {
    const id = department.id;
    delete department.id;
    return this.firestore.firestore.doc(`departments/${id}`).set({...department});
  }
  /**
   * Creates a listener with snapshotchanges for the departments collection
   */
  initDepartmentsListener() {
    return this.firestore.collection(`departments`).snapshotChanges().pipe(
      map(snapshot => snapshot.map(doc =>  ({id: doc.payload.doc.id, ...doc.payload.doc.data() as any}) ))
    );
  }
  /**
   * Deletes a department
   * @param id department ID from firebase
   */
  deleteDepartment(id: string) {
    return this.firestore.doc(`departments/${id}`).delete();
  }

}
