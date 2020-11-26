import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { DepartmentsService } from '../../../services/departments.service';
import { Department } from '../../../models/department.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.scss']
})
export class DepartmentsListComponent implements OnInit, OnDestroy {

  departments: Department[] = [];
  private departmentsSubscription: Subscription;

  constructor(private store: Store<AppState>, private departmentsService: DepartmentsService, private router: Router) { }

  ngOnInit(): void {
    this.departmentsSubscription = this.store.select('departments').subscribe(({departments}) => this.departments = departments);
  }

  addDepartment() {
  this.router.navigate(['new-department']);
  }
  editDepartment(department: Department) {
    this.router.navigate(['edit-department', department]);
  }
  deleteDepartment(department: Department) {
    this.departmentsService.deleteDepartment(department.id).then(() => {
      Swal.fire('Deleted', 'Department deleted', 'success');
    }).catch(err => {
      Swal.fire('Error', err.message, 'error');
    })
  }

  ngOnDestroy() {
    this.departmentsSubscription.unsubscribe();
  }

}
