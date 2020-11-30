import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from '../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  /** User object */
  public user: User;
  /** User subscription */
  private userSubscription: Subscription;
  /**
   * Constructor
   * @param store Store
   */
  constructor(private store: Store<AppState>) { }
  /** On init life cycle */
  ngOnInit(): void {
    this.userSubscription = this.store.select('user').subscribe(({user}) => this.user = user);
  }
  /** on destroy life cycle */
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
