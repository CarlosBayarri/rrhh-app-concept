import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { StaffService } from '../../../services/staff.service';
import { Employee } from '../../../models/employee.model';
import * as actions from '../../../store/actions';
import { Router } from '@angular/router';
import { Department } from '../../../models/department.model';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit {

  public id: string;
  public employeeForm: FormGroup;
  public loading: boolean = false;
  public loadingSubscription: Subscription;
  public departmentsSubscription: Subscription;
  public departments: Department[] = [];

  constructor(private fb: FormBuilder, private staffService: StaffService, private store: Store<AppState>, private router: Router) { }

  save() {
    if (this.employeeForm.invalid) return;
    const {name, last_name, age, department} = this.employeeForm.value;
    const date_discharge = new Date();
    const employee = new Employee(null, name, last_name, age, department, date_discharge);
    if (employee.id) delete employee.id;
    this.store.dispatch(actions.isLoading());

    if (this.id) {
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
  ngOnInit() {

    this.loadingSubscription = this.store.select('ui').subscribe(({isLoading}) => this.loading = isLoading);
    this.departmentsSubscription = this.store.select('departments').subscribe(({departments}) => this.departments = departments);
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      age: [null, Validators.required],
      department: ['', Validators.required]
    })
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
    this.departmentsSubscription.unsubscribe();
  }

}
