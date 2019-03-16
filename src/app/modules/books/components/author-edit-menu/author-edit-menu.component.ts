import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Author} from '../../../../classes/book/author';
import {BooksService} from '../../services/books.service';
import {ToastrService} from 'ngx-toastr';
import {MenuOption} from '../../../../classes/shared/MenuOption';
import {environment} from '../../../../../environments/environment';

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
  @Output() toggle = new EventEmitter();
  @Output() wiki = new EventEmitter();

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
      label: 'Boeken',
      icon: 'book',
      action: this.showBooks.bind(this)
    },
    {
      label: 'Wiki nl',
      icon: 'wiki',
      action: this.wikipedia.bind(this, 'nl')
    },
    {
      label: 'Wiki de',
      icon: '',
      action: this.wikipedia.bind(this, 'de')
    },
    {
      label: 'Wiki en',
      icon: '',
      action: this.wikipedia.bind(this, 'en')
    },
  ];

  constructor(
    private booksService: BooksService,
    private toastr: ToastrService,
  ) { }

  act(f: Function) {
    f();
  }

  wikipedia(lng) {
    this.wiki.emit(lng);
  }

  afterPastePicture(response) {
    console.log(response);
    // this.author.imgurl = response;
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

  showBooks() {
    this.toggle.emit();
  }

  ngOnInit() {
  }

}
