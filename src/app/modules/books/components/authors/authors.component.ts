import { Component, OnInit } from '@angular/core';
import {BooksService} from '../../services/books.service';
import {StateService} from '../../../../services/state.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors;

  constructor(
    private booksService: BooksService,
    private stateService: StateService,
  ) { }

  afterGetAuthors(result) {
    console.log(result);
    this.authors = result;
  }

  ngOnInit() {
    this.stateService.setTitle('Auteurs');
    this.booksService.getAuthors().subscribe(
      result => this.afterGetAuthors(result)
    )
  }

}
