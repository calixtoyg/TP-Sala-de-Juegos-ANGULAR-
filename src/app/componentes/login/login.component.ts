import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {Subscription} from 'rxjs';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {AuthenticationService} from '../../servicios/authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';

interface User {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userForm: FormGroup;
  public user: User;
  private subscription: Subscription;
  private fb: FormBuilder;
  public loadingSpinner: boolean;
  clave = '';
  progreso: number;
  progresoMensaje = 'esperando...';
  logeando = true;
  ProgresoDeAncho: string;

  clase = 'progress-bar progress-bar-info progress-bar-striped ';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {

  }

  ngOnInit() {
    this.user = {email: '', password: ''};
    this.userForm = new FormGroup({
      email: new FormControl(this.user.email, [Validators.email, Validators.required]),
      password: new FormControl(this.user.password, [Validators.required])
    });
    // this.user.email = '';
    // this.user.password = '';
    // this.userForm = this.fb.group({
    //   email: ['', [Validators.email, Validators.required]],
    //   password: ['', Validators.required]
    // });

    console.log('some');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  Entrar() {
    // if (this.email === 'admin' && this.clave === 'admin') {
    //   this.router.navigate(['/Principal']);
    // }
  }


  //
  // get email() {
  //   return this.userForm.get('email');
  // }
  //
  // get password() {
  //   return this.userForm.get('password');
  // }
  forgotPassword() {
    this.loadingSpinner = true;
    this.authenticationService.forgotPassword(this.user.email).then(value => {
      this.loadingSpinner = false;
    }).catch(error => {
      this.loadingSpinner = false;
    });
  }

  async submit() {
    if (this.userForm.valid) {
      this.loadingSpinner = true;
      this.authenticationService.login(this.user.email, this.user.password).then(value => {
        this.loadingSpinner = false;
        this.router.navigate(['']);
      }).catch(error => {
        this.loadingSpinner = false;
      });
    }
  }
}
