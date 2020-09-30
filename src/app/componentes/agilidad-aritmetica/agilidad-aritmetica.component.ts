import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {JuegoAgilidad} from '../../clases/juego-agilidad';

import {Subscription} from 'rxjs';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {Juego} from '../../clases/juego';
import {AuthenticationService} from '../../servicios/authentication.service';
import {JuegoImpl} from '../../clases/juego-impl';

@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
  @Output()
  enviarJuego: EventEmitter<any> = new EventEmitter<any>();
  nuevoJuego: JuegoAgilidad;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor: any;
  private subscription: Subscription;

  ngOnInit() {
  }

  constructor(public afAuth: AuthenticationService) {
    this.ocultarVerificar = true;
    this.Tiempo = 5;
    this.nuevoJuego = new JuegoAgilidad();
    console.info(this.nuevoJuego);
  }

  NuevoJuego() {
    this.ocultarVerificar = false;
    this.repetidor = setInterval(() => {

      this.Tiempo--;
      console.log('llego', this.Tiempo);
      if (this.Tiempo == 0) {
        clearInterval(this.repetidor);
        alert(this.verificar());
        this.ocultarVerificar = true;
        this.enviarJuego.emit(new JuegoImpl(localStorage.getItem('email'), this.nuevoJuego.gano, localStorage.getItem('email'), 'Adivina el número'));
        this.nuevoJuego = new JuegoAgilidad();
        this.Tiempo = 2;
      }
    }, 900);


  }

  verificar() {
    this.ocultarVerificar = false;
    switch (this.nuevoJuego.operator) {
      case '/':
        this.nuevoJuego.gano = Number((this.nuevoJuego.numeroIngresado / this.nuevoJuego.segundoNumeroIngresado).toFixed(2)) === Number(this.nuevoJuego.respuesta.toFixed(2));
        return this.nuevoJuego.gano;
      case '*':
        this.nuevoJuego.gano = this.nuevoJuego.numeroIngresado * this.nuevoJuego.segundoNumeroIngresado === Number(this.nuevoJuego.respuesta);
        return this.nuevoJuego.gano;
      case '+':
        this.nuevoJuego.gano = this.nuevoJuego.numeroIngresado + this.nuevoJuego.segundoNumeroIngresado === Number(this.nuevoJuego.respuesta);
        return this.nuevoJuego.gano;
      case '-':
        this.nuevoJuego.gano = this.nuevoJuego.numeroIngresado - this.nuevoJuego.segundoNumeroIngresado === Number(this.nuevoJuego.respuesta);
        return this.nuevoJuego.gano;
    }
    clearInterval(this.repetidor);


  }

}
