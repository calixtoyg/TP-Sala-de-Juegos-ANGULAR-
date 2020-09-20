import {Component, OnInit} from '@angular/core';
import {TicTacToe} from '../../clases/tic-tac-toe';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import {TicTacToeType} from '../../clases/tic-tac-toe-type.enum';
import {MatDialog} from '@angular/material/dialog';
import {SimpleDialogComponent} from '../who-plays-dialog/simple-dialog.component';
import {Player} from '../../clases/player';


@Component({
  selector: 'app-tic-tak-toe',
  templateUrl: './tic-tak-toe.component.html',
  styleUrls: ['./tic-tak-toe.component.css']
})
export class TicTakToeComponent implements OnInit {
  game: TicTacToe;
  config: any = {disableClose: true, autoFocus: true, position: {'top': '0', 'left': '0'}};

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog) {
    // constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.game = new TicTacToe();
    iconRegistry.addSvgIcon(
      'thumbs-up',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/examples/thumbup-icon.svg'));
    this.dialog.open(SimpleDialogComponent, {
      ...this.config,
      data: {title: '¿Que jugador juego?', body: `Juega el jugador Nº${this.game.whoPlays + 1}`}
    });


  }

  ngOnInit(): void {
  }

  onTileClick(tileNumber: number) {
    console.log(`${TicTacToeType.EMPTY} nose`);
    if (this.game.board[tileNumber] === TicTacToeType.EMPTY) {
      this.game.board[tileNumber] = this.game.whoPlays === Player.ONE ? TicTacToeType.CROSS : TicTacToeType.CIRCLE;
      this.checkBoard(this.game.board);
      this.game.whoPlays = this.game.whoPlays === Player.ONE ? Player.TWO : Player.ONE;
    } else {
      this.dialog.open(SimpleDialogComponent, {
        ...this.config,
        data: {title: 'Error', body: `No puedes jugar en donde ya hay o cruz o círculo`}
      });
    }
  }

  private checkBoard(board: Array<TicTacToeType>) {
    const arrayOfRows = this.separateRowsIntoArrays(board);
    const arrayOfColumns = this.separateColumnsIntoArrays(arrayOfRows);
    const arrayOfDiagonals = this.separateDiagonalsIntoArrays(arrayOfRows);
    const endResult = arrayOfRows.concat(arrayOfColumns).concat(arrayOfDiagonals);
    // TODO chequear esto el every esta mal porque si es cruz o circulo manda true entonces x o x da true
    const resultOfCombinations = endResult.some((arr: Array<TicTacToeType>) => {
      return arr.every(value => value === TicTacToeType.CROSS || value === TicTacToeType.CIRCLE);
    });
    if (resultOfCombinations) {
      this.dialog.open(SimpleDialogComponent, {
        ...this.config,
        data: {title: 'HAY UN GANADOR!!!', body: `El Jugador Nº${this.game.whoPlays + 1}  es el ganador`}
      });
    }

    // console.log(endResult);
  }

  private separateRowsIntoArrays(board: Array<TicTacToeType>) {
    let innerArray: Array<TicTacToeType> = [];
    const arrayOfLittleBoards: Array<Array<TicTacToeType>> = [];
    board.forEach((value, index) => {
      innerArray.push(value);
      if (index !== 0 && (1 + index) % 3 === 0) {
        arrayOfLittleBoards.push(innerArray);
        innerArray = [];
      }
    });
    return arrayOfLittleBoards;
  }

  private separateColumnsIntoArrays(arrayOfRows: Array<Array<TicTacToeType>>) {
    let innerArray: Array<TicTacToeType> = [];
    const arrayOfLittleBoards: Array<Array<TicTacToeType>> = [];
    for (let i = 0; i < arrayOfRows.length; i++) {
      arrayOfRows.forEach((value) => {
        innerArray.push(value[i]);
      });
      arrayOfLittleBoards.push(innerArray);
      innerArray = [];
    }
    return arrayOfLittleBoards;
  }

  private separateDiagonalsIntoArrays(arrayOfRows: Array<Array<TicTacToeType>>) {
    const leftDiagonal: Array<TicTacToeType> = [];
    const rightDiagonal: Array<TicTacToeType> = [];
    const diagonals: Array<Array<TicTacToeType>> = [];
    arrayOfRows.forEach((row, rowIndex) => {
      row.map((value, index) => {
        const isArraysCenter = rowIndex === index && index > 0 && index < row.length - 1;
        if (isArraysCenter) {
          leftDiagonal.push(value);
          rightDiagonal.push(value);
        } else if (index === rowIndex) {
          leftDiagonal.push(value);
        } else if ((arrayOfRows.length - 1) === (index + rowIndex)) {
          rightDiagonal.push(value);
        }
      });
    });

    diagonals.push(rightDiagonal);
    diagonals.push(leftDiagonal);
    return diagonals;
  }
}
