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
    this.progreso = 0;
    this.ProgresoDeAncho = '0%';
    this.route.queryParamMap
      .subscribe((params) => {
          console.log({ ...params.keys, ...params });
        }
      );

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

  MoverBarraDeProgreso() {

    this.logeando = false;
    this.clase = 'progress-bar progress-bar-danger progress-bar-striped active';
    this.progresoMensaje = 'NSA spy...';
    const timer = TimerObservable.create(200, 50);
    this.subscription = timer.subscribe(t => {
      console.log('inicio');
      this.progreso = this.progreso + 1;
      this.ProgresoDeAncho = this.progreso + 20 + '%';
      switch (this.progreso) {
        case 15:
          this.clase = 'progress-bar progress-bar-warning progress-bar-striped active';
          this.progresoMensaje = 'Verificando ADN...';
          break;
        case 30:
          this.clase = 'progress-bar progress-bar-Info progress-bar-striped active';
          this.progresoMensaje = 'Adjustando encriptación..';
          break;
        case 60:
          this.clase = 'progress-bar progress-bar-success progress-bar-striped active';
          this.progresoMensaje = 'Recompilando Info del dispositivo..';
          break;
        case 75:
          this.clase = 'progress-bar progress-bar-success progress-bar-striped active';
          this.progresoMensaje = 'Recompilando claves facebook, gmail, chats..';
          break;
        case 85:
          this.clase = 'progress-bar progress-bar-success progress-bar-striped active';
          this.progresoMensaje = 'Instalando KeyLogger..';
          break;

        case 100:
          console.log('final');
          this.subscription.unsubscribe();
          this.Entrar();
          break;
      }
    });
    // this.logeando=true;
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
    // this.
    // this.authenticationService.forgotPassword("carloscalvo1234@mailinator.com");
  }

  async submit() {
    if (this.userForm.valid) {
      let response = await this.authenticationService.login(this.user.email, this.user.password);
      console.log(response);
    }
  }
}
