import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-home-chips',
  templateUrl: './home-chips.component.html',
  styleUrls: ['./home-chips.component.scss']
})
export class HomeChipsComponent implements OnInit {
  @Input() chips;
  @Output() clearChips = new EventEmitter();
  @Output() remove = new EventEmitter();

  constructor() { }

  emitRemove(chip) {
    this.remove.emit(chip);
  }

  emitClearChips() {
    this.clearChips.emit();
  }

  ngOnInit() {
  }

}
