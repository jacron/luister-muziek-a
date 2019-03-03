import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../../../classes/book/book';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  @Output() bookChange = new EventEmitter();
  imageUrl = environment.booksServer + '/cover/';
  refresh = '?';

  constructor(
  ) { }

  setRefresh(e) {
    this.refresh = e;
  }

  emitBookChange(e) {
    this.bookChange.emit(e);
  }

  ngOnInit() {
  }

}
