import { Component, OnInit } from '@angular/core';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-books-start',
  templateUrl: './books-start.component.html',
  styleUrls: ['./books-start.component.scss']
})
export class BooksStartComponent implements OnInit {
  books;

  constructor(
    private booksService: BooksService,
  ) { }

  afterGetBooks(result) {
    console.log(result);
    this.books = result.books;
  }

  ngOnInit() {
    this.booksService.getBooks().subscribe(data =>
      this.afterGetBooks(data)
    )
  }

}
