import {Component, OnInit} from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  // rows: number;
  isClicked: boolean;
  text: string;
}

@Component({
  selector: 'app-simon-board',
  templateUrl: './simon-board.component.html',
  styleUrls: ['./simon-board.component.css']
})
export class SimonBoardComponent implements OnInit {
  tiles: Tile[] = [
    {text: 'Green', cols: 1, color: 'lightgreen', isClicked: true},
    {text: 'Red', cols: 1, color: 'red', isClicked: false},
    {text: 'Yellow', cols: 1, color: 'yellow', isClicked: false},
    {text: 'Blue', cols: 1, color: 'lightblue', isClicked: false},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  simonClick(i: number) {
    this.getFollowingNextTileIndex(i);
  }

  getFollowingNextTileIndex(indexNumber: number) {
    if (indexNumber === 3) {
      return 0;
    } else {
      return indexNumber + 1;
    }
  }

}
