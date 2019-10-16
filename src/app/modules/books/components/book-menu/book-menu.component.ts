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
    // {
    //   label: 'Scan',
    //   icon: 'search',
    //   action: this.scanCover.bind(this)
    // },
    {
      label: 'Gebruik scan',
      icon: 'account_balance_wallet',
      action: this.finishCover.bind(this),
    },
    {
      label: 'Plak afbeelding',
      icon: 'brush',
      color: 'orange',
      action: this.pasteCover.bind(this),
    },
    {
      label: 'Plak url',
      icon: 'brush',
      color: 'green',
      action: this.pasteCoverUrl.bind(this)
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
      color: 'brown',
      action: this.google.bind(this, environment.googleUrl)
    },
    {
      label: 'Google Afb.',
      icon: 'search',
      color: 'rgb(245, 245, 24)',
      action: this.google.bind(this, environment.googleAfbUrl)
    },
    {
      label: 'Verwijder',
      icon: 'clear',
      color: 'rgb(245, 24, 24)',
      action: this.remove.bind(this)
    },
    {
      label: 'Maak barcode',
      icon: 'account_balance_wallet',
      color: 'rgb(24, 24, 254)',
      action: this.createBarcode.bind(this)
    },
  ];

  constructor(
    private booksService: BooksService,
    private toastr: ToastrService,
  ) { }

  act(f: Function) {
    f();
  }

  afterGetAuthor(author, g_url) {
    let url = g_url + this.book.title;
    if (author) {
      url += ' ' + author.first + ' ' + author.last;
    }
    window.open(url);
  }

  google(url) {
    // console.log(this.book);
    const author = this.book.author;
    if (!author) {
      this.booksService.getAuthor(this.book.author_id).subscribe(
        response => this.afterGetAuthor(response, url)
      );
    } else {
      window.open(url + this.book.title +
        ' ' + author);
    }
  }

  // scanCover() {
  //   this.booksService.scanCover().subscribe(
  //     response => console.log(response)
  //   )
  // }

  afterFinishCover() {
    this.toastr.success('cover finished');
    this.refresh.emit('?' + new Date());
  }

  finishCover() {
    this.booksService.finishCover(this.book.id).subscribe(
      () => this.afterFinishCover()
    )
  }

  afterPasteCoverUrl(response) {
    this.book.imgurl = response.text;
    this.toastr.success('url afbeelding ingeplakt', 'cover');
  }

  pasteCoverUrl() {
    this.booksService.pasteBookCoverUrl(this.book.id).subscribe(
      response => this.afterPasteCoverUrl(response)
    )
  }

  afterPasteCover() {
    this.toastr.success('boekomslag opgeslagen', 'cover');
    this.refresh.emit('?' + new Date());
  }

  pasteCover() {
    this.booksService.pasteBookCover(this.book.id).subscribe(
      () => this.afterPasteCover()
    )
  }

  afterGetCover() {
    this.toastr.success('boekomslag opgeslagen', 'cover');
    this.refresh.emit('?' + new Date());
  }

  getCover() {
    this.toastr.info('Boekomslag in cache', 'cover');
    this.booksService.getBookCoverFromUrl(this.book.id).subscribe(
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

  afterCreateBarcode(result) {
    console.log(result);
  }

  createBarcode() {
    this.booksService.addBarcode(this.book.isbn13, this.book.title).subscribe(
      (result) => this.afterCreateBarcode(result)
    )
  }


  ngOnInit() {
  }

}
