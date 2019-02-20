import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  books;
  author;

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    // private stateService: StateService,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  afterGetAuthorBooks(response) {
    console.log(response);
    this.books = response.books;
    this.author = response.author;
    // this.stateService.setTitle(this.movie.Titel);
    document.title = this.author.first + ' ' + this.author.last;
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
