import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material';
import {DataField} from '../../../movies/components/directors/DataField';

@Component({
  selector: 'app-persons-table',
  templateUrl: './persons-table.component.html',
  styleUrls: ['./persons-table.component.scss']
})
export class PersonsTableComponent implements OnInit, OnChanges {
  @Input() fields: DataField[];
  @Input() dataSource;
  @Input() displayedColumns;
  @Input() saved;
  @Input() removed;
  @Output() select = new EventEmitter();
  @Output() setFilter = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;
  filter = '';

  constructor() { }

  clearFilter(filterInput) {
    this.filter = '';
    this.applyFilter();
    filterInput.focus()
  }

  applyFilter() {
    this.setFilter.emit(this.filter);
  }

  edit(row) {
    this.select.emit(row);
  }

  afterSaved(person) {
    const items = this.dataSource.filteredData;
    const idField = person.id ? 'id' :
      person.ID ? 'ID' : -1;
    if (idField === -1) {
      console.error('wrong idField for person', person);
      return;
    }
    for (let i = 0; i < items.length; i++) {
      if (items[i][idField] === person[idField]) {
        for (let prop in person) {
          if (person.hasOwnProperty(prop)) {
            items[i][prop] = person[prop];
          }
        }
        items[i].changed = true;
      }
    }
  }

  afterRemoved(person) {
    const items = this.dataSource.filteredData;
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === person.id) {
        items[i].deleted = true;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {saved, removed} = changes;
    if (saved && saved.currentValue) {
      this.afterSaved(saved.currentValue);
    }
    if (removed && removed.currentValue) {
      this.afterRemoved(removed.currentValue);
    }
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
