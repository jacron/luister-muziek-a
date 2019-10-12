import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../../../classes/book/book';
import {environment} from '../../../../../environments/environment';
import {MatDialog} from '@angular/material/dialog';
import {BooksService} from '../../services/books.service';
import {Author} from '../../../../classes/book/author';
import {DialogAuthorComponent} from '../../dialogs/dialog-author/dialog-author.component';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  @Output() bookChange = new EventEmitter();
  imageUrl = environment.booksServer + '/image/book/';
  refresh = '?';

  constructor(
    private dialog: MatDialog,
    private booksService: BooksService,
  ) { }

  setRefresh(e) {
    this.refresh = e;
  }

  emitBookChange(e) {
    this.bookChange.emit(e);
  }

  afterSaved(author: Author) {
    this.book.author = author.first + ' ' + author.last;
  }

  afterEdit(result) {
    if (!result || !result.author) {
      return;
    }
    const {status, author} = result;
    if (status === 'saved') {
      this.afterSaved(author);
    }
  }

  afterGetAuthor(author: Author) {
    const dialogRef = this.dialog.open(DialogAuthorComponent, {
      data: {
        width: '600px',
        author: author
      }
    });
    dialogRef.afterClosed().subscribe(
      result => this.afterEdit(result)
    );
  }

  editAuthor() {
    this.booksService.getAuthor(this.book.author_id).subscribe(
      (author: Author) => this.afterGetAuthor(author)
    );
  }

  ngOnInit() {
    // console.log(this.book);
  }

}
