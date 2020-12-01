import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffModule } from './staff/staff.module';
import { DepartmentsModule } from './departments/departments.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutesModule } from './dashboard-routes.module';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { FeedModule } from './feed/feed.module';
import { ProfileModule } from './profile/profile.module';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    StoreModule,
    
    DepartmentsModule,
    StaffModule,
    SharedModule,
    FeedModule,
    DashboardRoutesModule,
    ProfileModule
  ]
})
export class DashboardModule { }
