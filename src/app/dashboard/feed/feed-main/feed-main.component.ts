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
import { Department } from '../../../models/department.model';

@Component({
  selector: 'app-feed-main',
  templateUrl: './feed-main.component.html',
  styleUrls: ['./feed-main.component.scss']
})
export class FeedMainComponent implements OnInit, OnDestroy {

  public feed: Publication[] = [];
  public feed_aux: Publication[] = [];
  public departments: Department[] = [];
  public filter_department: Department = null;
  public sort_by: string = 'news';
  public user: User;
  private feedSubscription: Subscription;
  private userSubscription: Subscription;
  private departmentsSubscription: Subscription;
  
  constructor(private dialog: MatDialog, private store: Store<AppState>, private feedService: FeedService) { }

  applyFilterDepartments(department) {
    this.filter_department = department;
    this.feed_aux = this.feed.map(publication => {
      if (this.filter_department) {
        if (this.filter_department.id === publication.department) {
          console.log(publication);
          return publication;
        }
      } else {
        return publication;
      }
    }).filter(res=>res);
  }

  sortFeed(sortType) {
    this.sort_by = sortType;
    switch (sortType) {
      case 'news':
        /*this.feed_aux.sort((a,b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });*/
        this.feed_aux = this.feed_aux.slice().sort((o1,o2) => {
          const date1: any = o1.date;
          const date2: any = o2.date;
          return date2 - date1;
        });
        break;
      case 'popular':
        this.feed_aux = this.feed_aux.slice().sort((o1,o2) => {
          const likes1: number = o1.likes?.length;
          const likes2: number = o2.likes?.length;
          return likes2 - likes1;
        });
      default:
        break;
    }
   
  }
  createNewPublication() {
    let dialogRef = this.dialog.open(FeedFormComponent);
    this.store.dispatch(actions.isLoading());
    dialogRef.afterClosed().toPromise().then(publication0 => {
      if (publication0 && publication0[0]) {
        const info = publication0[0]['info'];
        const type = publication0[0]['type'];
        const publication = new Publication(type, info, [], this.user.employee, this.user.department, new Date(), null);
        this.feedService.createPublication(publication).then(() => {
          this.store.dispatch(actions.stopLoading());
          Swal.fire('Published', info, 'success');
        });
      } else {
        this.store.dispatch(actions.stopLoading());
      }
    }).catch(err => {
        this.store.dispatch(actions.stopLoading());
        Swal.fire('Error', err, 'error');
    } );
  }
  ngOnInit(): void {
    this.feedSubscription = this.store.select('feed').subscribe(({feed}) => {
      this.feed = feed;
      this.feed_aux = feed;
    });
    this.userSubscription = this.store.select('user').subscribe(({user}) => this.user = user);
    this.departmentsSubscription = this.store.select('departments').subscribe(({departments}) => this.departments = departments);
  }
  ngOnDestroy() {
    this.feedSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
    this.departmentsSubscription?.unsubscribe();
  }
}
