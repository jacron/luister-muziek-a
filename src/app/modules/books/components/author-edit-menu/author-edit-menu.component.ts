import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Author} from '../../../../classes/book/author';
import {BooksService} from '../../services/books.service';
import {ToastrService} from 'ngx-toastr';
import {MenuOption} from '../../../../classes/shared/MenuOption';
import {environment} from '../../../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-author-edit-menu',
  templateUrl: './author-edit-menu.component.html',
  styleUrls: ['./author-edit-menu.component.scss']
})
export class AuthorEditMenuComponent implements OnInit {
  @Input() author: Author;
  @Output() authorChange = new EventEmitter();
  @Output() refresh = new EventEmitter();
  @Output() close = new EventEmitter();

  options: MenuOption[] = [
    {
      label: 'Google',
      icon: 'search',
      color: 'violet',
      action: this.google.bind(this)
    },
    {
      label: 'Plak url',
      icon: 'brush',
      color: 'green',
      action: this.pastePicture.bind(this)
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
      label: 'Boeken',
      icon: 'book',
      action: this.toBooks.bind(this)
    }
  ];

  constructor(
    private booksService: BooksService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  act(f: Function) {
    f();
  }

  toBooks() {
    this.router.navigate(['author', this.author.id]).then();
    this.close.emit('to books');
  }

  afterGetCover() {
    this.toastr.success('schrijversfoto opgeslagen', 'afbeelding');
    this.refresh.emit('?' + new Date());
  }

  getCover() {
    this.toastr.info('afbeelding auteur naar cache', 'afbeelding');
    this.booksService.getAuthorPicture(this.author.id).subscribe(
      () => this.afterGetCover()
    );
  }

  afterPastePicture(response) {
    console.log(response);
    this.author.imgurl = response;
    this.authorChange.emit(this.author);
    this.toastr.success('url afbeelding ingeplakt', 'cover');
  }

  pastePicture() {
    this.booksService.pasteAuthorPicture(this.author.id).subscribe(
      response => this.afterPastePicture(response),
      err => console.log(err)
    )
  }

  google() {
    window.open(environment.googleUrl +
      this.author.first + ' ' + this.author.last);
  }

  ngOnInit() {
  }

}
