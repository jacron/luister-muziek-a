import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MenuOption} from '../../../../classes/shared/MenuOption';
import {BooksService} from '../../services/books.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-book-menu',
  templateUrl: './book-menu.component.html',
  styleUrls: ['./book-menu.component.scss']
})
export class BookMenuComponent implements OnInit {
  @Input() book;
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
