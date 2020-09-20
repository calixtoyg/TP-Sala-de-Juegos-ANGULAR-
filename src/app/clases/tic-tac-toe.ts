import {TicTacToeType} from './tic-tac-toe-type.enum';
import {Player} from './player';

function initBoard() {
  const arr = [];
  for (let i = 0; i < 9; i++) {
    arr.push(TicTacToeType.EMPTY);
  }
  return arr;
}

export class TicTacToe {
  public board: Array<TicTacToeType>;
  public whoPlays: Player;

  constructor() {
    this.board = initBoard();
    this.whoPlays = Player.ONE;
  }

  private static randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
