import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { DepartmentsService } from '../services/departments.service';
import { StaffService } from '../services/staff.service';
import * as actions from '../store/actions';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  private departmentsSubscription: Subscription;
  private staffSubscription: Subscription;
  
  constructor(private store: Store<AppState>, private departmentsService: DepartmentsService, private staffService: StaffService) { }

  ngOnInit(): void {

    this.userSubscription = this.store.select('user').pipe(filter((user0: any) => user0.user !== null)).subscribe(({user}) => {
      this.departmentsSubscription = this.departmentsService.initDepartmentsListener().subscribe(departments => {
        this.store.dispatch(actions.setDepartments({departments: departments}))
      });
      this.staffSubscription = this.staffService.initstaffListener().subscribe(staff => {
        this.store.dispatch(actions.setStaff({staff: staff}))
      });
    })

  }
  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.departmentsSubscription?.unsubscribe();
    this.staffSubscription?.unsubscribe();
  }

}
