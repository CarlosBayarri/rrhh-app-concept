import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from '../../models/user.model';
import { Employee } from '../../models/employee.model';
import { Subscription } from 'rxjs';
import { Department } from '../../models/department.model';
import { Publication } from 'src/app/models/publication.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  public user: User;
  public employee: Employee;
  public department: Department;
  private storeSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {

    this.storeSubscription = this.store.subscribe(({user, staff, departments}) => {
      this.user = user.user;
      if (user.user) {
        staff.staff.map((employee: Employee) => { 
          if (employee.id === user.user.employee) {
            this.employee = employee;
            this.department = departments.departments.map((department: Department) => { if(department.id === this.employee.department) {return department;}}).filter(res=>res)[0];
          }
        });
      }
    });

  }

  ngOnDestroy() {
    this.storeSubscription?.unsubscribe();
  }

}
