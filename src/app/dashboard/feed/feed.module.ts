import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedMainComponent } from './feed-main/feed-main.component';
import { MaterialModule } from 'src/app/material/material.module';
import { RouterModule } from '@angular/router';
import { FeedFormComponent } from './feed-form/feed-form.component';
import { FeedChildComponent } from './feed-child/feed-child.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FeedBookmarksComponent } from './feed-bookmarks/feed-bookmarks.component';
import { IsANewPipe } from 'src/app/pipes/is-anew.pipe';
import { FeedNewsComponent } from './feed-news/feed-news.component';
import { FixDatePipe } from 'src/app/pipes/fix-date.pipe';
import { FeedInfoComponent } from './feed-info/feed-info.component';



@NgModule({
  declarations: [FeedMainComponent, FeedFormComponent, FeedChildComponent, FeedBookmarksComponent, 
    IsANewPipe, FeedNewsComponent, FixDatePipe, FeedInfoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    FeedMainComponent, FeedChildComponent, FeedNewsComponent, FeedInfoComponent
  ],
  providers: [
    IsANewPipe
  ]
})
export class FeedModule { }
