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

  afterGetBookByIsbn(books: Book[]) {
    this.books = [];
    if (books) {
      this.notInCatalogue = false;
      this.books = books;
    }
    else {
      this.notInCatalogue = true;
    }
  }

  onIsbnChange() {
    this.booksService.getBookByIsbn(this.isbnFormControl.value).subscribe(
      (books: Book[]) => this.afterGetBookByIsbn(books),
      err => console.log(err)
    )
  }

  clearQuery() {
    this.isbnFormControl.setValue(null);
    this.books = [];
  }

  getBooksCount() {
    this.booksService.getBooksCount().subscribe(
      result => this.stateService.setTitle('Books (' + result['count'] + ')')
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
