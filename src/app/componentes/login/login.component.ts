import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../servicios/authentication.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ForgotPasswordDialogComponent} from '../forgot-password-dialog/forgot-password-dialog.component';
import {SimpleDialogComponent} from '../who-plays-dialog/simple-dialog.component';

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
  @Output() public loggedIn: EventEmitter<boolean>;
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
    private authenticationService: AuthenticationService,
    public dialog: MatDialog) {

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
    this.dialog.open(ForgotPasswordDialogComponent, {width: '300px'}).afterClosed().subscribe(value => {
      this.loadingSpinner = false;
      if (value) {
        this.loadingSpinner = true;
        this.authenticationService.forgotPassword(value).then(() => {
          this.loadingSpinner = false;
          this.dialog.open(SimpleDialogComponent, {data: {body: 'Email enviado con éxito', title: 'Email'}});
        }).catch(error => {
          console.log(error);
          this.dialog.open(SimpleDialogComponent, {data: {body: 'Hubo algun problema al intentar recuperar el mail', title: 'Email'}});
          this.loadingSpinner = false;
        });
      }
    });

  }

  async submit() {
    if (this.userForm.valid) {
      this.loadingSpinner = true;
      this.authenticationService.login(this.user.email, this.user.password).then(value => {
        this.loadingSpinner = false;
        this.loggedIn.emit(true);
        this.router.navigate(['']);
      }).catch(error => {
        this.loggedIn.emit(false);
        this.loadingSpinner = false;
      });
    }
  }
}
