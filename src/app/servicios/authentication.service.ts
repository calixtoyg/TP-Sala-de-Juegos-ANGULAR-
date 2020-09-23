import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import 'rxjs/add/observable/fromPromise';
import {Observable} from 'rxjs/Observable';
import UserCredential = firebase.auth.UserCredential;
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {User} from 'firebase';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authenticated: boolean;
  userLoggedIn = new Subject<boolean>();

  constructor(public afAuth: AngularFireAuth, private router: Router) {
  }

  private setSession(value: UserCredential) {
    this.authenticated = true;
    value.user.getIdTokenResult().then(tokenInfo => {
      localStorage.setItem('id_token', tokenInfo.token);
      localStorage.setItem('expires_at', tokenInfo.expirationTime);
      this.router.navigate(['/']);
      return true;
    }).catch(error => {
      return error;
    });
    return value;
  }

  private returnErrorCode(error) {
    return error;
  }

  public signUp(email, password) {
    console.log(`Email: ${email}`);
    Observable.fromPromise(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  public login(email, password) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(this.setSession).catch(this.returnErrorCode);
  }

  public async logout() {

    this.afAuth.signOut().then(function () {
      this.router.navigate(['login']);
    }.bind(this))
      .catch(this.returnErrorCode);
  }

  guessLogin() {
    Observable.fromPromise(this.afAuth.signInAnonymously()).subscribe(AuthenticationService.setSession, AuthenticationService.returnErrorCode);

  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  checkAuthStatus() {
    this.afAuth.onAuthStateChanged((user: User) => {
      this.authenticated = !!user;
      this.userLoggedIn.next(this.authenticated);
    });
  }
}
