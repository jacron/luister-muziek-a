import { Component, OnInit } from '@angular/core';
import {BooksService} from '../../services/books.service';
import {StateService} from '../../../../services/state.service';
import {Book} from '../../../../classes/book/book';
import {Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-books-start',
  templateUrl: './books-start.component.html',
  styleUrls: ['./books-start.component.scss']
})
export class BooksStartComponent implements OnInit {
  books: Book[];
  notInCatalogue = false;
  listHeader = '';
  recentLimit = 30;
  isbn = null;
  genre = 'alle';
  recentLimitFormControl = new FormControl();

  constructor(
    private booksService: BooksService,
    private stateService: StateService,
    private router: Router,
  ) { }

  onTitleChange(title) {
    this.router.navigate(['books/search', title]).then();
  }

  afterGetBookByIsbn(books: Book[]) {
    console.log(books);
    this.books = [];
    if (books && books.length) {
      this.notInCatalogue = false;
      this.books = books;
    }
    else {
      // this will show proposal
      this.notInCatalogue = true;
    }
  }

  onGenreChange(e) {
    this.genre = e;
    console.log(e);
    this.getBooksCount();
    this.getRecent();
  }

  onIsbnChange(isbn) {
    console.log(isbn);
    this.isbn = isbn;
    this.booksService.getBookByIsbn(isbn).subscribe(
      (books: Book[]) => this.afterGetBookByIsbn(books),
      err => console.log(err)
    )
  }

  onLimitChange() {
    this.recentLimit = this.recentLimitFormControl.value;
    console.log(this.recentLimit);
    this.getRecent();
  }

  getBooksCount() {
    this.booksService.getBooksCount(this.genre).subscribe(
      result => this.stateService.setTitle('Books (' + result['count'] + ')')
    )
  }

  afterGetRecent(result) {
    this.books = result;
    this.listHeader = `Recent (${this.recentLimit})`;
  }

  getRecent() {
    this.booksService.getRecent(this.recentLimit, this.genre).subscribe(
      result => this.afterGetRecent(result)
    )
  }

  ngOnInit() {
    this.stateService.setTitle('Books');
    this.getBooksCount();
    this.getRecent();
  }

}
