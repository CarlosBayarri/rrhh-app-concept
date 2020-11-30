import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { DepartmentsService } from '../services/departments.service';
import { StaffService } from '../services/staff.service';
import * as actions from '../store/actions';
import { FeedService } from '../services/feed.service';
/**
 * Dashboard component
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  /** User subscription */
  private userSubscription: Subscription;
  /** Deparments subscription */
  private departmentsSubscription: Subscription;
  /** Staff subscription */
  private staffSubscription: Subscription;
  /** Feed subscription */
  private feedSubscription: Subscription;
  /**
   * Construction
   * @param store 
   * @param departmentsService 
   * @param staffService 
   * @param feedService 
   */
  constructor(private store: Store<AppState>, private departmentsService: DepartmentsService, private staffService: StaffService, private feedService: FeedService) { }
  /** OnInit life cycle */
  ngOnInit(): void {
    this.userSubscription = this.store.select('user').pipe(filter((user0: any) => user0.user !== null)).subscribe(({user}) => {
      this.departmentsSubscription = this.departmentsService.initDepartmentsListener().subscribe(departments => {
        this.store.dispatch(actions.setDepartments({departments: departments}))
      });
      this.staffSubscription = this.staffService.initstaffListener().subscribe(staff => {
        this.store.dispatch(actions.setStaff({staff: staff}))
      });
      this.feedSubscription = this.feedService.initFeedListener().subscribe(feed => {
        this.store.dispatch(actions.setFeed({feed: feed}))
      });
    })
  }
  /** OnDestroy life cycle */
  ngOnDestroy() {
    this.userSubscription?.unsubscribe();
    this.departmentsSubscription?.unsubscribe();
    this.staffSubscription?.unsubscribe();
    this.feedSubscription?.unsubscribe();
  }

}
