import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BooksService} from '../../services/books.service';
import {StateService} from '../../../../services/state.service';
import {Book} from '../../../../classes/book/book';

@Component({
  selector: 'app-title-query',
  templateUrl: './title-query.component.html',
  styleUrls: ['./title-query.component.scss']
})
export class TitleQueryComponent implements OnInit {
  books: Book[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksService: BooksService,
    private stateService: StateService,
  ) {
    activatedRoute.params.subscribe(params => this.handleParams(params));
  }

  afterSearchTitles(response) {
    console.log(response);
    this.books = response;
  }

  handleParams(params) {
    if (params) {
      if (params.query) {
        this.booksService.searchTitlesFull(params.query).subscribe(
          response => this.afterSearchTitles(response)
        )
      }
    }
  }

  ngOnInit() {
    this.stateService.setTitle('Query');
  }

}
