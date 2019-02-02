import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss']
})
export class OptionsMenuComponent implements OnInit {
  @Input() options;
  @Output() act = new EventEmitter();

  constructor(
  ) { }

  call(action) {
    this.act.emit(action);
  }

  ngOnInit() {
  }

}
