import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  book;

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    // private stateService: StateService,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  afterGetBook(response) {
    console.log(response);
    this.book = response;
    // this.stateService.setTitle(this.movie.Titel);
    document.title = this.book.title;
  }

  handleParams(params) {
    if (params) {
      if (params.idbook) {
        this.booksService.getBook(params.idbook).subscribe(
          response => this.afterGetBook(response)
        );
      }
    }
  }

  ngOnInit() {
  }

}
