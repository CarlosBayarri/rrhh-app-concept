import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Publication } from 'src/app/models/publication.model';
import { IsANewPipe } from '../../../pipes/is-anew.pipe';

@Component({
  selector: 'app-feed-news',
  templateUrl: './feed-news.component.html',
  styleUrls: ['./feed-news.component.scss']
})
export class FeedNewsComponent implements OnInit, OnDestroy {

  private feedSubscription: Subscription;
  public feed_aux: Publication[] = [];

  constructor(private store: Store<AppState>, private isANewPipe: IsANewPipe) { }

  ngOnInit(): void {
    this.feedSubscription = this.store.select('feed').subscribe(({feed}) => {
      this.feed_aux = this.isANewPipe.transform(feed, 'news');
    });
  }

  ngOnDestroy() {
    this.feedSubscription.unsubscribe();
  }

}
