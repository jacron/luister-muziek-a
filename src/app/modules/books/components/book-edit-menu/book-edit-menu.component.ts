import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../../../classes/book/book';

@Component({
  selector: 'app-book-edit-menu',
  templateUrl: './book-edit-menu.component.html',
  styleUrls: ['./book-edit-menu.component.scss']
})
export class BookEditMenuComponent implements OnInit {
  @Input() book: Book;
  @Output() bookChange = new EventEmitter();
  @Output() toggle = new EventEmitter();
  @Output() wiki = new EventEmitter();
  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
