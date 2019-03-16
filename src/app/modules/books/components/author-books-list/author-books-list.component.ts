import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Author} from '../../../../classes/book/author';
import {BooksService} from '../../services/books.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-author-books-list',
  templateUrl: './author-books-list.component.html',
  styleUrls: ['./author-books-list.component.scss']
})
export class AuthorBooksListComponent implements OnInit {
  @Input() author: Author;
  @Output() close = new EventEmitter();
  books = null;

  constructor(
    private booksService: BooksService,
    private router: Router,
  ) { }

  booksCountLabel(n) {
    return n === 1 ? 'boek' : 'boeken';
  }

  toBook(id) {
    this.router.navigate(['books', id]).then(
      () => this.close.emit('navigated')
    );
  }

  afterFetchBooks(result) {
    // console.log(result);
    this.books = result;
  }

  fetchBooks() {
    this.booksService.getAuthorBooks(this.author.id).subscribe(
      result => this.afterFetchBooks(result)
    );
  }

  ngOnInit() {
    this.fetchBooks();
  }

}
