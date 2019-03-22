import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormOption} from '../../../../classes/shared/FormOption';
import {FormError} from '../../../../classes/shared/FormError';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.scss']
})
export class PersonFormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() options: FormOption[];
  @Input() errorTable: FormError[];
  @Output() save = new EventEmitter();
  @Output() close = new EventEmitter();

  constructor() { }

  hasError(controlName, errorName) {
    return this.formGroup.controls[controlName].hasError(errorName);
  }

  closeDialog() {
    this.close.emit('canceled');
  }

  toSave() {
    this.save.emit();
  }

  ngOnInit() {
  }

}
