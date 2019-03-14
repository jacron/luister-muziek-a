import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-isbn-input',
  templateUrl: './isbn-input.component.html',
  styleUrls: ['./isbn-input.component.scss']
})
export class IsbnInputComponent implements OnInit {
  @Output() isbnchange = new EventEmitter();
  isbnFormControl = new FormControl();

  constructor() { }

  onIsbnChange() {
    this.isbnchange.emit(this.isbnFormControl.value);
  }

  clearQuery() {
    this.isbnFormControl.setValue(null);
    this.isbnchange.emit(null);
  }

  ngOnInit() {
  }

}
