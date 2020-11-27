import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { StaffService } from '../../../services/staff.service';
import { Employee } from '../../../models/employee.model';
import * as actions from '../../../store/actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from '../../../models/department.model';
/**
 * Staff form component
 */
@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit, OnDestroy {
  /** Id from employee */
  public id: string;
  /** Form group */
  public employeeForm: FormGroup;
  /** loading variable for ui state */
  public loading: boolean = false;
  /** loading subscription */
  public loadingSubscription: Subscription;
  /** Departments subscription */
  public departmentsSubscription: Subscription;
  /** Staff subscription */
  public staffSubscription: Subscription;
  /** Departments variable to manage all the departments */
  public departments: Department[] = [];
  /** Subscription to get the ID from de route (if there is an ID) */
  private activeRoutingSubscription: Subscription;
  /**
   * Constructor
   * @param fb 
   * @param staffService 
   * @param store 
   * @param router 
   * @param route 
   */
  constructor(private fb: FormBuilder, private staffService: StaffService, private store: Store<AppState>, private router: Router, private route: ActivatedRoute) { }
  /**
   * Saves the employee data, creating a new one or modifying the existing one
   */
  save() {
    if (this.employeeForm.invalid) return;
    const {name, last_name, age, department} = this.employeeForm.value;
    const date_discharge = new Date();
    let employee;
    this.store.dispatch(actions.isLoading());
    if (this.id) {
      employee = new Employee(name, last_name, age, department, date_discharge, this.id);
      this.staffService.modifyEmployee(employee).then(() => {
        Swal.fire('Employee modified', employee.name + ' ' + employee.last_name, 'success');
        this.store.dispatch(actions.stopLoading());
        this.employeeForm.reset();
        this.router.navigate(['/']);
      }).catch(err => {
        this.store.dispatch(actions.stopLoading());
        Swal.fire('Error', err, 'error');
      });
    } else {
      employee = new Employee(name, last_name, age, department, date_discharge);
      this.staffService.createEmployee(employee).then(() => {
        Swal.fire('Employee created', employee.name + ' ' + employee.last_name, 'success');
        this.store.dispatch(actions.stopLoading());
        this.employeeForm.reset();
        this.router.navigate(['/']);
      }).catch(err => {
        this.store.dispatch(actions.stopLoading());
        Swal.fire('Error', err, 'error');
      });
    }
  }
  /** OnInit life cycle */
  ngOnInit() {
    this.loadingSubscription = this.store.select('ui').subscribe(({isLoading}) => this.loading = isLoading);
    this.departmentsSubscription = this.store.select('departments').subscribe(({departments}) => this.departments = departments);
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      age: [null, Validators.required],
      department: ['', Validators.required]
    })
    this.activeRoutingSubscription = this.route.params.subscribe(params => {
      this.id = params['id']; 
      this.staffSubscription = this.store.select('staff').subscribe(({staff}) => 
        staff.map(employee => { if (employee.id === this.id) {
          this.employeeForm.setValue({name: employee.name, last_name: employee.last_name, age: employee.age, department: employee.department});
        }})
      );
    });
  }
  /** OnDestroy */
  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
    this.departmentsSubscription.unsubscribe();
    this.activeRoutingSubscription.unsubscribe();
    this.staffSubscription.unsubscribe();
  }

}
