import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              public router: Router) {
  }


  ngOnInit() {
  }

  Juego(tipo: string) {
    switch (tipo) {
      case 'Adivina':
        this.router.navigate(['/Juegos/Adivina']);
        break;
      case 'Agilidad':
        this.router.navigate(['/Juegos/Agilidad']);
        break;
      case 'AdivinaMasListado':
        this.router.navigate(['/Juegos/AdivinaMasListado']);
        break;
      case 'TicTacToe':
        this.router.navigate(['/Juegos/TicTacToe']);
        break;
      case 'Anagrama':
        this.router.navigate(['/Juegos/Anagrama']);
        break;
      case 'Simon':
        this.router.navigate(['/Juegos/Simon']);
        break;
      case 'AdivinaActor':
        this.router.navigate(['/Juegos/AdivinaActor']);
        break;

    }
  }
}
