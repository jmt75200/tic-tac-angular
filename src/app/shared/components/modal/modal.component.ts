import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() winner: string | null = null;
  @Input() tie: string | null = null;
  @Input() welcome: boolean = true;

  @Output() closeEvent = new EventEmitter();
  @Output() restartEvent = new EventEmitter();

  constructor(public GeneralService: GeneralService) {}

  ngOnInit(): void{
    console.log('modal init');
  }
  
  closeModal() {
    this.closeEvent.emit();
  }

  restartGame() {
    this.restartEvent.emit();
  }

  ngOnDestroy(): void{
    console.log('Modal Destroyed')
  }
}
