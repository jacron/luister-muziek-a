import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material';

@Component({
  selector: 'app-persons-table',
  templateUrl: './persons-table.component.html',
  styleUrls: ['./persons-table.component.scss']
})
export class PersonsTableComponent implements OnInit {
  @Input() fields;
  @Input() dataSource;
  @Input() displayedColumns;
  @Output() select = new EventEmitter();
  @Output() setFilter = new EventEmitter();

  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  clearFilter(input) {
    input.value = '';
    this.applyFilter('');
  }

  applyFilter(filterValue: string) {
    this.setFilter.emit(filterValue);
  }

  edit(row) {
    this.select.emit(row);
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
