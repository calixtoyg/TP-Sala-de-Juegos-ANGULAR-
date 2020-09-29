import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './servicios/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn: boolean;
  constructor(private router: Router, private auth: AuthenticationService) {
    this.loggedIn = false;
  }

  register() {
    this.router.navigate(['/register']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  logOut() {
    this.auth.logout().then(value => this.loggedIn = false).catch(console.error);
  }
}
