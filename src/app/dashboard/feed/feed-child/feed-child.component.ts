import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { Publication } from '../../../models/publication.model';
import { Employee } from '../../../models/employee.model';
import { User } from '../../../models/user.model';
import { FeedService } from '../../../services/feed.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-feed-child',
  templateUrl: './feed-child.component.html',
  styleUrls: ['./feed-child.component.scss']
})
export class FeedChildComponent implements OnInit {

  @Input() publication: Publication;

  public employee: Employee;
  public staffSubscription: Subscription;
  /** Department to which the employee belongs */
  public department;
  
  public user: User;
  /**
   * Constructor
   * @param store Store
   */
  constructor(private store: Store<AppState>, private feedService: FeedService, private authService: AuthService) { }

  isBookmarked() {
    let response: boolean = true;
    if (this.user.bookmarks.includes(this.publication.id)) {
      response = false;
    }
    return response;
  }

  unBookmarkPublication() {
    this.feedService.unbookmarkPublication(this.publication.id, this.authService.user).then(() => {
      Swal.fire('Publication unbookmarked', this.publication.info, 'success');
    }).catch(err => {
      Swal.fire('Error', err, 'error');
    })
  }

  deletePublication() {
    this.feedService.deletePublication(this.publication.id).then(() => {
      Swal.fire('Publication deleted', this.publication.info, 'success');
    }).catch(err => {
      Swal.fire('Error', err, 'error');
    })
  }
  bookmarkPublication() {
    this.feedService.bookmarkPublication(this.publication.id, this.authService.user).then(() => {
      Swal.fire('Publication bookmarked', this.publication.info, 'success');
    }).catch(err => {
      Swal.fire('Error', err, 'error');
    })
  }
  ngOnInit(): void {
  
    this.staffSubscription = this.store.subscribe(({staff, user, departments}) => {
      staff.staff.map(employee => {
        if (employee.id === this.publication.employee) {
          this.employee = employee;
          this.user = user.user;
          departments.departments.map(department => {
            if (this.employee && department.id === this.employee.department) {
              this.department = department;
            }
          })
        }
      })
    });
  }

  ngOnDestroy() {
    this.staffSubscription?.unsubscribe();
  }

}
