import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Publication } from 'src/app/models/publication.model';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-feed-info',
  templateUrl: './feed-info.component.html',
  styleUrls: ['./feed-info.component.scss']
})
export class FeedInfoComponent implements OnInit {

  public my_feed: Publication[] = [];
  public my_likes: number = 0;
  public my_info = {
    post: 0, suggestion: 0,  alert: 0, idea: 0
  };
  private storeSubscription: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.storeSubscription = this.store.subscribe(({feed, user}) => {
      this.my_likes = 0;
      this.my_feed = [];
      this.my_info
      for (const key in this.my_info) {
        if (Object.prototype.hasOwnProperty.call(this.my_info, key)) { this.my_info[key] = 0; }
      }
      this.my_feed = feed.feed.map(publication => {
        if (publication?.employee === user.user?.employee) {
          if (publication.type) {
            this.my_info[publication.type] += 1;
          } else {
            this.my_info.post += 1;
          }
          if (publication.likes?.length) this.my_likes += publication.likes?.length;
          return publication;
        }
      }).filter(res=>res);
    });
  }
  ngOnDestroy() {
    this.storeSubscription?.unsubscribe();
  }
}
