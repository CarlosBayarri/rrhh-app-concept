import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { MaterialModule } from '../../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileMainComponent } from './profile-main/profile-main.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';



@NgModule({
  declarations: [
    ProfileComponent,
    ProfileMainComponent,
    ProfileViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class ProfileModule { }
