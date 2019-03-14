import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuOption} from '../../../../classes/shared/MenuOption';
import {BooksService} from '../../services/books.service';
import {ToastrService} from 'ngx-toastr';
import {Book} from '../../../../classes/book/book';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-book-menu',
  templateUrl: './book-menu.component.html',
  styleUrls: ['./book-menu.component.scss']
})
export class BookMenuComponent implements OnInit {
  @Input() book: Book;
  @Output() refresh = new EventEmitter();
  @Output() bookChange = new EventEmitter();

  options: MenuOption[] = [
    {
      label: 'Scan',
      icon: 'search',
      action: this.scanCover.bind(this)
    },
    {
      label: 'Gebruik scan',
      icon: 'account_balance_wallet',
      action: this.finishCover.bind(this),
    },
    {
      label: 'Plak url',
      icon: 'brush',
      color: 'green',
      action: this.pasteCover.bind(this)
    },
    {
      label: 'Gebruik url',
      icon: 'account_balance_wallet',
      color: 'green',
      action: this.getCover.bind(this)
    },
    {
      label: 'divider',
      icon: '',
    },
    {
      label: 'Google',
      icon: 'search',
      action: this.google.bind(this)
    },
    {
      label: 'Verwijder',
      icon: 'clear',
      color: 'rgb(245, 24, 24)',
      action: this.remove.bind(this)
    },
  ];

  constructor(
    private booksService: BooksService,
    private toastr: ToastrService,
  ) { }

  act(f: Function) {
    f();
  }

  afterGetAuthor(author) {
    let url = environment.googleUrl + this.book.title;
    if (author) {
      url += ' ' + author.first + ' ' + author.last;
    }
    window.open(url);
  }

  google() {
    console.log(this.book);
    const author = this.book.author;
    if (!author) {
      this.booksService.getAuthor(this.book.author_id).subscribe(
        response => this.afterGetAuthor(response)
      );
    } else {
      window.open(environment.googleUrl + this.book.title +
        ' ' + author);
    }
  }

  scanCover() {
    this.booksService.scanCover().subscribe(
      response => console.log(response)
    )
  }

  afterFinishCover() {
    this.toastr.success('cover finished');
    this.refresh.emit('?' + new Date());
  }

  finishCover() {
    this.booksService.finishCover(this.book.id).subscribe(
      () => this.afterFinishCover()
    )
  }

  afterPasteCover(response) {
    this.book.imgurl = response.text;
    this.toastr.success('url afbeelding ingeplakt', 'cover');
  }

  pasteCover() {
    this.booksService.pasteBookCover(this.book.id).subscribe(
      response => this.afterPasteCover(response)
    )
  }

  afterGetCover() {
    this.toastr.success('boekomslag opgeslagen', 'cover');
    this.refresh.emit('?' + new Date());
  }

  getCover() {
    this.toastr.info('Boekomslag in cache', 'cover');
    this.booksService.getBookCover(this.book.id).subscribe(
      () => this.afterGetCover()
    )
  }

  afterRemove() {
    this.bookChange.emit(null);
  }

  remove() {
    if (confirm(`'${this.book.title}' verwijderen?`)) {
      this.booksService.removeBook(this.book.id).subscribe(
        () => this.afterRemove()
      )
    }
  }


  ngOnInit() {
  }

}
