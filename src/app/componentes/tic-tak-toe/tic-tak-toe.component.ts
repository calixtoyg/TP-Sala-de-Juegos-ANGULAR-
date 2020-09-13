import {Component, OnInit} from '@angular/core';
import {TicTacToe} from '../../clases/tic-tac-toe';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {TicTacToeType} from '../../clases/tic-tac-toe-type.enum';

@Component({
  selector: 'app-tic-tak-toe',
  templateUrl: './tic-tak-toe.component.html',
  styleUrls: ['./tic-tak-toe.component.css']
})
export class TicTakToeComponent implements OnInit {
  game: TicTacToe;

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.game = new TicTacToe();
    this.game.board = [...new Array(10)].map(() => TicTacToeType.CROSS);
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
  }

  ngOnInit(): void {
  }

}
