import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss']
})
export class OptionsMenuComponent implements OnInit {
  @Input() triggerstyle;
  @Input() options;
  @Output() act = new EventEmitter();

  constructor(
    private domSanatizer: DomSanitizer,
  ) { }

  getTriggerstyle() {
    return this.domSanatizer.bypassSecurityTrustStyle(this.triggerstyle);
  }

  call(action) {
    this.act.emit(action);
  }

  ngOnInit() {
  }

}
