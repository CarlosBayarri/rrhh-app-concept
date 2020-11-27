import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StaffService } from 'src/app/services/staff.service';
import Swal from 'sweetalert2';
import { Employee } from '../../../models/employee.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
/**
 * Staff child component
 */
@Component({
  selector: 'app-staff-child',
  templateUrl: './staff-child.component.html',
  styleUrls: ['./staff-child.component.scss']
})
export class StaffChildComponent implements OnInit {
  /** Input variable to declare the employee object from the list */
  @Input() employee: Employee;
  /** Employee name */
  public name;
  /** Employee last name */
  public last_name;
  /** Employee age */
  public age;
  /** Employee discharge date */
  public date_discharge;
  /** Department to which the employee belongs */
  public department;
  /** Department subscription to the departments state */
  public departmentsSubscription: Subscription;
  /**
   * Constructor
   * @param staffService 
   * @param router 
   * @param store Application store
   */
  constructor(private staffService: StaffService, private router: Router, public store: Store<AppState>) { }
  /**
   * Navigates to the staff form component with the employee ID
   * @param employee Employee object
   */
  editEmployee(employee: Employee) {
    this.router.navigate(['edit-employee', employee.id]);
  }
  /**
   * Deletes an employee calling the service if it is confirmed
   * @param employee Employee object
   */
  deleteEmployee(employee: Employee) {
    const this_ = this;
    Swal.fire({
      title: "Are you sure?", text: "You will not be able to recover it!", icon: "warning", showDenyButton: true, denyButtonText: `No please`, confirmButtonText: `Sure`
    }).then(function(result) {
      if (result.isConfirmed) {
        this_.staffService.deleteEmployee(employee.id).then(() => {
          Swal.fire('Deleted', 'Employee deleted', 'success');
        }).catch(err => {
          Swal.fire('Error', err.message, 'error');
        });

      }
    })
  }
  /** OnInit life cycle */
  ngOnInit(): void {
    this.name = this.employee.name;
    this.last_name = this.employee.last_name;
    this.age = this.employee.age;
    const date:any = this.employee.date_discharge;
    this.date_discharge = date.toDate();
    this.departmentsSubscription = this.store.select('departments').subscribe(({departments}) => 
        departments.map(department => { if (department.id === this.employee.department) {
            this.department = department.name;
        }})
      );
  }
  /** OnDestroy life cycle */
  ngOnDestroy() {
    this.departmentsSubscription.unsubscribe();
  }

}
