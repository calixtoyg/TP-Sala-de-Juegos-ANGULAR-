import {Component, OnInit} from '@angular/core';
import {actors} from '../../../assets/actors';
import {JuegoAgilidad} from '../../clases/juego-agilidad';
import {JuegoImpl} from '../../clases/juego-impl';
import {JuegoServiceService} from '../../servicios/juego-service.service';

@Component({
  selector: 'app-adivina-actor',
  templateUrl: './adivina-actor.component.html',
  styleUrls: ['./adivina-actor.component.css']
})
export class AdivinaActorComponent implements OnInit {
  inputActor: string;
  actor: any;
  imagePath: string;

  constructor(private juegoServiceService: JuegoServiceService) {
  }

  ngOnInit(): void {
    this.startGame();
  }

  startGame() {
    this.imagePath = '';
    this.actor = actors[JuegoAgilidad.randomIntFromInterval(0, actors.length - 1)];
    this.imagePath =  './assets/imagenes/actores/' + this.actor.imagePath;
  }

  guessActor() {
    const gano = this.actor.names.some(value => value.toLowerCase() == this.inputActor.toLowerCase());
    if (gano) {
      alert('Ganaste');
    } else {
      alert('Perdiste');
    }
    const juegoImpl = new JuegoImpl(localStorage.getItem('email'), gano, localStorage.getItem('email'), 'Adivina el actor');
    this.juegoServiceService.save(juegoImpl).then(() => this.startGame()).catch(() => this.startGame());
  }
}
