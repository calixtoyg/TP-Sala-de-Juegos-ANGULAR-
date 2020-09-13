import {TicTacToeType} from './tic-tac-toe-type.enum';

function initBoard() {
  return new Array(10);
}

export class TicTacToe {
  public board: Array<TicTacToeType>;
  public whoPlays: number;

  constructor() {
    this.board = initBoard();
  }
}
