import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent implements OnInit, OnChanges {

  @Input() placeholder: string;
  @Input() items: any[];
  @Input() displayfield: string;
  @Input() id: string;
  @Input() text: string;
  @Output() idChange = new EventEmitter(); // user selected an option
  @Output() textChange = new EventEmitter(); // user has typed some

  filteredItems: Observable<any[]>;
  myControl = new FormControl();

  constructor() { }

  displayNameFn(val) {
    return val ? val.Name : val;
  }

  displayFullNameFn(val) {
    return val ? val.FullName : val;
  }

  displayTitleFn(val) {
    return val ? val.Title : val;
  }

  notifyId(val) {
    this.idChange.emit(val.ID);
  }

  notifyText() {
    this.textChange.emit(this.myControl.value);
  }

  private _filter(value: any): any[] {
    if (!value || typeof value !== 'string' || value.length === 0 ||
    !this.items) {
      // console.log('emitting -1');
      // this.idChange.emit(-1);
      return [];
    }
    const filterValue = value.toLowerCase();
    return this.items.filter((option: any) => {
      const str: string = <string>option[this.displayfield];
      return str.toLowerCase().includes(filterValue);
    });
  }

  getItem() {
    // console.log(this.items);
    if (!this.items) { return; }
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].ID === +this.id) {
        return this.items[i];
      }
    }
    return null;
  }

  clear() {
    this.myControl.setValue(null);
    this.idChange.emit(-1);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.items) {
      this.myControl.setValue(this.getItem());
    }
    if (changes.text) {
      this.myControl.setValue(changes.text.currentValue);
    }
    if (changes.id) {
      if (changes.id.currentValue == -1) {
        this.myControl.setValue(null);
      }
    }
  }

  ngOnInit() {
    this.filteredItems = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

}
