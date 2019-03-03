import { Component, OnInit } from '@angular/core';
import {BooksService} from '../../services/books.service';
import {FormControl} from '@angular/forms';
import {StateService} from '../../../../services/state.service';
import {Book} from '../../../../classes/book/book';
import {Router} from '@angular/router';

@Component({
  selector: 'app-books-start',
  templateUrl: './books-start.component.html',
  styleUrls: ['./books-start.component.scss']
})
export class BooksStartComponent implements OnInit {
  books: Book[];
  notInCatalogue = false;
  isbnFormControl = new FormControl();
  titleFormControl = new FormControl();

  constructor(
    private booksService: BooksService,
    private stateService: StateService,
    private router: Router,
  ) { }

  onTitleChange() {
    const query = this.titleFormControl.value;
    this.router.navigate(['books/search', query]).then();
  }

  afterGetBookByIsbn(book: Book) {
    this.books = [];
    this.notInCatalogue = true;
    if (book) {
      this.notInCatalogue = false;
      this.books.push(book);
    }
    else {
      this.notInCatalogue = true;
    }
  }

  onIsbnChange() {
    this.booksService.getBookByIsbn(this.isbnFormControl.value).subscribe(
      (book: Book) => this.afterGetBookByIsbn(book)
    )
  }

  clearQuery() {
    this.isbnFormControl.setValue(null);
    this.books = [];
  }

  getBooksCount() {
    this.booksService.getBooksCount().subscribe(
      result => this.stateService.setTitle('Books (' + result + ')')
    )
  }

  afterGetRecent(result) {
    this.books = result;
  }

  getRecent() {
    this.booksService.getRecent(30).subscribe(
      result => this.afterGetRecent(result)
    )
  }

  ngOnInit() {
    this.stateService.setTitle('Books');
    this.getBooksCount();
    this.getRecent();
  }

}
