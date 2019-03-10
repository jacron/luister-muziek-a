import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuOption} from '../../../../classes/shared/MenuOption';

@Component({
  selector: 'app-options-menu',
  templateUrl: './options-menu.component.html',
  styleUrls: ['./options-menu.component.scss']
})
export class OptionsMenuComponent implements OnInit{
  @Input() options;
  filteredOption: MenuOption[];

  @Output() act = new EventEmitter();

  call(action) {
    this.act.emit(action);
  }

  ngOnInit(): void {
    this.filteredOption = this.options.filter((option:MenuOption) => !option.hide);
  }
}
