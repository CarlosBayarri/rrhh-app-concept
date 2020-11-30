import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  /** Employee object */
  public employee: Employee;
  /** Staff subscription */
  private staffSubscription: Subscription;
    /** Department object */
    public department: Department;
  /**
   * Constructor
   * @param store Store
   */
  constructor(private store: Store<AppState>, private authService: AuthService) { }
  /** On init life cycle */
  ngOnInit(): void {
    this.staffSubscription = this.store.subscribe(({staff, departments}) => {
      staff.staff.map(employee => {
        if (employee.id === this.authService.user.employee) {
          this.employee = employee;
          departments.departments.map(department => {
            if (this.employee && department.id === this.employee.department) {
              this.department = department;
            }
          })
        }
      })
    });
    /*this.staffSubscription = this.store.select('staff').subscribe(({staff}) => {
      staff.map(employee => {
        if (employee.id === this.authService.user.employee) {
          this.employee = employee;
        }
      })
    });
    this.departmentSubscription = this.store.select('departments').subscribe(({departments})=> {
      departments.map(department => {
        if (this.employee && department.id === this.employee.department) {
          this.department = department;
        }
      })
    });*/
  }
  /** on destroy life cycle */
  ngOnDestroy() {
    this.staffSubscription.unsubscribe();
  }

}
