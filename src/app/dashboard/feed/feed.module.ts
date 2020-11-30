import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedMainComponent } from './feed-main/feed-main.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { FeedFormComponent } from './feed-form/feed-form.component';
import { FeedChildComponent } from './feed-child/feed-child.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FeedBookmarksComponent } from './feed-bookmarks/feed-bookmarks.component';



@NgModule({
  declarations: [FeedMainComponent, FeedFormComponent, FeedChildComponent, FeedBookmarksComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    FeedMainComponent, FeedChildComponent
  ]
})
export class FeedModule { }
