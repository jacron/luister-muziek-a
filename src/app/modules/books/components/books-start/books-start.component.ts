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
  proposal: Book;
  notInCatalogue = false;
  notfound = null;
  isbnFormControl = new FormControl();
  titleFormControl = new FormControl();

  constructor(
    private booksService: BooksService,
    private stateService: StateService,
    private router: Router,
  ) { }

  afterGetBookByIsbn(book: Book) {
    this.books = [];
    this.notInCatalogue = true;
    // return;  // testing
    if (book) {
      this.notInCatalogue = false;
      this.proposal = null;
      this.books.push(book);
    }
    else {
      this.notInCatalogue = true;
    }
  }

  afterGetRemote(response, source) {
    console.log(response);
    this.notInCatalogue = true;
    if (response.matches && response.matches[0]) {
      this.proposal = response.matches[0];
      this.proposal.id = -1;
      this.proposal.source = source;
      this.notfound = null;
    } else {
      this.notfound = source;
    }
  }

  remote(source) {
    const isbn = this.isbnFormControl.value;
    console.log(isbn);
    this.notfound = null;
    this.proposal = null;
    this.booksService.getRemote(isbn, source).subscribe(
      response => this.afterGetRemote(response, source)
    )
  }

  onTitleChange() {
    const query = this.titleFormControl.value;
    this.router.navigate(['books/search', query]);
  }

  onIsbnChange(val) {
    if (val) {  // testing
      this.isbnFormControl.setValue(val);
    }
    const isbn = this.isbnFormControl.value;
    console.log(isbn);
    this.booksService.getBookByIsbn(isbn).subscribe(
      (book: Book) => this.afterGetBookByIsbn(book)
    )
  }

  clearQuery() {
    this.isbnFormControl.setValue(null);
    this.books = [];
    this.proposal = null;
  }

  getBooksCount() {
    this.booksService.getBooksCount().subscribe(
      result => this.stateService.setTitle('Books (' + result + ')')
    )
  }

  ngOnInit() {
    this.stateService.setTitle('Books');
    this.getBooksCount();
  }

}
