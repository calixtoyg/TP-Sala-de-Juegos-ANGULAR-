import {AngularFireAuth} from '@angular/fire/auth';
import 'rxjs/add/observable/fromPromise';
import {Observable} from 'rxjs/Observable';
import UserCredential = firebase.auth.UserCredential;
import * as moment from 'moment';
import {Subject} from 'rxjs';
import {User} from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

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
    console.log(`logging: ${value}`);
    localStorage.setItem('email', value.user.email);
    value.user.getIdTokenResult().then(tokenInfo => {
      console.log(`log succesful: ${tokenInfo}`);
      localStorage.setItem('id_token', tokenInfo.token);
      localStorage.setItem('expires_at', tokenInfo.expirationTime);
      this.router.navigate(['/']);
      return true;
    }).catch(error => {
      console.error(error);
      return error;
    });
  }

  private returnErrorCode(error) {
    return error;
  }

  public signUp(email, password) {
    console.log(`Email: ${email}`);
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  public login(email, password) {
    return new Promise<boolean>(((resolve, reject) => this.afAuth.signInWithEmailAndPassword(email, password)
      .then(value => {
        this.setSession(value);
        resolve(true);
      })
      .catch(error => reject(error)))
    );
  }

  public async logout() {

    this.afAuth.signOut().then(function () {
      this.router.navigate(['login']);
    }.bind(this))
      .catch(this.returnErrorCode);
  }

  guessLogin() {
    this.afAuth.signInAnonymously().then(this.setSession).catch(this.returnErrorCode);
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

  forgotPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}
