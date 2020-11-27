import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffChildComponent } from './staff-child/staff-child.component';
import { StaffFormComponent } from './staff-form/staff-form.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [StaffListComponent, StaffChildComponent, StaffFormComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    StoreModule,
  ],
  exports: [StaffListComponent]
})
export class StaffModule { }
