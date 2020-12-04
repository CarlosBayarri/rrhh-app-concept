import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import * as actions from '../../store/actions';

/** Register component */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  /** Form group */
  registrationForm: FormGroup;
  /** Variable to change the visibility of the password input */
  hidePass = true;
  /** loading variable for the loading state */
  loading: boolean = false;
  /** Subscription for the UI state */
  uiSubscription: Subscription;
  /**
   * Constructor
   * @param fb 
   * @param authService 
   * @param router 
   * @param store 
   */
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private store: Store<AppState>) { }
  /**
   * Error function for the form
   */
  getErrorMessage() {
    if (this.registrationForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }
    if (this.registrationForm.get('name').hasError('required')) {
      return 'You must enter a value';
    }
    if (this.registrationForm.get('password').hasError('required')) {
      return 'You must enter a value';
    }

    return this.registrationForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }
  /**
   * Runs the user creation from the service
   */
  createUser() {
    if (this.registrationForm.invalid) return;
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Locked'
    })
    /*
    this.store.dispatch(actions.isLoading());
    const {name, email, password} = this.registrationForm.value;
    this.authService.createUser(name, email, password).then(response => {
      this.store.dispatch(actions.stopLoading());
      this.router.navigate(['/'])
    }).catch(err => {
      this.store.dispatch(actions.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message
      })
    })*/
  }
  /** OnInit life cycle */
  ngOnInit() {
    this.uiSubscription = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
    this.registrationForm = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password:  new FormControl('', Validators.required),
    })
  }
  /** OnDestroy life cycle */
  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }
}
