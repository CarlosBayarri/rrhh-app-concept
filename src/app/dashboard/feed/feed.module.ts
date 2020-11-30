import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedMainComponent } from './feed-main/feed-main.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { FeedFormComponent } from './feed-form/feed-form.component';
import { FeedChildComponent } from './feed-child/feed-child.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FeedMainComponent, FeedFormComponent, FeedChildComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    FeedMainComponent
  ]
})
export class FeedModule { }
