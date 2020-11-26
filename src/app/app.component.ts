import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rrhh-app-concept';

  constructor(private AuthService: AuthService) {
    this.AuthService.initAuthListener();
  }
}
