import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Publication } from 'src/app/models/publication.model';
import { FeedFormComponent } from '../feed-form/feed-form.component';
import { FeedService } from '../../../services/feed.service';
import { User } from 'src/app/models/user.model';
import Swal from 'sweetalert2';
import * as actions from '../../../store/actions';

@Component({
  selector: 'app-feed-main',
  templateUrl: './feed-main.component.html',
  styleUrls: ['./feed-main.component.scss']
})
export class FeedMainComponent implements OnInit, OnDestroy {

  public feed: Publication[] = [];
  public user: User;
  private feedSubscription: Subscription;
  private userSubscription: Subscription;
  constructor(private dialog: MatDialog, private store: Store<AppState>, private feedService: FeedService) { }

  createNewPublication() {
    let dialogRef = this.dialog.open(FeedFormComponent, {
      width: '550px',
    });
    this.store.dispatch(actions.isLoading());
    dialogRef.afterClosed().toPromise().then(info => {
      console.log(`Dialog result: ${info}`);
      const publication = new Publication(info, [], this.user.employee, new Date(), null);
      this.feedService.createPublication(publication).then(() => {
        this.store.dispatch(actions.stopLoading());
        Swal.fire('Published', info, 'success');
      });
    }).catch(err => {
        this.store.dispatch(actions.stopLoading());
        Swal.fire('Error', err, 'error');
    } );
  }
  ngOnInit(): void {
    this.feedSubscription = this.store.select('feed').subscribe(({feed}) => this.feed = feed);
    this.userSubscription = this.store.select('user').subscribe(({user}) => this.user = user);
  }
  ngOnDestroy() {
    this.feedSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }
}
