import {Component, OnInit} from '@angular/core';
import {MenuItem} from '../../clases/menu-item';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  menuItems: Array<MenuItem>;
  public status: any = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  constructor() {
    this.menuItems = new Array<MenuItem>();
    this.menuItems.push(new MenuItem(
      'El método lúdico es un conjunto de estrategias diseñadas para crear un ambiente de armonía en los estudiantes que están inmersos en el proceso de aprendizaje. Este método busca que los alumnos se apropien de los temas impartidos por los docentes utilizando el juego.',
      './assets/imagenes/juegos.png',
      'Juegos',
      '/Juegos'));
    this.menuItems.push(new MenuItem(
      'Los listados de los resultados con ordenamiento y busqueda.',
      './assets/imagenes/listado.jpg',
      'Listados de resultados',
      '/Listado'));
    this.menuItems.push(new MenuItem(
      'Listado de jugadores.',
      './assets/imagenes/jugadores.png',
      'Jugadores',
      '/Jugadores'));
  }

  ngOnInit() {
  }


}
