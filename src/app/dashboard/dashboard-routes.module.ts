import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { StaffFormComponent } from './staff/staff-form/staff-form.component';
import { DepartmentsFormComponent } from './departments/departments-form/departments-form.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { DepartmentsMainComponent } from './departments/departments-main/departments-main.component';
import { FeedBookmarksComponent } from './feed/feed-bookmarks/feed-bookmarks.component';
import { StaffMainComponent } from './staff/staff-main/staff-main.component';
import { ProfileMainComponent } from './profile/profile-main/profile-main.component';
import { StaffChildComponent } from './staff/staff-child/staff-child.component';
 
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', component: HomeComponent},
      { path: 'profile', component: ProfileComponent, children: [
        {path: '', component: ProfileMainComponent},
        {path: ':id', component: ProfileMainComponent},
      ]},
      { path: 'bookmarks', component: FeedBookmarksComponent},
      { path: 'staff', component: StaffMainComponent},
      { path: 'departments', component: DepartmentsMainComponent},
      { path: 'employee/:id', component: StaffChildComponent },
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
