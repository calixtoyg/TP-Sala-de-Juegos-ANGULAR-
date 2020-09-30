import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {JuegoAgilidad} from '../../clases/juego-agilidad';

import {Subscription} from 'rxjs';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {Juego} from '../../clases/juego';
import {AuthenticationService} from '../../servicios/authentication.service';
import {JuegoImpl} from '../../clases/juego-impl';
import {JuegoServiceService} from '../../servicios/juego-service.service';

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
  loadingSpinner: boolean;
  Tiempo: number;
  repetidor: any;
  private subscription: Subscription;

  ngOnInit() {
  }

  constructor(public afAuth: AuthenticationService, public juegosService: JuegoServiceService) {
    this.ocultarVerificar = true;
    this.Tiempo = 5;
    this.nuevoJuego = new JuegoAgilidad();
    console.info(this.nuevoJuego);
  }

  NuevoJuego() {
    this.ocultarVerificar = false;
    this.loadingSpinner = true;
    this.verificar();
    const finishedGame = new JuegoImpl(localStorage.getItem('email'), this.nuevoJuego.gano, localStorage.getItem('email'), 'Adivina el número');
    this.enviarJuego.emit(finishedGame);
    this.juegosService.save(finishedGame).then(value => {
      this.loadingSpinner = false;
    }).catch(error => {
      this.loadingSpinner = false;
    });
    this.ocultarVerificar = true;
    this.nuevoJuego = new JuegoAgilidad();
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
