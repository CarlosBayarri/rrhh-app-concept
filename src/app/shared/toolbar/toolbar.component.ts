import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../../services/auth.service';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';

/**
 * Toolbar component
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  /**
   * Employee public variable
   */
  employee: Employee;
  /**
   * Staff subscription
   */
  staffSubscription: Subscription;
  /**
   * Department public variable
   */
  department: Department;
  /**
   * Constructor of toolbar component
   * @param store
   * @param AuthService 
   * @param router 
   */
  constructor(private store: Store<AppState>, private AuthService: AuthService, private router: Router) { }

  /**
   * Logout function from authService to signout
   */
  logOut() {
    this.AuthService.logOut().then(() => {
      this.router.navigate(['/login']);
    })
  }
  /**
   * onInit lifecycle
   */
  ngOnInit() {
    /*this.userSubscription = this.store.select('user').pipe(filter(({user}) => user !== null)).subscribe(({user}) => {
      this.user = user;
    })*/
    this.staffSubscription = this.store.subscribe(({staff, departments}) => {
      staff.staff.map(employee => {
        if (employee.id === this.AuthService.user.employee) {
          this.employee = employee;
          departments.departments.map(department => {
            if (this.employee && department.id === this.employee.department) {
              this.department = department;
            }
          })
        }
      })
    });
  }
  /**
   * onDestroy life cycle
   */
  ngOnDestroy() {
    this.staffSubscription.unsubscribe();
  }


}
