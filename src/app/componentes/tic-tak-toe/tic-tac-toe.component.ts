import {Component, OnInit} from '@angular/core';
import {TicTacToe} from '../../clases/tic-tac-toe';
import {TicTacToeType} from '../../clases/tic-tac-toe-type.enum';
import {MatDialog} from '@angular/material/dialog';
import {SimpleDialogComponent} from '../who-plays-dialog/simple-dialog.component';
import {Player} from '../../clases/player';
import {NameFormComponent} from '../name-form/name-form.component';
import {JuegoServiceService} from '../../servicios/juego-service.service';
import {JuegoImpl} from '../../clases/juego-impl';


@Component({
  selector: 'app-tic-tac-toe',
  templateUrl: './tic-tac-toe.component.html',
  styleUrls: ['./tic-tac-toe.component.css']
})
export class TicTacToeComponent implements OnInit {
  game: TicTacToe;
  private playerNames = [];
  private readonly gameType = 'Tic Tac Toe';
  public loadingSpinner: boolean;

  constructor(public dialog: MatDialog, public juegosService: JuegoServiceService) {
    this.game = new TicTacToe();
    this.dialog.open(SimpleDialogComponent, {
      data: {title: '¿Que jugador juego?', body: `Juega el jugador Nº${this.game.whoPlays + 1}`}
    });


  }

  ngOnInit(): void {
    this.dialog.open(NameFormComponent, {
      data: {
        playerOne: this.playerNames[0],
        playerTwo: this.playerNames[1]
      }
    }).afterClosed().subscribe(returnObject => {
      this.playerNames[0] = returnObject.playerOne;
      this.playerNames[1] = returnObject.playerTwo;
    });
  }

  onTileClick(tileNumber: number) {
    console.log(`${TicTacToeType.EMPTY} nose`);
    if (this.game.board[tileNumber] === TicTacToeType.EMPTY) {
      this.game.board[tileNumber] = this.game.whoPlays === Player.ONE ? TicTacToeType.CROSS : TicTacToeType.CIRCLE;
      this.checkBoard(this.game.board);
      this.game.whoPlays = this.game.whoPlays === Player.ONE ? Player.TWO : Player.ONE;
    } else {
      this.dialog.open(SimpleDialogComponent, {
        data: {title: 'Error', body: `No puedes jugar en donde ya hay o cruz o círculo`}
      });

    }
  }


  private checkBoard(board: Array<TicTacToeType>) {
    const arrayOfRows = this.separateRowsIntoArrays(board);
    const arrayOfColumns = this.separateColumnsIntoArrays(arrayOfRows);
    const arrayOfDiagonals = this.separateDiagonalsIntoArrays(arrayOfRows);
    const endResult = arrayOfRows.concat(arrayOfColumns).concat(arrayOfDiagonals);
    const isThereAWinner = endResult.some((arr: Array<TicTacToeType>) => {
      return (arr.every(value => value === TicTacToeType.CROSS) || arr.every(value => value === TicTacToeType.CIRCLE));
    });
    if (isThereAWinner) {
      this.loadingSpinner = true;
      this.juegosService.save(new JuegoImpl(this.playerNames[this.game.whoPlays], true, localStorage.getItem('email'), this.gameType)).then(value => {
        this.loadingSpinner = false;
      }).catch(error => {
        this.loadingSpinner = false;
      });
      const rebootGameDialog = this.dialog.open(SimpleDialogComponent, {
        data: {
          title: 'HAY UN GANADOR!!!',
          body: `El Jugador Nº${this.game.whoPlays + 1}  es el ganador (Si presiona ok se reinciara el juego)`
        }
      });
      rebootGameDialog.afterClosed().subscribe(value => {
        if (value) {
          window.location.reload();
        }
      });
    }
    if (!isThereAWinner && board.every(value => value === TicTacToeType.CROSS || value === TicTacToeType.CIRCLE)) {
      this.juegosService.save(new JuegoImpl(this.playerNames[this.game.whoPlays], false, localStorage.getItem('email'), this.gameType)).then(value1 => {
        console.log(value1);
      }).catch(error => {
        console.log(error);
      });
      const rebootGameDialog = this.dialog.open(SimpleDialogComponent, {
        data: {title: 'No hay ganadores', body: 'Reincia el juego para continuar'}
      });
      rebootGameDialog.afterClosed().subscribe(value => {
        window.location.reload();
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
