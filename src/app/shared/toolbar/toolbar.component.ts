import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  username: string;
  userSubscription: Subscription;

  constructor(private store: Store<AppState>, private AuthService: AuthService, private router: Router) { }

  logOut() {
    this.AuthService.logOut().then(() => {
      this.router.navigate(['/login']);
    })
  }
  
  ngOnInit() {
    this.userSubscription = this.store.select('user').pipe(filter(({user}) => user !== null)).subscribe(({user}) => {
      this.username = user.name;
    })
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }


}
