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
  @Output() idChange = new EventEmitter();

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

  notify(val) {
    this.idChange.emit(val.ID);
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
    // console.log(this.placeholder, this.displayfield, this.items);
    // console.log(changes);
    if (changes.items) {
      // console.log(changes.items);
      this.myControl.setValue(this.getItem());
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
