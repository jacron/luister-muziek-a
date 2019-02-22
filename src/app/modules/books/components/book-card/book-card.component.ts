import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../../classes/book/book';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;

  constructor(
    private booksService: BooksService,
  ) { }

  ngOnInit() {
  }

}
