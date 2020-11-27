import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Department } from '../../../models/department.model';
import { Router } from '@angular/router';
/**
 * Departments list component
 */
@Component({
  selector: 'app-departments-list',
  templateUrl: './departments-list.component.html',
  styleUrls: ['./departments-list.component.scss']
})
export class DepartmentsListComponent implements OnInit, OnDestroy {
  /** Departments variable to manage the departments state */
  departments: Department[] = [];
  /** departments subscription */
  private departmentsSubscription: Subscription;
  /**
   * Constructor
   * @param store App store
   * @param router 
   */
  constructor(private store: Store<AppState>, private router: Router) { }
  /** OnInit life cycle */
  ngOnInit(): void {
    this.departmentsSubscription = this.store.select('departments').subscribe(({departments}) => this.departments = departments);
  }
  /** Navigates to the departments form component */
  addDepartment() {
    this.router.navigate(['new-department']);
  }
  /** OnDestroy life cycle */
  ngOnDestroy() {
    this.departmentsSubscription.unsubscribe();
  }

}
