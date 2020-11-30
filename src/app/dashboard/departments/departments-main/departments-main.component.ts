import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Department } from 'src/app/models/department.model';

@Component({
  selector: 'app-departments-main',
  templateUrl: './departments-main.component.html',
  styleUrls: ['./departments-main.component.scss']
})
export class DepartmentsMainComponent implements OnInit {
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
