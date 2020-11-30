import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DepartmentsModule } from '../dashboard/departments/departments.module';



@NgModule({
  declarations: [ToolbarComponent, SidebarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    StoreModule,
    DepartmentsModule

  ],
  exports: [ToolbarComponent, SidebarComponent],

})
export class SharedModule { }
