import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';



@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    StoreModule,

  ],
  exports: [ToolbarComponent],

})
export class SharedModule { }
