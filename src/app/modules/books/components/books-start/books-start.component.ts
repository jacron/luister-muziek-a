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
  notfound = false;
  isbnFormControl = new FormControl();
  titleFormControl = new FormControl();

  constructor(
    private booksService: BooksService,
    private stateService: StateService,
    private router: Router,
  ) { }

  afterGetRemote(response) {
    console.log(response);
    this.notfound = true;
    this.proposal = response.matches[0];
    this.proposal.id = -1;
  }

  afterGetBookByIsbn(book: Book) {
    this.books = [];
    if (book) {
      this.notfound = false;
      this.proposal = null;
      this.books.push(book);
    }
    else {
      this.notfound = true;
      this.booksService.getRemote(this.isbnFormControl.value, 'bolcom').subscribe(
        response => this.afterGetRemote(response)
      )
    }
  }

  onTitleChange() {
    const query = this.titleFormControl.value;
    this.router.navigate(['books/search', query]);
  }

  onIsbnChange() {
    console.log(this.isbnFormControl.value);
    this.booksService.getBookByIsbn(this.isbnFormControl.value).subscribe(
      (book: Book) => this.afterGetBookByIsbn(book)
    )
  }

  clearQuery() {
    this.isbnFormControl.setValue(null);
    this.books = [];
  }

  ngOnInit() {
    this.stateService.setTitle('Books');
  }

}
