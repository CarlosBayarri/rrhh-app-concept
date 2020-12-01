import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from '../../../models/user.model';
import { Employee } from '../../../models/employee.model';
import { Subscription } from 'rxjs';
import { Department } from '../../../models/department.model';
import { Publication } from 'src/app/models/publication.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.scss']
})
export class ProfileMainComponent implements OnInit {

  public id: string;
  public user: User;
  public employee: Employee;
  public department: Department;
  private storeSubscription: Subscription;
  private activeRouteSubscription: Subscription;
  public editable: boolean = false;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRouteSubscription = this.route.params.subscribe(params => {
      this.id = params['id']; 
    });
    this.storeSubscription = this.store.subscribe(({user, staff, departments}) => {
      this.user = user.user;
      if (user.user) {
        staff.staff.map((employee: Employee) => { 
          if (this.id) {
            if (employee.id === this.id) {
              this.editable = false;
              this.employee = employee;
              const date:any = this.employee.date_discharge;
              const employee1 = {...this.employee};
              employee1.date_discharge = date.toDate();
              this.employee = {...employee1};
              this.department = departments.departments.map((department: Department) => { if(department.id === this.employee.department) {return department;}}).filter(res=>res)[0];
            }
          } else {
            if (employee.id === user.user.employee) {
              this.editable = true;
              this.employee = employee;
              const date:any = this.employee.date_discharge;
              const employee1 = {...this.employee};
              employee1.date_discharge = date.toDate();
              this.employee = {...employee1};
              this.department = departments.departments.map((department: Department) => { if(department.id === this.employee.department) {return department;}}).filter(res=>res)[0];
            }
          }
          
        });
      }
    });

  }

  ngOnDestroy() {
    this.storeSubscription?.unsubscribe();
    this.activeRouteSubscription?.unsubscribe();
  }

}
