import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { DepartmentsService } from '../../../services/departments.service';
import { Department } from '../../../models/department.model';
import { Router } from '@angular/router';
import { Employee } from '../../../models/employee.model';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent implements OnInit, OnDestroy {

  staff: Employee[] = [];
  private staffSubscription: Subscription;

  constructor(private store: Store<AppState>, private staffService: StaffService, private router: Router) { }

  ngOnInit(): void {
    this.staffSubscription = this.store.select('staff').subscribe(({staff}) => this.staff = staff);
  }

  addEmployee() {
  this.router.navigate(['new-employee']);
  }
  editEmployee(employee: Employee) {
    this.router.navigate(['edit-employee', employee]);
  }
  deleteEmployee(employee: Employee) {
    this.staffService.deleteEmployee(employee.id).then(() => {
      Swal.fire('Deleted', 'Employee deleted', 'success');
    }).catch(err => {
      Swal.fire('Error', err.message, 'error');
    })
  }

  ngOnDestroy() {
    this.staffSubscription.unsubscribe();
  }


}
