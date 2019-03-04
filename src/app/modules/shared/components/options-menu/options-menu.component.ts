import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss']
})
export class OptionsMenuComponent {
  @Input() options;
  @Output() act = new EventEmitter();

  call(action) {
    this.act.emit(action);
  }
}
