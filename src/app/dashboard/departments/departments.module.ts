import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentsListComponent } from './departments-list/departments-list.component';
import { DepartmentsChildComponent } from './departments-child/departments-child.component';
import { DepartmentsFormComponent } from './departments-form/departments-form.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DepartmentsMainComponent } from './departments-main/departments-main.component';



@NgModule({
  declarations: [DepartmentsListComponent, DepartmentsChildComponent, DepartmentsFormComponent, DepartmentsMainComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [DepartmentsListComponent]
})
export class DepartmentsModule { }
