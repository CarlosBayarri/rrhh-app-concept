import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../../services/auth.service';

/**
 * Toolbar component
 */
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  /**
   * Username public variable
   */
  username: string;
  /**
   * User subscription
   */
  userSubscription: Subscription;

  /**
   * Constructor of toolbar component
   * @param store
   * @param AuthService 
   * @param router 
   */
  constructor(private store: Store<AppState>, private AuthService: AuthService, private router: Router) { }

  /**
   * Logout function from authService to signout
   */
  logOut() {
    this.AuthService.logOut().then(() => {
      this.router.navigate(['/login']);
    })
  }
  /**
   * onInit lifecycle
   */
  ngOnInit() {
    this.userSubscription = this.store.select('user').pipe(filter(({user}) => user !== null)).subscribe(({user}) => {
      this.username = user.name;
    })
  }
  /**
   * onDestroy life cycle
   */
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }


}
