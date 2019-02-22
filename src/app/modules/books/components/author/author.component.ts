import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BooksService} from '../../services/books.service';
import {Book} from '../../../../classes/book/book';
import {Author} from '../../../../classes/book/author';
import {StateService} from '../../../../services/state.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  books: Book[];
  author: Author;

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private stateService: StateService,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  afterGetAuthorBooks(response) {
    console.log(response);
    this.books = response.books;
    this.author = response.author;
    document.title = this.author.first + ' ' + this.author.last;
    this.stateService.setTitle(document.title);
  }

  handleParams(params) {
    if (params) {
      if (params.idauthor) {
        this.booksService.getAuthorBooks(params.idauthor).subscribe(
          response => this.afterGetAuthorBooks(response)
        );
      }
    }
  }

  ngOnInit() {
  }

}
