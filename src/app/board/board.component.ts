import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../shared/services/general.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[] = [];
  
  xIsNext: boolean = true;
  
  winner: string | null =  null;

  tie: string | null = null;

  welcome: boolean = true

  limitMoves: any[] = [];

constructor(public GeneralService: GeneralService) {}

  ngOnInit() {
    // open welcome modal
    this.GeneralService.showModal = true
  }

  newGame() {
    console.log('new game from board components')
    this.GeneralService.showModal = false;
    // setting board array of 9 squares with null value
    this.squares = Array(9).fill(null);
    // setting up game parameters on init
    this.winner = null;
    this.xIsNext = true;
    this.limitMoves = [];
    this.tie = null;
  }

  get player() {
    // if xIsNext is true return X else return O
    // set ai to O
    return this.xIsNext ? 'X' : 'O';
  }

  makeAMove(idx: number) {
    if(this.player === 'X'){
      this.setMove(idx)
    }

    this.winner = this.calculateWinner();

    if(this.limitMoves.length === 9 && !this.winner){
      this.tie = 'tie'
      this.welcome = false
      // open modal
      this.GeneralService.showModal = true;
      // console.log('its a tie', this.winner, this.limitMoves)
    }

    if(this.player === 'O' && !this.winner) {
      setTimeout(() => [
        this.setAiMove()
      ], 1000)
    }
  }

  // dumb AI
  // TODO: USE MINIMAX to set score and allow the AI to choose the optimal move
  setAiMove(){
    let randomMove = Math.floor(Math.random() * (3) + 1)
    let move = randomMove
    
    if(!this.availableMoves(randomMove)){
      // if this random move is not available get the best last option
      for(let i = 0; i < this.squares.length; i++){
        if(this.availableMoves(i)){
          move = i
        }
      }
    }

    this.setMove(move)
  }

  setMove(idx: number) {
    // check to see if there is a player value in the square array
    // if idx is null then splice the player value into square array
    if(!this.squares[idx]){
      this.squares.splice(idx, 1, this.player);
      // console.log('array value on move',this.squares);
      // update turn
      this.xIsNext = !this.xIsNext;
      // add turn to limit array
      this.limitMoves.push(this.player)
    }
  }

  availableMoves(idx: number) {
    return this.squares[idx] === null ? true : false
  }

  calculateWinner() {
    // possible winning combonations
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // determine if there is a winner
    // loop through lines to find a winning combonation
    for (let i = 0; i < lines.length; i++){
      const [a, b, c] = lines[i];
      // console.log('huh?', a, b, c)
      // console.log('output?',this.squares[a], this.squares[b], this.squares[c])
      if ( this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c] )
      {
        // console.log('winner exists?', this.squares[a])
        this.welcome = false
        // open modal
        this.GeneralService.showModal = true;
        return this.squares[a]
      } 
    }
    // no winner 
    return null
  }
}
