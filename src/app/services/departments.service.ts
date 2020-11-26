import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Department } from '../models/department.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private firestore: AngularFirestore) { }

  createDepartment(department: Department) {
    return this.firestore.firestore.collection('departments').add({...department});
  }

  modifyDepartment(department: Department) {
    const id = department.id;
    delete department.id;
    return this.firestore.firestore.doc(`departments/${id}`).set({...department});
  }

  initDepartmentsListener() {
    return this.firestore.collection(`departments`).snapshotChanges().pipe(
      map(snapshot => snapshot.map(doc =>  ({id: doc.payload.doc.id, ...doc.payload.doc.data() as any}) ))
    );
  }

  deleteDepartment(id: string) {
    return this.firestore.doc(`departments/${id}`).delete();
  }

}
