import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Employee } from '../models/employee.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private firestore: AngularFirestore) { }

  createEmployee(employee: Employee) {
    return this.firestore.firestore.collection('staff').add({...employee});
  }

  modifyEmployee(employee: Employee) {
    const id = employee.id;
    delete employee.id;
    return this.firestore.firestore.doc(`staff/${id}`).set({...employee});
  }

  initstaffListener() {
    return this.firestore.collection(`staff`).snapshotChanges().pipe(
      map(snapshot => snapshot.map(doc =>  ({id: doc.payload.doc.id, ...doc.payload.doc.data() as any}) ))
    );
  }

  deleteEmployee(id: string) {
    return this.firestore.doc(`staff/${id}`).delete();
  }

}
