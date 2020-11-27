import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

/**
 * Root component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** Application title */
  public title = 'rrhh-app-concept';
  /**
   * Constructor
   * @param AuthService 
   */
  constructor(private AuthService: AuthService) {
    this.AuthService.initAuthListener();
  }
}
