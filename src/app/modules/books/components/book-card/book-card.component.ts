import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../../../classes/book/book';
import {environment} from '../../../../../environments/environment';
import {BooksService} from '../../services/books.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  @Output() bookChange = new EventEmitter();
  imageUrl = environment.booksServer + '/cover/';
  refresh = '?';

  constructor(
    private booksService: BooksService,
    private toastr: ToastrService,
  ) { }

  // getImageSource() {
  //   const requestUrl = environment.booksServer;
  //   return requestUrl + '/cover/' + this.book.id;
  // }

  scanCover(e) {
    e.preventDefault();
    e.stopPropagation();
    this.booksService.scanCover().subscribe(
      response => console.log(response)
    )
  }

  afterFinishCover() {
    this.toastr.success('cover finished');
    this.refresh = '?' + new Date();
  }

  finishCover(e) {
    e.preventDefault();
    e.stopPropagation();
    this.booksService.finishCover(this.book.id).subscribe(
      response => this.afterFinishCover()
    )
  }

  afterGetCover() {
    this.toastr.success('boekomslag opgeslagen', 'cover');
    this.refresh = '?' + new Date();
  }

  getCover(e) {
    e.preventDefault();
    e.stopPropagation();
    this.toastr.info('Boekomslag in cache', 'cover');
    this.booksService.getBookCover(this.book.id).subscribe(
      response => this.afterGetCover()
    )
  }

  afterRemove(response) {
    // console.log(response);
    this.bookChange.emit(null);
  }

  remove(e) {
    e.preventDefault();
    e.stopPropagation();
    if (confirm(`'${this.book.title}' verwijderen?`)) {
      this.booksService.removeBook(this.book.id).subscribe(
        response => this.afterRemove(response)
      )
    }
  }

  ngOnInit() {
  }

}
