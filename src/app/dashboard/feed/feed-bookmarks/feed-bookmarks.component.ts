import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-feed-bookmarks',
  templateUrl: './feed-bookmarks.component.html',
  styleUrls: ['./feed-bookmarks.component.scss']
})
export class FeedBookmarksComponent implements OnInit, OnDestroy {

  public bookmarks: any[];
  private storeSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.storeSubscription = this.store.subscribe(({user, staff, departments}) => {
      if (user.user) {
        this.bookmarks = user.user.bookmarks;
      }
    });
  }
  ngOnDestroy() {
    this.storeSubscription?.unsubscribe();
  }
}
