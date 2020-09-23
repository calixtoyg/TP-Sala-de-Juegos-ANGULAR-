import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import 'rxjs/add/observable/fromPromise';
import {Observable} from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public afAuth: AngularFireAuth) {
  }

  signUp(email, password) {
    console.log(`Email: ${email}`);
    return Observable.fromPromise(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  login(email, password) {
    return Observable.fromPromise(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  logout() {
    if (this.afAuth.currentUser) {
      return Observable.fromPromise(this.afAuth.signOut());
    } else {
      return "";
    }
  }


}
