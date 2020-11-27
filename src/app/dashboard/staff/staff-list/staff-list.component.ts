import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Department } from '../../../models/department.model';
import { Router } from '@angular/router';
import { Employee } from '../../../models/employee.model';
/**
 * Staff list component
 */
@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit, OnDestroy {
  /** Staff variable to manage all the employees */
  staff: Employee[] = [];
  /** Staff subscription */
  private staffSubscription: Subscription;
  /** Filter variable */
  public filter = 'name';
  /** Departments subscription */
  public departmentsSubscription: Subscription;
  /** Departments variable to manage all the departments */
  public departments: Department[];
  /** Input variable to filter staff by name */
  public search_name;
  /** Input variable to filter staff by department */
  public search_department;
  /** Input variable to filter staff by date */
  public search_date;
  /**
   * Constructor
   * @param store 
   * @param router 
   */
  constructor(private store: Store<AppState>, private router: Router) { }
  /**
   * Filters the staff list by means of the filter variable and search inputs
   * @param employee Employee object
   */
  filterStaff(employee) {
    switch (this.filter) {
      case 'name':
        if (this.search_name) {
          const name = employee.name + ' ' + employee.last_name;
          if (name.toLowerCase().indexOf(this.search_name.toLowerCase()) > -1) {
            return true
          } else {
            return false
          }
        } else {
          return true;
        }
      case 'department':
        if (this.search_department) {
          if (this.search_department === employee.department) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      case 'date':
        if (this.search_date) {
          let date_1 = employee.date_discharge;
          date_1 = date_1.toDate();
          let date_2 = new Date(this.search_date);
          console.log(date_1, date_2);
          if (date_1 >= date_2) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
        
      default:
        return false
    }
  }
  /** OnInit life cycle */
  ngOnInit(): void {
    this.staffSubscription = this.store.select('staff').subscribe(({staff}) => this.staff = staff);
    this.departmentsSubscription = this.store.select('departments').subscribe(({departments}) => this.departments = departments);
  }
  /** Navigates to the staff form component */
  addEmployee() {
  this.router.navigate(['new-employee']);
  }
  /** OnDestroy life cycle */
  ngOnDestroy() {
    this.staffSubscription.unsubscribe();
    this.departmentsSubscription.unsubscribe();
  }


}
