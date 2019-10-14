import { Component, OnInit } from '@angular/core';
import {BooksService} from '../../services/books.service';
import {StateService} from '../../../../services/state.service';
import {Book} from '../../../../classes/book/book';
import {ActivatedRoute, Router} from '@angular/router';
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
  genre = null;
  recentLimitFormControl = new FormControl();

  constructor(
    private booksService: BooksService,
    private stateService: StateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  handleParams(params) {
    if (params) {
      if (params.genre) {
        this.genre = params.genre;
        this.recentLimit = params.limit;
        this.getBooksCount();
        this.getRecent();
      }
    }
  }

  onTitleChange(title) {
    this.router.navigate(['books/search', title]).then();
  }

  afterGetBookByIsbn(books: Book[]) {
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
    this.router.navigate(['books', e, this.recentLimit]).then();
  }

  onIsbnChange(isbn) {
    this.isbn = isbn;
    this.booksService.getBookByIsbn(isbn).subscribe(
      (books: Book[]) => this.afterGetBookByIsbn(books),
      err => console.log(err)
    )
  }

  onLimitChange() {
    this.router.navigate(['books', this.genre, this.recentLimitFormControl.value]).then();
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
    if (!this.genre) {
      this.genre = 'alle';
      this.getBooksCount();
      // console.log('get recent in init');
      this.getRecent();
    }
  }

}
