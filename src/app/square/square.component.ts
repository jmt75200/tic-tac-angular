import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent {
  //Create UI to set and initialize button value:
  @Input() value: 'X' | 'O' = 'X'

}
