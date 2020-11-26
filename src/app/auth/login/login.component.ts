import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../../store/actions';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hidePass: boolean = true;
  loading: boolean = false;
  uiSubscription: Subscription;

  constructor(private fb: FormBuilder, private AuthService: AuthService, private router: Router, private store: Store<AppState>) { }

  getErrorMessage() {
    if (this.loginForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }
    if (this.loginForm.get('password').hasError('required')) {
      return 'You must enter a value';
    }
    return this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }

  loginUser() {
    if (this.loginForm.invalid) return;

   this.store.dispatch(actions.isLoading());

    const {email, password} = this.loginForm.value;
    this.AuthService.loginUser(email, password).then(response => {
      this.store.dispatch(actions.stopLoading());
      this.router.navigate(['/home'])
    }).catch(err => {
      this.store.dispatch(actions.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
    })
  }

  ngOnInit() {

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);

    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password:  new FormControl('', Validators.required),
    })
  }
  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }

}
