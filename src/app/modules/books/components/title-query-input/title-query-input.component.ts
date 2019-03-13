import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-title-query-input',
  templateUrl: './title-query-input.component.html',
  styleUrls: ['./title-query-input.component.scss']
})
export class TitleQueryInputComponent implements OnInit {
  @Output() titlechange = new EventEmitter();
  titleFormControl = new FormControl();

  constructor() { }

  onTitleChange() {
    this.titlechange.emit(this.titleFormControl.value);
  }

  ngOnInit() {
  }

}
