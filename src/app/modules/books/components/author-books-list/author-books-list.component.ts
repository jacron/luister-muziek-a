import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Author} from '../../../../classes/book/author';
import {BooksService} from '../../services/books.service';
import {MatDialog} from '@angular/material';
import {Book} from '../../../../classes/book/book';
import {DialogBookComponent} from '../../dialogs/dialog-book/dialog-book.component';

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
    private dialog: MatDialog,
  ) { }

  booksCountLabel(n) {
    return n === 1 ? 'boek' : 'boeken';
  }

  afterEdit(result) {
    console.log(result);
  }

  edit(book: Book) {
    this.close.emit('saved');
    const dialogRef = this.dialog.open(DialogBookComponent, {
      data: {
        width: '600px',
        book
      }
    });
    dialogRef.afterClosed().subscribe(
      result => this.afterEdit(result)
    );
  }

  afterFetchBooks(result) {
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
