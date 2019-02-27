import { Component, OnInit } from '@angular/core';
import {BooksService} from '../../services/books.service';
import {StateService} from '../../../../services/state.service';
import {Author} from '../../../../classes/book/author';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors: Author[];
  filteredAuthors: Author[];
  query: string;

  constructor(
    private booksService: BooksService,
    private stateService: StateService,
  ) { }

  resetSearch() {
    this.query = null;
    this.search(null);
  }

  search(newValue: string) {
    if (!newValue || !newValue.length) {
      this.filteredAuthors = this.authors.slice();
      return;
    }
    const q = newValue.toLowerCase();
    this.filteredAuthors = this.authors.filter(
      (author: Author) => author.last.toLowerCase().indexOf(q) !== -1
        || author.first.toLowerCase().indexOf(q) !== -1
    );
  }

  afterGetAuthors(result) {
    // console.log(result);
    this.filteredAuthors = this.authors = result;
  }

  ngOnInit() {
    this.stateService.setTitle('Auteurs');
    this.booksService.getAuthors().subscribe(
      result => this.afterGetAuthors(result)
    )
  }

}
