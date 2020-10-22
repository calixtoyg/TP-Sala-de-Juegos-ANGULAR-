import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {
  path = 'assets/imagenes/memotest/';
  arrayImagenes = new Array(36);
  first = true;
  turno = 0;
  j1 = 0;
  j2 = 0;
  pid;
  total = 0;
  ganador = 0;
  disabled = new Array(36).map(value => false);

  crearImagenes() {
    for (let i = 0; i <= 35; i++) {
      if (i <= 17) {
        this.arrayImagenes[i] = this.path + i + '.jpg';
      } else {
        const j = i - 18;
        this.arrayImagenes[i] = this.path + j + '.jpg';
      }
    }
    this.shuffle(this.arrayImagenes);
  }

  shuffle(array) {
    let i = array.length;
    while (i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }
  }

  jugar() {
    this.crearImagenes();
    document.getElementById('memotest').style.display = 'block';
    document.getElementById('jugador1').style.color = '#03BF35';
    document.getElementById('jugar').style.display = 'none';
  }

  imgcheck(id) {
    const imageId = {id: id};
    // @ts-ignore
    document.getElementById(id).src = this.arrayImagenes[id];
    let prim = {};

    //turno del jugador
    let jugador = this.tratarjugador(this.turno);

    if (this.first) {
      prim = imageId;
      this.first = false;
      // @ts-ignore
      this.pid = prim.id;
      // @ts-ignore
      document.getElementById(this.pid).src = this.arrayImagenes[id];
      imageId.id = 'si';
    } else {
      //Verifica si son iguales
      if (imageId.id != 'si' && this.arrayImagenes[this.pid] == this.arrayImagenes[id]) {
        this.total++;
        if (jugador == 1) {
          this.j1 = this.j1 + 1;
          document.getElementById('j1').innerHTML = this.j1.toString();
        } else {
          this.j2++;
          document.getElementById('j2').innerHTML = this.j2.toString();
        }

        //Si termina el juego
        if (this.total == 18) {
          this.ganador = this.finjuego(this.j1, this.j2);
        }
        //elimina el onclick si ya fueron encontrados
        this.disabled[imageId.id] = true;
        this.disabled[this.pid] = true;
      } else {
        // @ts-ignore
        prim.id = this.pid;
        let path = this.path;
        setTimeout(function () {
          // @ts-ignore
          document.getElementById(imageId.id).src = path + 'bg.png';
        }, 800);
        setTimeout(function () {
          // @ts-ignore
          document.getElementById(prim.id).src = path + 'bg.png';
        }, 800);
      }

      this.first = true;
      this.turno++;

      //si no hay ganador
      if (this.ganador == 0) {
        jugador = this.tratarjugador(this.turno);
      }
    }
  }

  changeimages(id) {
    // @ts-ignore
    document.getElementById(id).src = this.path + 'bg.png';
  }

  tratarjugador(turno) {
    let jugador = turno % 2 == 0 ? 1 : 2;
    if (jugador == 1) {
      document.getElementById('jugador1').style.color = '#03BF35';
      document.getElementById('jugador2').style.color = 'black';
    } else {
      document.getElementById('jugador2').style.color = '#03BF35';
      document.getElementById('jugador1').style.color = 'black';
    }
    return jugador;
  }

  finjuego(j1, j2) {
    let ganador;
    if (j1 == j2) {
      document.getElementById('anotador').innerHTML = 'ES UN EMPATE!';
    } else {
      if (j1 > j2) {
        ganador = '1';
      } else {
        ganador = '2';
      }
    }
    document.getElementById('anotador').innerHTML = 'EL GANADOR ES EL JUGADOR ' + ganador;
    return ganador;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
