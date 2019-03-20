import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
  }

}
