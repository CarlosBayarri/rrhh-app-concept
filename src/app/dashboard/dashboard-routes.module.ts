import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StaffFormComponent } from './staff/staff-form/staff-form.component';
import { DepartmentsFormComponent } from './departments/departments-form/departments-form.component';
import { HomeComponent } from './home/home.component';
 
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'new-employee', component: StaffFormComponent },
      { path: 'edit-employee/:id', component: StaffFormComponent },
      { path: 'new-department', component: DepartmentsFormComponent },
      { path: 'edit-department/:id', component: DepartmentsFormComponent }
    ]
}
]
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
