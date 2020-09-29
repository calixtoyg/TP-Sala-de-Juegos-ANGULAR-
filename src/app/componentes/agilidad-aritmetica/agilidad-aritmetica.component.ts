import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {JuegoAgilidad} from '../../clases/juego-agilidad';

import {Subscription} from 'rxjs';
import {TimerObservable} from 'rxjs/observable/TimerObservable';

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

  constructor() {
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
        this.verificar();
        this.ocultarVerificar = true;
        this.nuevoJuego = new JuegoAgilidad();
        this.Tiempo = 2;
      }
    }, 900);


  }

  verificar() {
    this.ocultarVerificar = false;
    switch (this.nuevoJuego.operator) {
      case '/':
        console.log('Entro a dividir');
        this.nuevoJuego.gano = (this.nuevoJuego.numeroIngresado / this.nuevoJuego.segundoNumeroIngresado) === this.nuevoJuego.respuesta;
        console.log(this.nuevoJuego.gano);
        break;
      case '*':
        console.log('Entro a Multiplicar');
        this.nuevoJuego.gano = this.nuevoJuego.numeroIngresado * this.nuevoJuego.segundoNumeroIngresado === this.nuevoJuego.respuesta;
        console.log(this.nuevoJuego.gano);
        break;
      case '+':
        console.log('Entro a Sumar');
        this.nuevoJuego.gano = this.nuevoJuego.numeroIngresado + this.nuevoJuego.segundoNumeroIngresado === this.nuevoJuego.respuesta;
        console.log(this.nuevoJuego.gano);
        break;
      case '-':
        console.log('Entro a Restar');
        this.nuevoJuego.gano = this.nuevoJuego.numeroIngresado - this.nuevoJuego.segundoNumeroIngresado === this.nuevoJuego.respuesta;
        console.log(this.nuevoJuego.gano);
        break;
    }
    clearInterval(this.repetidor);


  }

}
