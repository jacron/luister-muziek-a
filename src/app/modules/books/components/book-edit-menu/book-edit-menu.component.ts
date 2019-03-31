import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Book} from '../../../../classes/book/book';
import {MenuOption} from '../../../../classes/shared/MenuOption';
import {environment} from '../../../../../environments/environment';
import {BooksService} from '../../services/books.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-book-edit-menu',
  templateUrl: './book-edit-menu.component.html',
  styleUrls: ['./book-edit-menu.component.scss']
})
export class BookEditMenuComponent implements OnInit {
  @Input() book: Book;
  @Output() bookChange = new EventEmitter();
  @Output() close = new EventEmitter();

  options: MenuOption[] = [
    {
      label: 'Google',
      icon: 'search',
      color: 'violet',
      action: this.google.bind(this)
    },
    {
      label: 'Plak afbeelding',
      icon: 'brush',
      color: 'green',
      action: this.pastePicture.bind(this)
    },
    {
      label: 'Verwijderen',
      icon: 'clear',
      color: 'red',
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

  afterPastePicture(response) {
    console.log(response);
    this.bookChange.emit(this.book);
  }

  pastePicture() {
    this.booksService.pasteBookCoverUrl(this.book.id).subscribe(
      response => this.afterPastePicture(response),
      err => this.toastr.error(err)
    )
  }

  google() {
    window.open(environment.googleUrl + this.book.title);
  }

  afterRemove(id) {
    console.log(id);
    this.close.emit('removed');
  }

  remove() {
    if (confirm('Regisseur verwijderen?')) {
      this.booksService.removeBook(this.book.id).subscribe(
        response => this.afterRemove(response)
      )
    }
  }

  ngOnInit() {
  }

}
