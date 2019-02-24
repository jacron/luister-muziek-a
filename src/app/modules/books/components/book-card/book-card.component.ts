import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../../classes/book/book';
import {environment} from '../../../../../environments/environment';
import {BooksService} from '../../services/books.service';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;

  constructor(
    private booksService: BooksService,
  ) { }

  getImageSource() {
    const requestUrl = environment.booksServer;
    return requestUrl + '/cover/' + this.book.id;
  }

  scanCover(e) {
    e.preventDefault();
    e.stopPropagation();
    this.booksService.scanCover().subscribe(
      response => console.log(response)
    )
  }

  finishCover(e) {
    e.preventDefault();
    e.stopPropagation();
    this.booksService.finishCover(this.book.id).subscribe(
      response => console.log(response)
    )
  }
  getCover(e) {
    e.preventDefault();
    e.stopPropagation();
    this.booksService.getCover(this.book.id).subscribe(
      response => console.log(response)
    )
  }

  ngOnInit() {
  }

}
